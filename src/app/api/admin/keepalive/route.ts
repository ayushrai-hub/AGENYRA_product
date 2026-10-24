import { createHash, timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MIN_SECRET_LENGTH = 24;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

/**
 * Called daily by Vercel Cron (see vercel.json). Supabase pauses free-tier projects after
 * a week without database activity, and a quiet waitlist can easily go a week untouched.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    return new Response("Not found.\n", { status: 404 });
  }
  const header = request.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!supplied || !timingSafeEqual(digest(supplied), digest(secret))) {
    return new Response("Unauthorized.\n", { status: 401 });
  }

  const db = getSupabaseAdmin();
  if (!db) return new Response("Database is not configured.\n", { status: 503 });

  const { error } = await db.from("waitlist").select("id", { head: true, count: "exact" });
  if (error) {
    console.error("[keepalive] query failed", error.code, error.message);
    return new Response("Database query failed.\n", { status: 502 });
  }
  return new Response("ok\n");
}
