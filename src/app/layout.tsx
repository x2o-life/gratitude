import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsInit from "@/components/analytics/analytics-init";
import Topbar from "@/components/layout/topbar";
import MotionProvider from "@/components/motion-provider";
import { JsonLd, siteJsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display type: headlines, big numbers.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Labels, dates, counts and codes.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.company }],
  creator: SITE.company,
  publisher: SITE.company,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        instrumentSerif.variable,
        spaceMono.variable,
      )}
    >
      <body className="flex min-h-screen h-full flex-col font-sans">
        <JsonLd data={siteJsonLd} />
        <AnalyticsInit />
        <MotionProvider>
          <Topbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
