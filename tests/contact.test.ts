import { describe, expect, it } from "vitest";
import { LIMITS, formatEnquiry, parseEnquiry } from "@/lib/contact";
import { buildEnquiryMailto } from "@/lib/mailto";

const valid = {
  name: "Asha Rao",
  email: "asha@example.com",
  msg: "We need SAP HANA support.",
};

describe("parseEnquiry", () => {
  it("accepts a complete enquiry and trims it", () => {
    const r = parseEnquiry({ name: "  Asha Rao ", email: " asha@example.com", msg: "Hi " });
    expect(r).toEqual({
      ok: true,
      enquiry: { name: "Asha Rao", email: "asha@example.com", msg: "Hi" },
    });
  });

  it.each(["name", "email", "msg"] as const)("rejects a missing %s", (field) => {
    const r = parseEnquiry({ ...valid, [field]: "   " });
    expect(r).toEqual({ ok: false, reason: "incomplete" });
  });

  it.each(["asha", "asha@", "@example.com", "asha@example", "a b@c.d"])(
    "rejects the malformed address %s",
    (email) => {
      expect(parseEnquiry({ ...valid, email })).toEqual({ ok: false, reason: "email" });
    },
  );

  it.each(["a@b.co", "first.last+tag@sub.example.co.in"])("accepts %s", (email) => {
    expect(parseEnquiry({ ...valid, email }).ok).toBe(true);
  });

  it("rejects an over-long message", () => {
    const r = parseEnquiry({ ...valid, msg: "x".repeat(LIMITS.msg + 1) });
    expect(r).toEqual({ ok: false, reason: "too_long" });
  });

  it("flags anything that fills the honeypot", () => {
    expect(parseEnquiry({ ...valid, company: "Acme" })).toEqual({
      ok: false,
      reason: "spam",
    });
  });

  it("ignores non-string fields rather than throwing", () => {
    expect(parseEnquiry({ name: 42, email: null, msg: undefined })).toEqual({
      ok: false,
      reason: "incomplete",
    });
  });
});

describe("formatEnquiry", () => {
  it("names the sender in the subject and repeats the details in the body", () => {
    const { subject, text } = formatEnquiry(valid);
    expect(subject).toBe("Website enquiry from Asha Rao");
    expect(text).toBe(
      "Name: Asha Rao\nEmail: asha@example.com\n\nWe need SAP HANA support.",
    );
  });
});

describe("buildEnquiryMailto", () => {
  it("prefills a draft to the support inbox", () => {
    const url = buildEnquiryMailto(valid);
    expect(url.startsWith("mailto:Support@cloudbird.in?subject=")).toBe(true);
    const body = decodeURIComponent(new URL(url).searchParams.get("body") ?? "");
    expect(body).toContain("We need SAP HANA support.");
  });
});
