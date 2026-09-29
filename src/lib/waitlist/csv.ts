import { INTERESTS, ROLES } from "./fields";

export type WaitlistRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  linkedin: string | null;
  role: string | null;
  interest: string[] | null;
  message: string | null;
  source: string | null;
  status: string;
  notes: string | null;
};

export const CSV_COLUMNS: { header: string; value: (r: WaitlistRow) => string }[] = [
  { header: "ID", value: (r) => r.id },
  { header: "Created At", value: (r) => new Date(r.created_at).toISOString() },
  { header: "Name", value: (r) => r.name },
  { header: "Email", value: (r) => r.email },
  { header: "Phone", value: (r) => r.phone ?? "" },
  { header: "Company", value: (r) => r.company ?? "" },
  { header: "Website", value: (r) => r.website ?? "" },
  { header: "LinkedIn", value: (r) => r.linkedin ?? "" },
  { header: "Role", value: (r) => labelFor(ROLES, r.role) },
  { header: "Interest", value: (r) => (r.interest ?? []).map((i) => labelFor(INTERESTS, i)).join("; ") },
  { header: "Message", value: (r) => r.message ?? "" },
  { header: "Source", value: (r) => r.source ?? "" },
  { header: "Status", value: (r) => r.status },
  { header: "Notes", value: (r) => r.notes ?? "" },
];

function labelFor(options: readonly { value: string; label: string }[], value: string | null) {
  if (!value) return "";
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Escapes one CSV cell. Cells that a spreadsheet could interpret as a formula
 * are prefixed with an apostrophe (OWASP CSV injection guidance).
 */
export function csvCell(raw: string): string {
  let value = raw;
  if (/^[=+\-@\t\r]/.test(value)) value = `'${value}`;
  if (/[",\r\n]/.test(value)) value = `"${value.replace(/"/g, '""')}"`;
  return value;
}

/** UTF-8 BOM + CRLF line endings so Excel opens it with the right encoding. */
export function toCsv(rows: WaitlistRow[]): string {
  const lines = [CSV_COLUMNS.map((c) => csvCell(c.header)).join(",")];
  for (const row of rows) lines.push(CSV_COLUMNS.map((c) => csvCell(c.value(row))).join(","));
  return `\uFEFF${lines.join("\r\n")}\r\n`;
}
