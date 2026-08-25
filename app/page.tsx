import { HeroPoster } from "@/components/HeroPoster";
import { SignupForm } from "@/components/SignupForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col bg-navy-deep wide:block wide:h-dvh">
      <h1 className="sr-only">{site.name}</h1>

      <HeroPoster />

      <section className="relative px-6 pt-4 pb-6 wide:absolute wide:inset-x-0 wide:bottom-0 wide:pb-10">
        {/*
          On phones this is plain content on the page's own navy. From `wide` up
          it sits over the photograph, so it becomes a panel — contained, rather
          than darkening the whole lower half of the poster and burying the
          sunset and the meadow with it.
        */}
        <div className="flex flex-col items-center text-center wide:mx-auto wide:max-w-2xl wide:rounded-3xl wide:border wide:border-gold/20 wide:bg-navy-deep/75 wide:px-10 wide:py-8 wide:shadow-2xl wide:shadow-navy-deep/50 wide:backdrop-blur-md">
          <h2 className="font-display text-[clamp(1.6rem,5vw,2.4rem)] italic leading-tight text-gold">
            Join our mailing list
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-gold-soft/85">
            Something beautiful is on its way. Be the first to hear about our
            launch, new fragrances, and everything still to come.
          </p>

          <div className="mt-7 w-full max-w-lg">
            <SignupForm />
          </div>

          <footer className="flex w-full flex-col items-center gap-3 pt-7 wide:pt-6">
            <SocialLinks />

            <a
              href={`mailto:${site.email}`}
              className="text-sm tracking-wide text-gold-soft/85 underline-offset-4 transition hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {site.email}
            </a>

            <p className="text-xs tracking-[0.18em] text-gold-soft/80 uppercase">
              &copy; {new Date().getFullYear()} {site.name}
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
