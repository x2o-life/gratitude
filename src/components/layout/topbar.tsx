"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#for-you", label: "For you" },
  { href: "/#for-brands", label: "For brands" },
  { href: "/#questions", label: "Questions" },
];

export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-6">
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full py-1.5 pr-1.5 pl-2.5 transition-all duration-300",
          scrolled
            ? "sticker-sm bg-white/95 backdrop-blur"
            : "border-2 border-transparent",
        )}
      >
        <a
          href="/#top"
          className="flex items-center gap-2 font-serif text-2xl leading-none tracking-tight"
        >
          <Image
            src="/gratitude-white.svg"
            alt=""
            width={338}
            height={349}
            loading="eager"
            className="h-8 w-auto"
          />
          Gratitude
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-pass-wash hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* biome-ignore lint/a11y/useValidAnchor: real link; onClick only records the click */}
        <a
          href="/#waiting-list"
          onClick={() => track("waitlist_cta_click", { location: "topbar" })}
          className="group inline-flex h-10 items-center gap-3 rounded-full bg-ink pr-1 pl-4 text-sm text-white"
        >
          Join the waitlist
          <span className="flex size-8 items-center justify-center rounded-full bg-pass text-ink transition-transform group-hover:-rotate-12">
            <ArrowRight className="size-4" />
          </span>
        </a>
      </nav>
    </header>
  );
}
