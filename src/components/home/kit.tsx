"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Pointer } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  useWaitlistStore,
  type WaitlistAudience,
} from "@/stores/waitlist-store";

/** Audience colours: violet is the consumer's (Pass), orange the brand's (Studio). */
export const ACCENT = {
  consumer: "var(--pass)",
  brand: "var(--studio)",
} as const;

/** A serif heading. Wrap one word in <em> for the italic accent. */
export function SerifTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "text-balance font-normal font-serif leading-[0.95] tracking-tight",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** A small uppercase mono label: dates, counts, section markers. */
export function MonoLabel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-widest text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The product's primary action: an ink pill with the label on the left and an
 * accent disc carrying the icon on the right.
 */
export function PillButton({
  icon,
  accent,
  className,
  children,
  ...props
}: ComponentProps<"button"> & { icon: ReactNode; accent: string }) {
  return (
    <button
      type="button"
      className={cn(
        "group inline-flex h-12 cursor-pointer items-center justify-between gap-4 rounded-full bg-ink pr-1.5 pl-5 text-sm text-white transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-ring/40 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <span
        className="flex size-9 items-center justify-center rounded-full text-ink transition-transform group-hover:rotate-[-8deg] [&_svg]:size-4"
        style={{ backgroundColor: accent }}
      >
        {icon}
      </span>
    </button>
  );
}

/**
 * Shows what to tap: a pulsing ring around its (positioned) parent and a
 * pointing hand below it. Appears while its `group/try` section is on screen
 * (see `useTrySection`) or hovered, and always on touch screens.
 */
export function TapHint({
  label,
  center = false,
  className,
}: {
  label?: string;
  /** Hand below the middle instead of the corner, for full-width targets. */
  center?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-1 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/try:opacity-100 group-data-[try=on]/try:opacity-100 pointer-coarse:opacity-100",
        className,
      )}
    >
      <span className="absolute inset-0 animate-pulse rounded-[inherit] ring-2 ring-pass" />
      <span
        className={cn(
          "absolute top-full flex -translate-y-3 items-start gap-1",
          center ? "left-1/2 -translate-x-2.5" : "left-full -translate-x-4",
        )}
      >
        <Pointer
          className="size-5 shrink-0 animate-bounce fill-white text-ink"
          strokeWidth={1.75}
        />
        {label && (
          <span className="mt-3 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] text-white uppercase tracking-wider">
            {label}
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * For a section holding a try-it demo: spread `props` on it (alongside the
 * `group/try` class) to switch its TapHints on while it's on screen, so nobody
 * has to hover first. `inView` says whether it's on screen.
 */
export function useTrySection<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // On screen = covering the middle of the viewport, however tall the section is.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  return { inView, props: { ref, "data-try": inView ? "on" : "off" } } as const;
}

/** Set the waitlist audience and scroll to the form. */
export function useJoin() {
  const setAudience = useWaitlistStore((store) => store.setAudience);
  return (audience: WaitlistAudience) => {
    setAudience(audience);
    document
      .getElementById("waiting-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };
}

/**
 * The product's quiet backdrop: a dot grid fading towards the edges and a soft
 * glow trailing the cursor. Fills its (positioned) parent.
 */
export function DotBackdrop({
  glow = "#8B5CF6",
  className,
}: {
  glow?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const gx = useMotionValue(-1000);
  const gy = useMotionValue(-1000);
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx}px ${gy}px, color-mix(in oklab, ${glow} 16%, transparent), transparent 70%)`;

  // On the window: the content above the backdrop would swallow the pointer.
  useEffect(() => {
    if (reduceMotion) return;
    function onMove(e: PointerEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      gx.set(e.clientX - rect.left);
      gy.set(e.clientY - rect.top);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, gx, gy]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <div
        className="absolute inset-0 text-ink/15 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div className="absolute inset-0" style={{ background }} />
    </div>
  );
}

/** A four-point sparkle, drawn in ink like the product's stickers. */
export function Sparkle({
  className,
  fill = "var(--sun)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5C11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5Z"
        fill={fill}
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
