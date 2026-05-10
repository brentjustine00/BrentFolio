import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const MAX_LEN = {
  name: 120,
  email: 254,
  message: 4000,
} as const;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof payload !== "object" || payload === null) return { ok: false, error: "Invalid payload." };

  const maybe = payload as Partial<Record<keyof ContactPayload, unknown>>;

  if (!isNonEmptyString(maybe.name)) return { ok: false, error: "Name is required." };
  if (!isNonEmptyString(maybe.email)) return { ok: false, error: "Email is required." };
  if (!isNonEmptyString(maybe.message)) return { ok: false, error: "Message is required." };

  const name = maybe.name.trim();
  const email = maybe.email.trim();
  const message = maybe.message.trim();

  if (name.length > MAX_LEN.name) return { ok: false, error: "Name is too long." };
  if (email.length > MAX_LEN.email) return { ok: false, error: "Email is too long." };
  if (!isEmail(email)) return { ok: false, error: "Email is invalid." };
  if (message.length > MAX_LEN.message) return { ok: false, error: "Message is too long." };

  return { ok: true, data: { name, email, message } };
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const validated = validatePayload(body);
    if (!validated.ok) {
      return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
    }

    const smtpUser = requiredEnv("BREVO_SMTP_USER");
    const smtpPass = requiredEnv("BREVO_SMTP_PASS");
    const toEmail = requiredEnv("CONTACT_TO_EMAIL");
    const fromEmail = requiredEnv("CONTACT_FROM_EMAIL");
    const fromName = process.env.CONTACT_FROM_NAME || "BrentFolio Contact";

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const { name, email, message } = validated.data;
    const subject = `New contact message from ${name}`;

    await transporter.sendMail({
      from: { name: fromName, address: fromEmail },
      to: toEmail,
      replyTo: { name, address: email },
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
      html: `
        <div>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr />
          <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
            message
          )}</pre>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

