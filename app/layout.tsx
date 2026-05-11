import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { LenisProvider } from "@/lib/lenis-provider";
import { site } from "@/content";
import "./globals.css";

/**
 * Two fonts only (see task.md §3). Instrument Serif for h1/h2 only;
 * Hanken Grotesk for everything else. CSS vars are wired in globals.css
 * via @theme so Tailwind's font-serif / font-sans classes resolve.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

// Shared description used by both OpenGraph and Twitter so previews stay
// in sync. Kept short enough to render in full inside a Facebook / LinkedIn
// / iMessage / Twitter card without truncation.
const SHARE_DESCRIPTION =
  "Experienced, passionate, and professional realtor in the Greater Toronto Area. Licensed mortgage agent. Since 2010.";

const SHARE_IMAGE = {
  // Wide brand hero (already has the dark vignette baked in, so overlay text
  // from social platforms stays legible). 1920×810 ≈ 2.37:1, close to OG's
  // 1.91:1 ideal — minimal cropping across Facebook, LinkedIn, iMessage.
  url: "/50.webp",
  width: 1920,
  height: 810,
  alt: `${site.name} — ${site.role}, Greater Toronto Area`,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aliazam.ca"),
  title: {
    default: `${site.name} — ${site.role} · Greater Toronto Area`,
    template: `%s · ${site.name}`,
  },
  description:
    "Ali Azam: experienced realtor and mortgage agent serving the Greater Toronto Area since 2010. Right At Home Realty.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: SHARE_DESCRIPTION,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_CA",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
