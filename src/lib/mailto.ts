import { SUPPORT_EMAIL } from "@/data/site";
import { formatEnquiry, type Enquiry } from "@/lib/contact";

/**
 * Builds a prefilled `mailto:` URL. Used only as a fallback when the contact
 * API cannot be reached, so the visitor never loses what they typed.
 */
export function buildEnquiryMailto(enquiry: Enquiry): string {
  const { subject, text } = formatEnquiry(enquiry);
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(text)}`;
}
