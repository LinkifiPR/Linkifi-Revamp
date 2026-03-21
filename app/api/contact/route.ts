import { NextResponse } from "next/server";
import { z } from "zod";
import { getContactEmailConfig, hasContactEmailConfig } from "@/lib/contact-email";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(240),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().trim().min(1).max(240),
  service: z.string().trim().min(1).max(120),
  selectedOffer: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
  honeypot: z.string().trim().max(0).optional().or(z.literal("")),
});

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildPlainTextEmail(payload: z.infer<typeof contactSchema>): string {
  return [
    "New Linkifi contact form enquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "Not provided"}`,
    `Website: ${payload.website}`,
    `Service: ${payload.service}`,
    `Selected offer: ${payload.selectedOffer || "Not specified"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function buildHtmlEmail(payload: z.infer<typeof contactSchema>): string {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "Not provided"],
    ["Website", payload.website],
    ["Service", payload.service],
    ["Selected offer", payload.selectedOffer || "Not specified"],
  ];

  const detailRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;font-weight:600;color:#1b1c33;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#4d5072;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="background:#f7f4ff;padding:32px 20px;font-family:Inter,Arial,sans-serif;color:#1b1c33;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e8e1f7;border-radius:24px;padding:32px;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7a7c98;">Linkifi contact form</p>
        <h1 style="margin:0 0 24px;font-size:28px;line-height:1.1;">New enquiry received</h1>
        <table style="width:100%;border-collapse:collapse;">${detailRows}</table>
        <div style="margin-top:24px;border-top:1px solid #ece7f5;padding-top:24px;">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7a7c98;">Message</p>
          <p style="margin:0;white-space:pre-wrap;font-size:16px;line-height:1.7;color:#2a2d48;">${escapeHtml(payload.message)}</p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  if (!hasContactEmailConfig()) {
    return NextResponse.json(
      { error: "Contact form email delivery is not configured on the server." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete all required contact fields." }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const config = getContactEmailConfig();
  if (!config.resendApiKey || !config.toEmail || !config.fromEmail) {
    return NextResponse.json(
      { error: "Contact form email delivery is not configured on the server." },
      { status: 503 },
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      subject: `New Linkifi enquiry${parsed.data.company ? ` - ${parsed.data.company}` : ` - ${parsed.data.name}`}`,
      reply_to: parsed.data.email,
      text: buildPlainTextEmail(parsed.data),
      html: buildHtmlEmail(parsed.data),
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Contact form email send failed.", errorText);

    return NextResponse.json(
      { error: "We could not send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
