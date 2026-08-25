import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const GENERIC_ERROR =
  "We couldn't add you to the list just now. Please try again in a moment.";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, company } = (body ?? {}) as {
    email?: unknown;
    company?: unknown;
  };

  // A filled honeypot means a bot. Return success so it doesn't retry.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const address = email.trim().toLowerCase();

  const { ok, retryAfter } = rateLimit(clientIp(request));
  if (!ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[subscribe] RESEND_API_KEY is not set — the signup from %s was NOT delivered. " +
        "Add the key in Vercel project settings and redeploy.",
      address,
    );
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const from =
    process.env.SIGNUP_FROM ?? `${site.name} <signups@khadijahs.com>`;
  const to = process.env.SIGNUP_TO ?? site.email;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: address,
      subject: `New mailing list signup: ${address}`,
      text: [
        `${address} just joined the mailing list at ${site.url}.`,
        "",
        `Received: ${new Date().toUTCString()}`,
      ].join("\n"),
    });

    if (error) {
      // Surfaced in Vercel's function logs — most often an unverified sender
      // domain, which is silent from the visitor's side otherwise.
      console.error(
        "[subscribe] Resend rejected the notification for %s: %s",
        address,
        error.message,
      );
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("[subscribe] Unexpected failure for %s:", address, cause);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
