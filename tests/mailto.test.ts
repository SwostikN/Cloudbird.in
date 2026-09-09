import { describe, expect, it } from "vitest";
import { buildEnquiryMailto } from "@/lib/mailto";

/**
 * Reference implementation, copied verbatim from the original single-file
 * build. The port must produce a byte-identical mailto URL.
 */
function original(name: string, email: string, msg: string) {
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + msg);
  const subj = encodeURIComponent("Website enquiry from " + name);
  return "mailto:Support@cloudbird.in?subject=" + subj + "&body=" + body;
}

const cases: [string, string, string][] = [
  ["Asha Rao", "asha@example.com", "We need SAP HANA support."],
  ["O'Neil & Sons", "a+b@x.co.in", "Line 1\nLine 2 - 50% off?"],
  ["राम", "ram@example.np", "नमस्ते"],
  ["Иван", "ivan@example.kz", "Нужна помощь с SAP"],
];

describe("buildEnquiryMailto", () => {
  it.each(cases)("matches the original for %s", (name, email, msg) => {
    expect(buildEnquiryMailto({ name, email, msg })).toBe(original(name, email, msg));
  });

  it("addresses the support inbox", () => {
    const url = buildEnquiryMailto({ name: "A", email: "b@c.d", msg: "hi" });
    expect(url.startsWith("mailto:Support@cloudbird.in?subject=")).toBe(true);
  });
});
