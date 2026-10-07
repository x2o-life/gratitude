"use client";

import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "./kit";
import { PassPhone } from "./phone";

/**
 * The problem in one picture: a pile of punch cards, keytags, apps and coupons
 * that collapses, as you scroll, into a single Pass.
 */
export default function PileToPass() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Reduced motion skips the story and shows the Pass straight away.
  const progress = useTransform(scrollYProgress, (v) => (reduceMotion ? 1 : v));

  const stageRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) =>
      setFit(Math.min(1, entry.contentRect.height / PHONE_HEIGHT)),
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const phoneScale = useTransform(progress, [0.35, 0.7], [0.7, 1]);
  const phoneOpacity = useTransform(progress, [0.35, 0.6], [0, 1]);
  const phoneY = useTransform(progress, [0.35, 0.7], [40, 0]);
  const beforeOpacity = useTransform(progress, [0.25, 0.4], [1, 0]);
  const afterOpacity = useTransform(progress, [0.55, 0.7], [0, 1]);

  return (
    <section
      id="one-pass"
      ref={ref}
      className={cn("relative", reduceMotion ? "h-svh" : "h-[220svh]")}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center overflow-hidden">
        <div className="relative z-20 w-full px-4 pt-24 text-center md:pt-28">
          <MonoLabel>Before · after</MonoLabel>
          <div className="relative mt-3 h-24 md:h-32">
            <motion.p
              style={{ opacity: beforeOpacity }}
              className="absolute inset-x-0 mx-auto max-w-3xl text-balance font-serif text-3xl leading-tight md:text-5xl"
            >
              Three cards, an app you can&apos;t log into, a coupon that
              expired.
            </motion.p>
            <motion.p
              style={{ opacity: afterOpacity }}
              className="absolute inset-x-0 mx-auto max-w-3xl text-balance font-serif text-3xl leading-tight md:text-5xl [&_em]:text-pass-strong"
            >
              One Pass. <em>Every</em> brand. Nothing to carry.
            </motion.p>
          </div>
        </div>

        {/* The stage: scattered loyalty clutter, then one Pass. */}
        <div className="relative z-10 mb-6 w-full max-w-6xl flex-1">
          {CLUTTER.map((item) => (
            <ClutterCard key={item.id} item={item} progress={progress} />
          ))}

          <div
            ref={stageRef}
            className="absolute inset-x-0 inset-y-3 flex items-center justify-center"
          >
            <motion.div
              style={{ scale: phoneScale, opacity: phoneOpacity, y: phoneY }}
            >
              {/* Drawn at full size, then scaled to fit short screens. */}
              <div style={{ transform: `scale(${fit})` }}>
                <PassPhone className="h-[440px]">
                  <HeroPassScreen />
                </PassPhone>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PHONE_HEIGHT = 440;

type Clutter = {
  id: string;
  /** Resting offset from the stage centre, in vw / svh. */
  x: number;
  y: number;
  rotate: number;
  className?: string;
  content: ReactNode;
};

function ClutterCard({
  item,
  progress,
}: {
  item: Clutter;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0.05, 0.5], [`${item.x}vw`, "0vw"]);
  const y = useTransform(progress, [0.05, 0.5], [`${item.y}svh`, "0svh"]);
  const rotate = useTransform(progress, [0.05, 0.5], [item.rotate, 0]);
  const scale = useTransform(progress, [0.05, 0.5], [1, 0.45]);
  const opacity = useTransform(progress, [0.4, 0.52], [1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-1/2 left-1/2"
      style={{ x, y, rotate, scale, opacity }}
    >
      <div
        className={cn(
          "sticker-sm -translate-x-1/2 -translate-y-1/2 scale-75 rounded-2xl md:scale-100",
          item.className,
        )}
      >
        {item.content}
      </div>
    </motion.div>
  );
}

const CLUTTER: Clutter[] = [
  {
    id: "punch",
    x: -30,
    y: -6,
    rotate: -9,
    className: "w-40 bg-cream p-3 md:w-52",
    content: (
      <>
        <p className="font-mono text-[9px] uppercase tracking-widest">
          Brew Lab · coffee card
        </p>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: decoration
              key={i}
              className={cn(
                "aspect-square rounded-full border-[1.5px] border-ink",
                i < 3 && "bg-ink",
              )}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Left in an old bag
        </p>
      </>
    ),
  },
  {
    id: "keytag",
    x: 29,
    y: -9,
    rotate: 11,
    className:
      "flex w-36 items-center gap-2 rounded-full bg-studio p-2 md:w-44",
    content: (
      <>
        <span className="size-4 shrink-0 rounded-full border-2 border-ink bg-background" />
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-bold">FRESHMART</p>
          <div className="mt-0.5 flex h-3 gap-px">
            {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1].map((w, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: decoration
                key={i}
                className="h-full bg-ink"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </>
    ),
  },
  {
    id: "app",
    x: -25,
    y: 10,
    rotate: 6,
    className: "w-40 bg-white p-3 md:w-48",
    content: (
      <>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border-2 border-ink bg-sun font-serif text-sm">
            L
          </span>
          <p className="text-xs font-semibold">Loaf &amp; Co app</p>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Log in to see your points
        </p>
        <p className="mt-1 text-[10px] text-pass-strong underline">
          Forgot password?
        </p>
      </>
    ),
  },
  {
    id: "coupon",
    x: 27,
    y: 10,
    rotate: -7,
    className: "w-36 border-dashed bg-white p-3 md:w-44",
    content: (
      <>
        <p className="font-serif text-2xl leading-none text-coral line-through">
          10% off
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          Expired 3 weeks ago
        </p>
      </>
    ),
  },
  {
    id: "salon",
    x: -6,
    y: -12,
    rotate: -3,
    className: "hidden w-40 bg-mint p-3 sm:block",
    content: (
      <>
        <p className="font-mono text-[9px] uppercase tracking-widest">
          Petal Salon
        </p>
        <p className="mt-1 text-xs">Visits: 0 of 6</p>
        <p className="text-[10px]">Card left at home</p>
      </>
    ),
  },
  {
    id: "receipt",
    x: 9,
    y: 13,
    rotate: 4,
    className: "w-32 bg-white p-3",
    content: (
      <>
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          Points balance
        </p>
        <p className="font-serif text-2xl leading-none">???</p>
      </>
    ),
  },
];

/** Just the essentials: who, how much is waiting, and where. */
function HeroPassScreen() {
  return (
    <div className="flex flex-col px-1.5 pt-4">
      <p className="font-serif text-xl leading-none [&_em]:text-pass-strong">
        Morning, <em>Mike</em>
      </p>

      <p className="mt-8 text-[10px] text-muted-foreground">Waiting for you</p>
      <p className="mt-1 font-serif text-4xl leading-none tabular-nums">
        LKR 2,350
      </p>

      <ul className="mt-8 divide-y divide-ink/10 border-ink/10 border-y">
        {REWARDS.map(({ brand, status }) => (
          <li
            key={brand}
            className="flex items-center justify-between py-2.5 text-[11px]"
          >
            <span className="font-medium">{brand}</span>
            <span className="text-muted-foreground">{status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const REWARDS = [
  { brand: "Brew Lab", status: "1 stamp to go" },
  { brand: "Loaf & Co", status: "Free loaf" },
  { brand: "Petal Salon", status: "240 pts" },
];
