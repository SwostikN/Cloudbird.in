import { SUPPORT_EMAIL } from "@/data/site";

export type Enquiry = { name: string; email: string; msg: string };

/**
 * Builds the `mailto:` URL the contact form hands to the visitor's mail client.
 * Kept separate from the component so the exact URL can be asserted in tests.
 */
export function buildEnquiryMailto({ name, email, msg }: Enquiry): string {
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  const subject = encodeURIComponent(`Website enquiry from ${name}`);
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}
