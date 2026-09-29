import { createHash, timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { toCsv, type WaitlistRow } from "@/lib/waitlist/csv";

const PAGE_SIZE = 1000;
const MIN_TOKEN_LENGTH = 24;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

/** Accepts `Authorization: Bearer <token>` or HTTP Basic auth with the token as the password. */
function isAuthorized(header: string | null, token: string): boolean {
  if (!header) return false;
  let supplied = "";
  if (header.startsWith("Bearer ")) {
    supplied = header.slice(7).trim();
  } else if (header.startsWith("Basic ")) {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
    supplied = decoded.slice(decoded.indexOf(":") + 1);
  }
  return supplied.length > 0 && timingSafeEqual(digest(supplied), digest(token));
}

function unauthorized() {
  return new Response("Authentication required.\n", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="AGENYRA waitlist export", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request: Request) {
  const token = process.env.WAITLIST_EXPORT_TOKEN;
  if (!token || token.length < MIN_TOKEN_LENGTH) {
    return new Response("Not found.\n", { status: 404 });
  }
  if (!isAuthorized(request.headers.get("authorization"), token)) return unauthorized();

  const db = getSupabaseAdmin();
  if (!db) return new Response("Database is not configured.\n", { status: 503 });

  const rows: WaitlistRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await db
      .from("waitlist")
      .select("id, created_at, name, email, phone, company, website, linkedin, role, interest, message, source, status, notes")
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) {
      console.error("[waitlist-export] query failed", error.code, error.message);
      return new Response("Export failed.\n", { status: 500 });
    }
    rows.push(...(data as WaitlistRow[]));
    if (!data || data.length < PAGE_SIZE) break;
  }

  const date = new Date().toISOString().slice(0, 10);
  return new Response(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="agenyra-waitlist-${date}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
