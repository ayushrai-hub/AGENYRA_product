import { describe, expect, it } from "vitest";
import { csvCell, toCsv, type WaitlistRow } from "./csv";

const row: WaitlistRow = {
  id: "7f1c6f6e-0000-4000-8000-000000000001",
  created_at: "2026-09-29T08:00:00+00:00",
  name: 'Ada "The Countess" Lovelace',
  email: "ada@example.com",
  phone: "+44 20 7946 0000",
  company: "Analytical, Ltd",
  website: "https://example.com",
  linkedin: null,
  role: "ai_builder",
  interest: ["distribute", "partnerships"],
  message: "Line one\nLine two",
  source: "website",
  status: "new",
  notes: "=HYPERLINK(\"http://x\")",
};

describe("csv", () => {
  it("writes the expected header order with a BOM and CRLF", () => {
    const out = toCsv([]);
    expect(out.startsWith("\uFEFF")).toBe(true);
    expect(out.slice(1)).toBe(
      "ID,Created At,Name,Email,Phone,Company,Website,LinkedIn,Role,Interest,Message,Source,Status,Notes\r\n",
    );
  });

  it("quotes, escapes and neutralizes formulas", () => {
    const [, line] = toCsv([row]).slice(1).split("\r\n");
    expect(line).toContain('"Ada ""The Countess"" Lovelace"');
    expect(line).toContain('"Analytical, Ltd"');
    expect(line).toContain("'+44 20 7946 0000");
    expect(line).toContain("AI Builder");
    expect(line).toContain("Distribute my AI product; Partnerships");
    expect(line).toContain('"Line one\nLine two"');
    expect(line).toContain(`"'=HYPERLINK(""http://x"")"`);
    expect(line).toContain("2026-09-29T08:00:00.000Z");
  });

  it("neutralizes every formula trigger", () => {
    for (const s of ["=1", "+1", "-1", "@SUM(A1)", "\tx"]) expect(csvCell(s).replace(/^"/, "")[0]).toBe("'");
    expect(csvCell("plain")).toBe("plain");
  });
});
