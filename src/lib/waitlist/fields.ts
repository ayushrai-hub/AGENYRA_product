export const JOINED_COOKIE = "agenyra_waitlist";

export const ROLES = [
  { value: "ai_builder", label: "AI Builder" },
  { value: "founder", label: "Founder" },
  { value: "developer", label: "Developer" },
  { value: "investor", label: "Investor" },
  { value: "ai_user", label: "AI User" },
  { value: "researcher", label: "Researcher" },
  { value: "other", label: "Other" },
] as const;

export const INTERESTS = [
  { value: "discover", label: "Discover AI products" },
  { value: "distribute", label: "Distribute my AI product" },
  { value: "build_on", label: "Build on AGENYRA" },
  { value: "partnerships", label: "Partnerships" },
  { value: "other", label: "Other" },
] as const;

export const STATUSES = [
  "new",
  "contacted",
  "qualified",
  "early_access",
  "onboarded",
  "rejected",
  "do_not_contact",
] as const;

export type Role = (typeof ROLES)[number]["value"];
export type Interest = (typeof INTERESTS)[number]["value"];
export type WaitlistStatus = (typeof STATUSES)[number];

export const LIMITS = {
  name: 120,
  email: 254,
  phone: 32,
  company: 160,
  website: 300,
  linkedin: 300,
  message: 2000,
  source: 64,
} as const;

export const FIELD_NAMES = [
  "name",
  "email",
  "phone",
  "company",
  "website",
  "linkedin",
  "role",
  "message",
] as const;

export type FieldName = (typeof FIELD_NAMES)[number] | "interest";

/** Values echoed back to the form after a failed submission. */
export type WaitlistValues = Partial<Record<(typeof FIELD_NAMES)[number], string>> & {
  interest?: string[];
};

export type WaitlistState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<FieldName, string>>;
      values: WaitlistValues;
    }
  | { status: "success"; duplicate: boolean };
