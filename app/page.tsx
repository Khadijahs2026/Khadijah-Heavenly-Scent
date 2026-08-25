import { GoldArc } from "@/components/GoldArc";
import { GoldDust } from "@/components/GoldDust";
import { SignupForm } from "@/components/SignupForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

/**
 * The sunset the flyer photographs, painted instead: a warm bloom at the
 * horizon falling away into the same navy the wordmark sits on.
 */
const SUNSET = {
  backgroundImage: [
    "radial-gradient(58% 34% at 50% 12%, rgba(255,226,176,0.9) 0%, rgba(255,186,150,0.45) 45%, rgba(255,186,150,0) 76%)",
    "linear-gradient(180deg, #f7cdad 0%, #f0b6a2 14%, #d5959d 34%, #96769a 56%, #46497c 78%, #142f66 100%)",
  ].join(","),
};

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col overflow-hidden">
      <section className="relative flex flex-1 flex-col items-center justify-center bg-navy px-6 pt-20 pb-10 text-center">
        <GoldDust className="opacity-45" />

        <h1 className="relative font-display text-[clamp(3.25rem,13vw,9rem)] italic leading-[0.95] text-gold">
          Khadijah&rsquo;s
        </h1>
        <p className="relative mt-3 pl-[0.42em] font-sans text-[clamp(0.75rem,2.5vw,1.4rem)] font-light uppercase tracking-[0.42em] text-gold-soft/85">
          {site.tagline}
        </p>
      </section>

      {/* The arc lives inside the sunset band so the sky shows through it. */}
      <section style={SUNSET} className="relative pb-10">
        <GoldArc />

        <div className="px-6 pt-10 sm:pt-12">
          <div className="mx-auto max-w-xl rounded-3xl border border-gold/25 bg-navy-deep/70 px-6 py-9 text-center shadow-2xl shadow-navy-deep/40 backdrop-blur-md sm:px-10 sm:py-10">
            <h2 className="font-display text-[clamp(1.75rem,5vw,2.6rem)] italic leading-tight text-gold">
              Join our mailing list
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-relaxed text-gold-soft/85">
              Something beautiful is on its way. Be the first to hear about our
              launch, new fragrances, and everything still to come.
            </p>

            <div className="mt-7">
              <SignupForm />
            </div>
          </div>
        </div>

        <footer className="relative mx-auto mt-11 flex max-w-xl flex-col items-center gap-5 px-6 text-center">
          <SocialLinks />

          <a
            href={`mailto:${site.email}`}
            className="text-sm tracking-wide text-gold-soft/85 underline-offset-4 transition hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {site.email}
          </a>

          <p className="text-xs tracking-[0.18em] text-gold-soft/65 uppercase">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </section>
    </main>
  );
}
