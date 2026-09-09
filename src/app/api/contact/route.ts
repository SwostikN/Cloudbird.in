import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SUPPORT_EMAIL } from "@/data/site";
import { formatEnquiry, parseEnquiry } from "@/lib/contact";

/** Always run on request; nothing here can be prerendered. */
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO_EMAIL || SUPPORT_EMAIL;

/**
 * Must be an address on a domain verified in Resend. Until cloudbird.in is
 * verified, Resend's shared `onboarding@resend.dev` works but only delivers
 * to the Resend account owner.
 */
const FROM = process.env.CONTACT_FROM_EMAIL || "Cloud Bird India <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseEnquiry(body as Record<string, unknown>);

  if (!parsed.ok) {
    // A honeypot hit is a bot. Answer as though it worked so it learns nothing.
    if (parsed.reason === "spam") return NextResponse.json({ ok: true });
    return NextResponse.json({ error: parsed.reason }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — the contact form cannot send mail.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const { subject, text } = formatEnquiry(parsed.enquiry);

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: [TO],
      // Hitting reply in the support inbox answers the visitor directly.
      replyTo: parsed.enquiry.email,
      subject,
      text,
    });

    if (error) {
      console.error("Resend rejected the enquiry:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (cause) {
    console.error("Could not reach Resend:", cause);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
