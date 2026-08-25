import { HeroPoster } from "@/components/HeroPoster";
import { SignupForm } from "@/components/SignupForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-navy-deep wide:h-dvh">
      <h1 className="sr-only">{site.name}</h1>

      <HeroPoster />

      {/*
        On `wide` this is deliberately compact — every pixel it gives up is a
        pixel of poster. The heading and copy shrink and the footer collapses
        onto one row, which buys the poster roughly three quarters of the screen
        while the form stays fully visible without scrolling.
      */}
      <section className="flex flex-1 shrink-0 flex-col items-center justify-center px-6 pt-6 pb-8 text-center wide:flex-none wide:pt-7 wide:pb-7">
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.25rem)] italic leading-tight text-gold wide:text-[1.75rem]">
          Join our mailing list
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-gold-soft/85 wide:max-w-3xl wide:text-[0.9rem]">
          Something beautiful is on its way. Be the first to hear about our
          launch, new fragrances, and everything still to come.
        </p>

        <div className="mt-6 w-full max-w-lg wide:mt-5">
          <SignupForm />
        </div>

        <footer className="flex w-full flex-col items-center gap-3 pt-6 wide:flex-row wide:justify-center wide:gap-5 wide:pt-5">
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
