import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { site } from "@/content";
import "./globals.css";

/**
 * Premium-broker type pairing:
 *   - Cormorant Garamond (serif) for h1/h2 display — quiet, editorial luxury.
 *   - Inter (sans) for body, UI, and small caps.
 * Native scroll only — no smooth-scroll library. Calm motion preferred.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SHARE_DESCRIPTION =
  "Experienced, passionate, and professional realtor in the Greater Toronto Area. Licensed mortgage agent. Since 2010.";

const SHARE_IMAGE = {
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
  themeColor: "#F8F6F2",
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
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
