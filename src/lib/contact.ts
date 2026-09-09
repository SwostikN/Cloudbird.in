export type Enquiry = {
  name: string;
  email: string;
  msg: string;
};

/** Guards against a runaway paste and against headers being stuffed with junk. */
export const LIMITS = { name: 120, email: 200, msg: 5000 } as const;

export type ParseResult =
  | { ok: true; enquiry: Enquiry }
  | { ok: false; reason: "incomplete" | "email" | "too_long" | "spam" };

/**
 * Shape of the JSON the contact form posts. `company` is a honeypot: it is
 * hidden from people and left empty, so anything in it came from a bot.
 */
type RawEnquiry = {
  name?: unknown;
  email?: unknown;
  msg?: unknown;
  company?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Deliberately loose: the point is to catch typos, not to police addresses. */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Validates an enquiry the same way on the client and on the server, so the
 * form never posts something the route will reject.
 */
export function parseEnquiry(raw: RawEnquiry): ParseResult {
  if (str(raw.company)) return { ok: false, reason: "spam" };

  const name = str(raw.name);
  const email = str(raw.email);
  const msg = str(raw.msg);

  if (!name || !email || !msg) return { ok: false, reason: "incomplete" };
  if (!looksLikeEmail(email)) return { ok: false, reason: "email" };
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    msg.length > LIMITS.msg
  ) {
    return { ok: false, reason: "too_long" };
  }

  return { ok: true, enquiry: { name, email, msg } };
}

/** Subject and body of the mail sent to the support inbox. */
export function formatEnquiry(enquiry: Enquiry) {
  return {
    subject: `Website enquiry from ${enquiry.name}`,
    text: `Name: ${enquiry.name}\nEmail: ${enquiry.email}\n\n${enquiry.msg}`,
  };
}
