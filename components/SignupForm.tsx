"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    setStatus({ kind: "sending" });
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          company: form.get("company"), // honeypot
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setEmail("");
      setStatus({ kind: "done" });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Please check your connection.",
      });
    }
  }

  if (status.kind === "done") {
    return (
      <p
        role="status"
        className="rounded-2xl border border-gold/40 bg-navy-deep/60 px-6 py-5 text-center text-base text-gold-soft backdrop-blur-sm"
      >
        <span className="font-display text-xl italic text-gold">Thank you.</span>
        <br />
        You&rsquo;re on the list — we&rsquo;ll be in touch with our first update soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          aria-invalid={status.kind === "error"}
          aria-describedby={status.kind === "error" ? "signup-error" : undefined}
          className="min-w-0 flex-1 rounded-full border border-gold/40 bg-navy-deep/60 px-6 py-3.5 text-base text-gold-soft placeholder:text-gold-soft/60 backdrop-blur-sm transition focus:border-gold focus:outline-2 focus:outline-offset-2 focus:outline-gold"
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="rounded-full bg-gradient-to-b from-gold-soft to-gold-deep px-8 py-3.5 text-base font-medium tracking-wide text-navy-deep transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status.kind === "sending" ? "Joining…" : "Join the list"}
        </button>
      </div>

      {status.kind === "error" && (
        <p
          id="signup-error"
          role="alert"
          className="mt-3 text-center text-sm text-rose-100 sm:text-left"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
