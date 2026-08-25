import { socials } from "@/lib/site";

const ICONS = {
  // Outlined, to sit lightly against the gold.
  instagram: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Solid glyphs — these read better filled than stroked.
  facebook: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13.9 21v-7.2h2.4l.4-3h-2.8V9c0-.8.3-1.2 1.2-1.2h1.7V5.1A20 20 0 0 0 14.4 5c-2.4 0-4 1.5-4 4.2v1.6H8v3h2.4V21h3.5Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M15.6 3h-2.9v12.3a2.4 2.4 0 1 1-2-2.4v-2.9a5.3 5.3 0 1 0 4.9 5.3V9.5a6.4 6.4 0 0 0 3.6 1.1V7.7a3.6 3.6 0 0 1-3.6-3.6V3Z" />
    </svg>
  ),
} as const;

export function SocialLinks() {
  if (socials.length === 0) return null;

  return (
    <ul className="flex items-center justify-center gap-4">
      {socials.map((social) => (
        <li key={social.href}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} — opens in a new tab`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition hover:border-gold hover:bg-gold/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {ICONS[social.icon]}
          </a>
        </li>
      ))}
    </ul>
  );
}
