import { HeroPoster } from "@/components/HeroPoster";
import { SignupForm } from "@/components/SignupForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-navy-deep">
      <h1 className="sr-only">{site.name}</h1>

      <HeroPoster />

      <section className="flex flex-col items-center px-6 pt-2 pb-10 text-center">
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

        <footer className="flex w-full flex-col items-center gap-5 pt-14">
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
