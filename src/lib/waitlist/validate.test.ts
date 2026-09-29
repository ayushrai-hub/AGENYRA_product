import { describe, expect, it } from "vitest";
import { cleanLine, cleanMultiline, isValidEmail, normalizeLinkedIn, normalizeSource, normalizeUrl, validateWaitlist } from "./validate";

function form(entries: Record<string, string | string[]>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) for (const item of [v].flat()) fd.append(k, item);
  return fd;
}

describe("validateWaitlist", () => {
  it("accepts the minimum required fields and normalizes them", () => {
    const r = validateWaitlist(form({ name: "  Ada   Lovelace ", email: " Ada@Example.COM " }));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: null,
      website: null,
      role: null,
      interest: [],
      source: "website",
    });
  });

  it("requires name and email", () => {
    const r = validateWaitlist(form({}));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(Object.keys(r.fieldErrors).sort()).toEqual(["email", "name"]);
  });

  it("rejects invalid email addresses", () => {
    for (const email of ["plainaddress", "a@b", "a@@b.com", "a b@c.com", ".a@b.com", "a..b@c.com", "a@b.c"]) {
      const r = validateWaitlist(form({ name: "X", email }));
      expect(r.ok, email).toBe(false);
    }
  });

  it("validates optional fields and enums", () => {
    const r = validateWaitlist(
      form({
        name: "X",
        email: "x@y.io",
        phone: "call me",
        website: "not a url",
        linkedin: "https://evil.com/in/x",
        role: "admin",
        interest: ["discover", "hack"],
      }),
    );
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(Object.keys(r.fieldErrors).sort()).toEqual(["interest", "linkedin", "phone", "role", "website"]);
    expect(r.values.email).toBe("x@y.io");
  });

  it("keeps valid optional fields", () => {
    const r = validateWaitlist(
      form({
        name: "X",
        email: "x@y.io",
        phone: "+91 98765 43210",
        website: "acme.ai",
        linkedin: "linkedin.com/in/someone",
        role: "ai_builder",
        interest: ["distribute", "distribute", "partnerships"],
        message: "Line one\r\n\r\n\r\n\r\nLine two",
        source: "Twitter Launch!",
      }),
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data).toMatchObject({
      phone: "+91 98765 43210",
      website: "https://acme.ai",
      linkedin: "https://linkedin.com/in/someone",
      role: "ai_builder",
      interest: ["distribute", "partnerships"],
      message: "Line one\n\nLine two",
      source: "twitter-launch",
    });
  });
});

describe("sanitizers", () => {
  it("strips control and bidi characters", () => {
    expect(cleanLine("a\u0000b\u202Ec\td", 50)).toBe("abc d");
    expect(cleanMultiline("a\u0007\nb", 50)).toBe("a\nb");
  });

  it("truncates to the limit", () => {
    expect(cleanLine("x".repeat(500), 10)).toHaveLength(10);
  });

  it("normalizes URLs and refuses other schemes", () => {
    expect(normalizeUrl("example.com/path")).toBe("https://example.com/path");
    expect(normalizeUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeUrl("ftp://example.com")).toBeNull();
    expect(normalizeUrl("https://user:pw@example.com")).toBeNull();
    expect(normalizeUrl("localhost")).toBeNull();
  });

  it("only accepts linkedin.com hosts", () => {
    expect(normalizeLinkedIn("https://www.linkedin.com/company/acme")).toBe("https://www.linkedin.com/company/acme");
    expect(normalizeLinkedIn("in/someone")).toBe("https://linkedin.com/in/someone");
    expect(normalizeLinkedIn("https://linkedin.com.evil.io/in/x")).toBeNull();
  });

  it("slugifies sources", () => {
    expect(normalizeSource("")).toBe("website");
    expect(normalizeSource("<script>")).toBe("script");
  });

  it("checks emails", () => {
    expect(isValidEmail("first.last+tag@sub.example.co")).toBe(true);
    expect(isValidEmail(`${"a".repeat(65)}@example.com`)).toBe(false);
  });
});
