"use server";

import { cookies, headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { JOINED_COOKIE, type WaitlistState, type WaitlistValues } from "@/lib/waitlist/fields";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/waitlist/rate-limit";
import { validateWaitlist, type WaitlistInput } from "@/lib/waitlist/validate";

const MIN_FILL_MS = 1500;
const UNAVAILABLE = "The waitlist is temporarily unavailable. Please try again in a few minutes.";

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Bots that fill the hidden field or submit instantly get a success response and nothing is stored.
  const honeypot = formData.get("nickname");
  const startedAt = Number(formData.get("started_at"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof honeypot === "string" && honeypot !== "") || tooFast) {
    return { status: "success", duplicate: false };
  }

  const result = validateWaitlist(formData);
  if (!result.ok) {
    return {
      status: "error",
      message: "Some fields need attention.",
      fieldErrors: result.fieldErrors,
      values: result.values,
    };
  }
  const values = toValues(result.data);

  const db = getSupabaseAdmin();
  if (!db) {
    console.error("[waitlist] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    return { status: "error", message: UNAVAILABLE, fieldErrors: {}, values };
  }

  const ipHash = hashIp(getClientIp(await headers()));
  if (!(await checkRateLimit(db, ipHash))) {
    return {
      status: "error",
      message: "Too many attempts from this connection. Please try again later.",
      fieldErrors: {},
      values,
    };
  }

  const { error } = await db.from("waitlist").insert(result.data);
  const duplicate = error?.code === "23505";
  if (error && !duplicate) {
    console.error("[waitlist] insert failed", error.code, error.message);
    return { status: "error", message: UNAVAILABLE, fieldErrors: {}, values };
  }

  (await cookies()).set(JOINED_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/waitlist",
    maxAge: 60 * 60 * 24 * 365,
  });

  return { status: "success", duplicate };
}

function toValues(data: WaitlistInput): WaitlistValues {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    company: data.company ?? "",
    website: data.website ?? "",
    linkedin: data.linkedin ?? "",
    role: data.role ?? "",
    message: data.message ?? "",
    interest: data.interest,
  };
}
