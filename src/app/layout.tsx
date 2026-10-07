import type { Metadata } from "next";
import { Geist, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/topbar";
import MotionProvider from "@/components/motion-provider";
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
  title: "Gratitude | Rewards at the places you love",
  description:
    "Give your number at the counter and earn at every Gratitude brand. One Pass for all your rewards, and loyalty programs brands can launch in minutes.",
  icons: {
    icon: { url: "/gratitude-white.svg", type: "image/svg+xml" },
  },
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
        <MotionProvider>
          <Topbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
