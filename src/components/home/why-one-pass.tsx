"use client";

import { motion } from "framer-motion";
import { Gift, Phone, Repeat } from "lucide-react";
import { MonoLabel, SerifTitle } from "./kit";

const STEPS = [
  {
    icon: Phone,
    title: "Give your number",
    body: "At any Gratitude shop. No card, no app to open, nothing to sign up for at the counter.",
    fill: "bg-pass",
  },
  {
    icon: Repeat,
    title: "Earn every visit",
    body: "Stamps, points and treats land in your Pass automatically, brand by brand.",
    fill: "bg-sun",
  },
  {
    icon: Gift,
    title: "Use what's yours",
    body: "See everything you're owed in one place, closest rewards first. Nothing gets forgotten.",
    fill: "bg-mint",
  },
];

/** Three steps, then the reasons one Pass matters. */
export default function WhyOnePass() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, type: "spring", damping: 20 }}
              className="sticker rounded-3xl bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex size-11 items-center justify-center rounded-xl border-2 border-ink ${step.fill}`}
                >
                  <step.icon className="size-5" />
                </span>
                <span className="font-serif text-5xl leading-none text-ink/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-6 font-serif text-3xl leading-none">
                {step.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </motion.div>
          ))}
        </div>

        {/* The honest hook: people already hold more than they use. */}
        <div className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-[1.1fr_1fr]">
          <div>
            <MonoLabel>Why one Pass matters</MonoLabel>
            <SerifTitle className="mt-3 text-5xl md:text-7xl [&_em]:text-pass-strong">
              20 memberships.
              <br />
              Only <em>11</em> in use.
            </SerifTitle>
            <p className="mt-5 max-w-md text-pretty text-muted-foreground">
              The average person holds about 20 loyalty memberships and actively
              uses about 11. The rest sit in drawers, old apps and forgotten
              inboxes. Gratitude remembers them for you.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Source: Bond Brand Loyalty / Statista, 2025
            </p>
          </div>

          <MembershipGrid />
        </div>

        {/* And what's held still slips away: rewards earned, never used. */}
        <div className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-[1fr_1.1fr]">
          <div className="md:order-2">
            <SerifTitle className="text-5xl md:text-7xl [&_em]:text-pass-strong">
              1 in 3 rewards
              <br />
              never get <em>used</em>.
            </SerifTitle>
            <p className="mt-5 max-w-md text-pretty text-muted-foreground">
              A household in loyalty programs earns about $622 in rewards a year
              and lets $205 of it go unredeemed: free coffees never claimed,
              points left to expire. Your Pass puts what you&apos;re owed in
              front of you, before it&apos;s gone.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Source: COLLOQUY, U.S. Consumer Loyalty Points Value
            </p>
          </div>

          <UnusedRewards />
        </div>
      </div>
    </section>
  );
}

/** A year of rewards as one bar: two-thirds used, a third left behind. */
function UnusedRewards() {
  return (
    <div className="sticker rounded-3xl bg-white p-6 md:order-1">
      <MonoLabel>One household · one year</MonoLabel>
      <p className="mt-2 font-serif text-4xl leading-none tabular-nums">
        $622 earned
      </p>

      <div className="mt-6 flex h-14 gap-1.5">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: "67%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", damping: 20 }}
          className="rounded-lg border-2 border-ink bg-pass-soft"
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.4 }}
          className="flex-1 rounded-lg border-2 border-dashed border-ink/25"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-xs">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded border-2 border-ink bg-pass-soft" />
          $417 used
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="size-3 rounded border-2 border-dashed border-ink/30" />
          $205 never claimed
        </span>
      </div>
    </div>
  );
}

/** 20 tiles: 11 lit, 9 dimmed — then all of them light up in one Pass. */
function MembershipGrid() {
  return (
    <div className="sticker rounded-3xl bg-white p-6">
      <div className="grid grid-cols-5 gap-2.5">
        {Array.from({ length: 20 }, (_, i) => {
          const used = i < 11;
          return (
            <motion.span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed grid
              key={i}
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.03, type: "spring", damping: 16 }}
              className={
                used
                  ? "aspect-[4/3] rounded-lg border-2 border-ink bg-pass-soft"
                  : "aspect-[4/3] rounded-lg border-2 border-dashed border-ink/25"
              }
            />
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-xs">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded border-2 border-ink bg-pass-soft" />
          In use
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="size-3 rounded border-2 border-dashed border-ink/30" />
          Forgotten
        </span>
      </div>
    </div>
  );
}
