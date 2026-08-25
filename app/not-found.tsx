import Link from "next/link";
import { GoldDust } from "@/components/GoldDust";
import { site } from "@/lib/site";

export const metadata = {
  title: `Page not found — ${site.name}`,
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-navy px-6 text-center">
      {/* Lighter than the hero's: this page is full-height, so the flecks
          stretch larger and read heavier at the same opacity. */}
      <GoldDust className="opacity-25" />

      <p className="relative font-display text-[clamp(2.5rem,9vw,5rem)] italic leading-none text-gold">
        Khadijah&rsquo;s
      </p>
      <p className="relative mt-2 pl-[0.42em] text-[clamp(0.65rem,2vw,0.9rem)] font-light uppercase tracking-[0.42em] text-gold-soft/85">
        {site.tagline}
      </p>

      <p className="relative mt-10 max-w-sm text-base leading-relaxed text-gold-soft/85">
        There&rsquo;s nothing at this address — but there will be soon.
      </p>

      <Link
        href="/"
        className="relative mt-7 rounded-full border border-gold/40 px-7 py-3 text-sm tracking-wide text-gold-soft transition hover:border-gold hover:bg-gold/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Back to the beginning
      </Link>
    </main>
  );
}
