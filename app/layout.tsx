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
    description:
      "Experienced, passionate, and professional realtor in the Greater Toronto Area. Licensed mortgage agent. Since 2010.",
    type: "website",
    locale: "en_CA",
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
