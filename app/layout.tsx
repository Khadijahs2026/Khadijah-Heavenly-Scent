import type { Metadata, Viewport } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Only the italic 400 is ever set — loading the roman or heavier weights just
// costs a preload the page never redeems.
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Coming Soon`,
  description: site.description,
  openGraph: {
    title: `${site.name} — Coming Soon`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/hero-1536.jpg", width: 1536, height: 872, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Coming Soon`,
    description: site.description,
    images: ["/hero-1536.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d2049",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
