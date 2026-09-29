import "server-only";
import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const MEMORY_WINDOW_MS = 10 * 60 * 1000;
const MEMORY_MAX = 5;
const DB_WINDOW_SECONDS = 60 * 60;
const DB_MAX = 10;

// Per-instance first line of defense. Serverless instances do not share this,
// so the database check below is the one that actually holds across instances.
const hits = new Map<string, number[]>();

export function hashIp(ip: string): string {
  return createHash("sha256")
    .update(`agenyra-waitlist:${process.env.WAITLIST_IP_SALT ?? ""}:${ip}`)
    .digest("hex");
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

function allowInMemory(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < MEMORY_WINDOW_MS);
  if (recent.length >= MEMORY_MAX) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= MEMORY_WINDOW_MS)) hits.delete(k);
  }
  return true;
}

export async function checkRateLimit(db: SupabaseClient, ipHash: string): Promise<boolean> {
  if (!allowInMemory(ipHash)) return false;
  const { data, error } = await db.rpc("waitlist_register_attempt", {
    p_ip_hash: ipHash,
    p_max: DB_MAX,
    p_window_seconds: DB_WINDOW_SECONDS,
  });
  if (error) {
    // Fail open: a broken limiter should not block legitimate signups.
    console.error("[waitlist] rate limit check failed", error.code, error.message);
    return true;
  }
  return data !== false;
}
