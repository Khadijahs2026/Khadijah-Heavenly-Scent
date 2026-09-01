export const site = {
  name: "Khadijah's Heavenly Scents",
  tagline: "Heavenly Scents",
  email: "info@khadijahs.com",
  url: "https://khadijahs.com",
  description:
    "Something beautiful is on its way. Join the Khadijah's Heavenly Scents mailing list for launch news and early access.",
} as const;

/**
 * Social profiles shown in the footer. Add or remove entries freely — the
 * footer renders whatever is in this list, and renders nothing at all if the
 * list is empty. Icons for Facebook and TikTok already exist in SocialLinks.
 */
export const socials: { label: string; href: string; icon: "instagram" | "facebook" | "tiktok" }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/khadijahsheavenlyscents",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/khadijahsheavenlyscents",
    icon: "facebook",
  },
];
