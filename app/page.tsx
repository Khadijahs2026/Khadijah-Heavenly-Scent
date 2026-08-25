import { HeroPoster } from "@/components/HeroPoster";
import { SignupForm } from "@/components/SignupForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-navy-deep">
      <h1 className="sr-only">{site.name}</h1>

      <HeroPoster />

      {/*
        Always beneath the poster, never over it, so the form has its own space
        and the artwork is never obscured. On `wide` the poster flexes to fill
        whatever this leaves, which is what keeps the page to a single screen.
      */}
      {/*
        The poster's height is set by its aspect ratio, so on a screen taller
        than poster + form the slack collects here — centring keeps it balanced
        instead of pooling under the footer. Where there is no slack (any wide
        screen, where the poster alone exceeds the viewport) this is inert.
      */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 pt-6 pb-8 text-center">
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.25rem)] italic leading-tight text-gold">
          Join our mailing list
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-gold-soft/85">
          Something beautiful is on its way. Be the first to hear about our
          launch, new fragrances, and everything still to come.
        </p>

        <div className="mt-6 w-full max-w-lg">
          <SignupForm />
        </div>

        <footer className="flex w-full flex-col items-center gap-3 pt-6">
          <SocialLinks />

          <p className="flex flex-col items-center gap-2 text-sm tracking-wide text-gold-soft/85 sm:flex-row sm:gap-3">
            <a
              href={`mailto:${site.email}`}
              className="underline-offset-4 transition hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {site.email}
            </a>
            <span aria-hidden="true" className="hidden text-gold/40 sm:inline">
              &middot;
            </span>
            <span className="text-xs tracking-[0.16em] text-gold-soft/70 uppercase">
              &copy; {new Date().getFullYear()} {site.name}
            </span>
          </p>
        </footer>
      </section>
    </main>
  );
}
