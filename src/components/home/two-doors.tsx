"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Croissant, Store } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  MonoLabel,
  PillButton,
  SerifTitle,
  Sparkle,
  TapHint,
  useJoin,
  useTrySection,
} from "./kit";

/** The fork: one door for people who shop, one for people who run a shop. */
export default function TwoDoors() {
  const trySection = useTrySection<HTMLElement>();
  return (
    <section {...trySection.props} className="group/try px-4 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <MonoLabel>Two sides, one Gratitude</MonoLabel>
          <SerifTitle className="mt-3 text-4xl md:text-6xl">
            Which one are you?
          </SerifTitle>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          <ConsumerDoor />
          <BrandDoor />
        </div>
      </div>
    </section>
  );
}

const STAMP_TOTAL = 8;

function ConsumerDoor() {
  const join = useJoin();
  // Endowed progress: the card never starts empty.
  const [stamps, setStamps] = useState(2);
  const done = stamps >= STAMP_TOTAL;
  const left = STAMP_TOTAL - stamps;

  return (
    <div
      id="for-you"
      className="sticker flex scroll-mt-24 flex-col rounded-3xl bg-pass-wash p-6 md:p-8"
      style={{ boxShadow: "6px 6px 0 0 var(--pass)" }}
    >
      <MonoLabel className="text-pass-strong">For people who shop</MonoLabel>
      <SerifTitle
        as="h3"
        className="mt-3 text-5xl md:text-6xl [&_em]:text-pass-strong"
      >
        I <em>shop</em>.
      </SerifTitle>
      <p className="mt-3 max-w-sm text-muted-foreground">
        Everything you&apos;re owed, and the best place to use it today.
      </p>

      {/* Try it: a stamp card to fill. */}
      <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Loaf &amp; Co · pastry card</p>
          <span
            className={cn(
              "rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[10px] uppercase",
              done ? "bg-sun" : "bg-pass-soft",
            )}
          >
            {done ? "Complete" : left === 1 ? "1 more!" : `${left} to go`}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div
              key="reward"
              initial={{ scale: 0.7, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: -1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 14 }}
              className="relative mt-3 flex items-center justify-between rounded-xl border-2 border-ink bg-sun p-3"
            >
              <Sparkle className="absolute -top-3 -left-2 size-6" fill="#fff" />
              <div>
                <p className="font-serif text-2xl leading-none">
                  Free croissant
                </p>
                <p className="text-xs">Yours. Next card already started.</p>
              </div>
              <button
                type="button"
                onClick={() => setStamps(1)}
                className="relative cursor-pointer rounded-full border-2 border-ink bg-white px-3 py-1 text-xs"
              >
                Claim
                <TapHint />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 grid grid-cols-8 gap-2"
            >
              {Array.from({ length: STAMP_TOTAL }, (_, i) => {
                const filled = i < stamps;
                const next = i === stamps;
                return (
                  <motion.button
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed slots
                    key={i}
                    type="button"
                    disabled={!next}
                    onClick={() => setStamps((s) => s + 1)}
                    aria-label={next ? "Add a stamp" : undefined}
                    whileTap={next ? { scale: 0.85 } : undefined}
                    animate={filled ? { scale: [1.4, 1] } : { scale: 1 }}
                    className={cn(
                      "relative flex aspect-square items-center justify-center rounded-full border-2",
                      filled && "border-ink bg-pass",
                      next &&
                        "cursor-pointer border-dashed border-ink bg-white hover:bg-pass-soft",
                      !filled && !next && "border-ink/20",
                    )}
                  >
                    {filled && <Croissant className="size-3.5" />}
                    {next && <TapHint label="Tap" />}
                    {next && (
                      <motion.span
                        className="size-1.5 rounded-full bg-pass"
                        animate={{ scale: [1, 1.8, 1] }}
                        transition={{
                          duration: 1.4,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        {!done && (
          <p className="mt-3 text-xs text-muted-foreground">
            Tap the next circle. That&apos;s a visit.
          </p>
        )}
      </div>

      <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
        {[
          "One total across every brand",
          "Closest rewards shown first",
          "Birthday treats in one place",
          "See what you saved, not what you spent",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-pass" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <PillButton
          accent="var(--pass)"
          icon={<ArrowRight />}
          onClick={() => join("consumer")}
        >
          Get early access
        </PillButton>
      </div>
    </div>
  );
}

const GOALS = [
  {
    key: "back",
    label: "Bring them back",
    ideas: [
      "Stamp card: collect 8 stamps, get a free coffee",
      "Welcome back: 15% off if they return within 14 days",
      "Visit reward: every 5th visit earns a treat",
    ],
  },
  {
    key: "slow",
    label: "Fill slow hours",
    ideas: [
      "Happy hour: 20% off from 3 to 5 pm on weekdays",
      "Sunday special: 10% off every Sunday",
      "Special period: a week-long Avurudu offer",
    ],
  },
  {
    key: "spend",
    label: "Grow the bill",
    ideas: [
      "Spend & get: spend LKR 5,000, get a LKR 500 voucher",
      "Points: 1 point for every LKR 100",
      "Milestone: a gift when they reach LKR 50,000",
    ],
  },
  {
    key: "new",
    label: "Win new customers",
    ideas: [
      "First purchase: 20% off the first bill",
      "Show up in Explore for people nearby who haven't tried you yet",
    ],
  },
  {
    key: "special",
    label: "Make them feel special",
    ideas: [
      "Birthday: 15% off in their birthday week",
      "Anniversary: a free dessert a year after their first visit",
    ],
  },
] as const;

function BrandDoor() {
  const join = useJoin();
  const [goal, setGoal] = useState<(typeof GOALS)[number]["key"]>("back");
  const [picked, setPicked] = useState(false);
  const active = GOALS.find((g) => g.key === goal) ?? GOALS[0];

  return (
    <div
      id="for-brands"
      className="sticker flex scroll-mt-24 flex-col rounded-3xl bg-cream p-6 md:p-8"
      style={{ boxShadow: "6px 6px 0 0 var(--studio)" }}
    >
      <MonoLabel className="text-studio-strong">
        For people who run a shop
      </MonoLabel>
      <SerifTitle
        as="h3"
        className="mt-3 text-5xl md:text-6xl [&_em]:text-studio-strong"
      >
        I run a <em>business</em>.
      </SerifTitle>
      <p className="mt-3 max-w-sm text-muted-foreground">
        Turn first visits into regulars. No cards to print, no app your
        customers must download first.
      </p>

      {/* Try it: pick a goal, see campaigns in plain words. */}
      <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-4">
        <p className="text-sm font-semibold">What do you want more of?</p>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Your goal"
        >
          {GOALS.map((g) => (
            // biome-ignore lint/a11y/useSemanticElements: a pill-styled radio group
            <button
              key={g.key}
              type="button"
              role="radio"
              aria-checked={goal === g.key}
              onClick={() => {
                setGoal(g.key);
                setPicked(true);
              }}
              className={cn(
                "relative cursor-pointer rounded-full border-2 px-3 py-1 text-xs transition-all",
                goal === g.key
                  ? "border-ink bg-studio shadow-[2px_2px_0_0_var(--ink)]"
                  : "border-ink/20 hover:border-ink",
              )}
            >
              {g.label}
              {!picked && g.key === GOALS[1].key && <TapHint />}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-4 flex min-h-[132px] flex-col gap-2"
          >
            {active.ideas.map((idea) => {
              const [name, rest] = idea.split(": ");
              return (
                <li
                  key={idea}
                  className="rounded-xl bg-studio-soft px-3 py-2 text-sm"
                >
                  <span className="font-semibold">{name}</span>
                  {rest && <span className="text-ink/75">: {rest}</span>}
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
        {[
          "Ready-made campaigns, your numbers",
          "Staff enter a number and the bill",
          "Every visit previewed before confirm",
          "Track how each campaign performs",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-studio" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <PillButton
          accent="var(--studio)"
          icon={<Store />}
          onClick={() => join("brand")}
        >
          Partner with Gratitude
        </PillButton>
      </div>
    </div>
  );
}
