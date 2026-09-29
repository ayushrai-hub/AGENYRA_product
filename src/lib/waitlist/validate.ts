import {
  INTERESTS,
  LIMITS,
  ROLES,
  type FieldName,
  type Interest,
  type Role,
  type WaitlistValues,
} from "./fields";

export type WaitlistInput = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  linkedin: string | null;
  role: Role | null;
  interest: Interest[];
  message: string | null;
  source: string;
};

export type ValidationResult =
  | { ok: true; data: WaitlistInput }
  | { ok: false; fieldErrors: Partial<Record<FieldName, string>>; values: WaitlistValues };

// Strips ASCII control characters (keeping tab/newline where allowed) and bidi overrides.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g;

export function cleanLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(CONTROL, "")
    .replace(/[\t\r\n]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

export function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

// Pragmatic check: one @, no spaces, a dot in the domain, sane label characters.
const EMAIL = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  if (email.length > LIMITS.email || !EMAIL.test(email)) return false;
  const [local, domain] = email.split("@");
  if (local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  const tld = domain.split(".").pop() ?? "";
  return /^[A-Za-z]{2,}$/.test(tld) || /^xn--[A-Za-z0-9-]+$/.test(tld);
}

/** Accepts bare domains ("acme.ai") and returns a normalized https URL, or null if invalid. */
export function normalizeUrl(raw: string): string | null {
  if (!raw) return null;
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (url.username || url.password) return null;
  if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null;
  const out = url.toString();
  return out.length <= LIMITS.website ? out.replace(/\/$/, "") : null;
}

export function normalizeLinkedIn(raw: string): string | null {
  if (!raw) return null;
  const withHost = /linkedin\.com/i.test(raw) ? raw : raw.startsWith("in/") ? `linkedin.com/${raw}` : raw;
  const url = normalizeUrl(withHost);
  if (!url) return null;
  const host = new URL(url).hostname.toLowerCase();
  if (host !== "linkedin.com" && !host.endsWith(".linkedin.com")) return null;
  return url;
}

const PHONE = /^\+?[0-9 ().-]{6,32}$/;

export function normalizeSource(raw: unknown): string {
  const value = cleanLine(raw, LIMITS.source).toLowerCase();
  const safe = value.replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return safe || "website";
}

type RawForm = {
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
};

export function validateWaitlist(form: RawForm): ValidationResult {
  const name = cleanLine(form.get("name"), LIMITS.name);
  const email = cleanLine(form.get("email"), LIMITS.email + 1).toLowerCase();
  const phone = cleanLine(form.get("phone"), LIMITS.phone + 1);
  const company = cleanLine(form.get("company"), LIMITS.company);
  const websiteRaw = cleanLine(form.get("website"), LIMITS.website + 1);
  const linkedinRaw = cleanLine(form.get("linkedin"), LIMITS.linkedin + 1);
  const roleRaw = cleanLine(form.get("role"), 32);
  const message = cleanMultiline(form.get("message"), LIMITS.message);
  const interestRaw = form
    .getAll("interest")
    .map((v) => cleanLine(v, 32))
    .filter(Boolean);

  const values: WaitlistValues = {
    name,
    email,
    phone,
    company,
    website: websiteRaw,
    linkedin: linkedinRaw,
    role: roleRaw,
    message,
    interest: interestRaw,
  };

  const fieldErrors: Partial<Record<FieldName, string>> = {};

  if (!name) fieldErrors.name = "Tell us your name.";

  if (!email) fieldErrors.email = "An email address is required.";
  else if (!isValidEmail(email)) fieldErrors.email = "That doesn’t look like a valid email address.";

  if (phone && (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 6)) {
    fieldErrors.phone = "Use digits, spaces and an optional leading +.";
  }

  const website = websiteRaw ? normalizeUrl(websiteRaw) : null;
  if (websiteRaw && !website) fieldErrors.website = "Enter a valid web address, like acme.ai.";

  const linkedin = linkedinRaw ? normalizeLinkedIn(linkedinRaw) : null;
  if (linkedinRaw && !linkedin) fieldErrors.linkedin = "Enter a linkedin.com profile or company URL.";

  const roleValues = ROLES.map((r) => r.value) as readonly string[];
  const role = roleRaw ? (roleValues.includes(roleRaw) ? (roleRaw as Role) : null) : null;
  if (roleRaw && !role) fieldErrors.role = "Choose one of the listed options.";

  const interestValues = INTERESTS.map((i) => i.value) as readonly string[];
  const interest = [...new Set(interestRaw)].filter((v): v is Interest => interestValues.includes(v));
  if (interest.length !== new Set(interestRaw).size) fieldErrors.interest = "Choose from the listed options.";

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors, values };

  return {
    ok: true,
    data: {
      name,
      email,
      phone: phone || null,
      company: company || null,
      website,
      linkedin,
      role,
      interest,
      message: message || null,
      source: normalizeSource(form.get("source")),
    },
  };
}
