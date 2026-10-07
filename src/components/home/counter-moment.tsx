"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Check, Phone, Pointer, RotateCcw, Store } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  MonoLabel,
  PillButton,
  SerifTitle,
  TapHint,
  useTrySection,
} from "./kit";
import { PassPhone } from "./phone";

const CARD_SIZE = 8;
const BILLS = [850, 1200, 2400];
/** Brew Lab's example campaigns: 1 point per LKR 100, one stamp per visit. */
const pointsFor = (bill: number) => Math.floor(bill / 100);

type Step = "idle" | "found" | "billed" | "done";

const STEPS: { key: Step; label: string }[] = [
  { key: "idle", label: "Give your number" },
  { key: "found", label: "Shop enters the bill" },
  { key: "billed", label: "Confirm" },
];

/** What to do next, in words, for whoever is only skimming. */
const PROMPTS: Record<Step, ReactNode> = {
  idle: (
    <>
      Your turn: tap <strong>Give my number</strong> on the phone
    </>
  ),
  found: (
    <>
      Now be the shop: <strong>pick a bill</strong>
    </>
  ),
  billed: (
    <>
      Tap <strong>Confirm visit</strong> and watch the phone
    </>
  ),
  done: (
    <>
      That&apos;s it. Tap <strong>Next visit</strong> to go again
    </>
  ),
};

const lkr = (n: number) => `LKR ${n.toLocaleString("en-US")}`;

/**
 * The counter moment from both sides: the customer's Pass and the shop's
 * Studio screen. One visit, both sides win.
 */
export default function CounterMoment() {
  const trySection = useTrySection<HTMLElement>();
  const [step, setStep] = useState<Step>("idle");
  const [stamps, setStamps] = useState(6);
  const [points, setPoints] = useState(140);
  const [bill, setBill] = useState<number | null>(null);
  const [earned, setEarned] = useState<{
    points: number;
    reward: boolean;
  } | null>(null);

  const completes = stamps + 1 >= CARD_SIZE;

  function confirm() {
    if (bill === null) return;
    const gained = pointsFor(bill);
    setPoints((p) => p + gained);
    setStamps((s) => (s + 1 >= CARD_SIZE ? 0 : s + 1));
    setEarned({ points: gained, reward: completes });
    setStep("done");
  }

  function nextVisit() {
    setBill(null);
    setEarned(null);
    setStep("idle");
  }

  function reset() {
    nextVisit();
    setStamps(6);
    setPoints(140);
  }

  const activeIndex =
    step === "done" ? 3 : STEPS.findIndex((s) => s.key === step);

  return (
    <section
      {...trySection.props}
      id="how-it-works"
      className="group/try relative scroll-mt-20 border-y-2 border-ink bg-pass-wash px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <MonoLabel>Try it · one visit, both sides</MonoLabel>
          <SerifTitle className="mt-3 text-4xl md:text-6xl [&_em]:text-pass-strong">
            Same moment. <em>Both</em> sides win.
          </SerifTitle>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            This is the whole of Gratitude. You&apos;re at Brew Lab, a café.
            Play both parts: the customer on the left, the shop on the right.
          </p>
        </div>

        {/* Progress */}
        <ol className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 md:gap-3">
          {STEPS.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2 md:gap-3">
              <span
                className={cn(
                  "flex items-center gap-2 rounded-full border-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors md:text-[11px]",
                  i < activeIndex
                    ? "border-ink bg-ink text-white"
                    : i === activeIndex
                      ? "border-ink bg-white"
                      : "border-ink/20 text-muted-foreground",
                )}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </span>
              {i < STEPS.length - 1 && (
                <span className="h-0.5 w-4 bg-ink/20 md:w-8" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-6">
          {/* The customer */}
          <div className="flex flex-col items-center gap-4">
            <MonoLabel className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-pass" /> The customer
            </MonoLabel>
            <PassPhone className="h-[520px]">
              <CustomerScreen
                step={step}
                stamps={stamps}
                points={points}
                earned={earned}
                onGiveNumber={() => setStep("found")}
              />
            </PassPhone>
          </div>

          {/* The shop */}
          <div className="flex flex-col items-center gap-4">
            <MonoLabel className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-studio" /> The shop
            </MonoLabel>
            <div className="sticker w-full max-w-md rounded-3xl bg-white">
              <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg border-2 border-ink bg-studio">
                    <Store className="size-3.5" />
                  </span>
                  <p className="text-sm font-semibold">Brew Lab · Counter</p>
                </div>
                <MonoLabel className="text-[10px]">Gratitude Studio</MonoLabel>
              </div>
              <div className="min-h-[340px] p-5">
                <ShopScreen
                  step={step}
                  stamps={stamps}
                  points={points}
                  bill={bill}
                  earned={earned}
                  completes={completes}
                  onBill={(b) => {
                    setBill(b);
                    setStep("billed");
                  }}
                  onConfirm={confirm}
                  onNextVisit={nextVisit}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-ink"
            >
              <RotateCcw className="size-3" /> Start over
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          An example. Each brand chooses its own campaigns, and the numbers are
          theirs.
        </p>
      </div>

      <StepToast show={trySection.inView} step={step} />
    </section>
  );
}

/**
 * The next instruction, pinned to the bottom of the screen like a toast. It
 * rises in when the section arrives and stays until you scroll away.
 */
function StepToast({ show, step }: { show: boolean; step: Step }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="flex max-w-full items-center gap-2.5 overflow-hidden rounded-2xl border-2 border-ink bg-white py-2.5 pr-4 pl-3 text-sm shadow-[3px_3px_0_0_var(--pass)]"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-pass-soft">
              <Pointer className="size-3.5" />
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="text-pretty [&_strong]:font-semibold [&_strong]:text-pass-strong"
              >
                {PROMPTS[step]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CustomerScreen({
  step,
  stamps,
  points,
  earned,
  onGiveNumber,
}: {
  step: Step;
  stamps: number;
  points: number;
  earned: { points: number; reward: boolean } | null;
  onGiveNumber: () => void;
}) {
  const toGo = CARD_SIZE - stamps;

  return (
    <div className="flex h-full flex-col px-1.5 pt-4">
      <p className="text-[10px] text-muted-foreground">Brew Lab</p>

      <div className="mt-2 min-h-[150px]">
        <AnimatePresence mode="wait" initial={false}>
          {step === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col"
            >
              <p className="font-serif text-2xl leading-none [&_em]:text-pass-strong">
                Just say your <em>number</em>.
              </p>
              <p className="mt-4 font-mono text-base tracking-wider">
                077 ••• 4567
              </p>
              <motion.button
                type="button"
                onClick={onGiveNumber}
                whileTap={{ scale: 0.96 }}
                className="relative mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-medium text-white"
              >
                <Phone className="size-3.5" /> Give my number
                <TapHint
                  label="Tap"
                  className="[&>span:last-child]:-translate-x-10"
                />
              </motion.button>
            </motion.div>
          )}

          {(step === "found" || step === "billed") && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-3"
            >
              <p className="font-serif text-2xl leading-none [&_em]:text-pass-strong">
                Brew Lab has <em>you</em>.
              </p>
              <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <motion.span
                  className="size-1.5 rounded-full bg-pass"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                Waiting for the shop
              </p>
            </motion.div>
          )}

          {step === "done" && earned && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-2"
            >
              {earned.reward ? (
                <>
                  <p className="font-serif text-2xl leading-none [&_em]:text-pass-strong">
                    A free coffee is <em>yours</em>.
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Use it within 14 days
                  </p>
                </>
              ) : (
                <p className="font-serif text-2xl leading-none [&_em]:text-pass-strong">
                  <em>+{earned.points}</em> points, and a stamp.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* What they hold at Brew Lab: always visible, so changes land here. */}
      <div className="mt-auto mb-2 divide-y divide-ink/10 border-ink/10 border-y">
        <div className="py-3">
          <div className="flex gap-1.5">
            {Array.from({ length: CARD_SIZE }, (_, i) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed slots
                key={i}
                initial={false}
                animate={
                  i < stamps
                    ? { scale: [1.6, 1], backgroundColor: "#8b5cf6" }
                    : { scale: 1, backgroundColor: "rgba(0,0,0,0)" }
                }
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className={cn(
                  "size-2.5 rounded-full border",
                  i < stamps ? "border-pass" : "border-ink/20",
                )}
              />
            ))}
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            {stamps === 0 && step === "done"
              ? "New card started"
              : `${toGo} more ${toGo === 1 ? "visit" : "visits"} for a free coffee`}
          </p>
        </div>
        <div className="flex items-baseline justify-between py-3">
          <p className="text-[10px] text-muted-foreground">Points</p>
          <RollingNumber
            value={points}
            className="font-serif text-2xl leading-none"
          />
        </div>
      </div>
    </div>
  );
}

function ShopScreen({
  step,
  stamps,
  points,
  bill,
  earned,
  completes,
  onBill,
  onConfirm,
  onNextVisit,
}: {
  step: Step;
  stamps: number;
  points: number;
  bill: number | null;
  earned: { points: number; reward: boolean } | null;
  completes: boolean;
  onBill: (bill: number) => void;
  onConfirm: () => void;
  onNextVisit: () => void;
}) {
  if (step === "idle") {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-full border-2 border-dashed border-ink/30">
          <Phone className="size-5 text-muted-foreground" />
        </span>
        <p className="font-serif text-2xl">Waiting for a customer</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Tap <span className="font-semibold text-ink">Give my number</span> on
          the phone to start the visit.
        </p>
      </div>
    );
  }

  if (step === "done" && earned) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full border-2 border-ink bg-mint">
          <Check className="size-5" />
        </span>
        <p className="font-serif text-2xl">Visit saved in seconds</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          {earned.reward
            ? "Mike's card is complete. A free coffee now waits in the Pass, and that's a reason to come back."
            : `Mike got +${earned.points} points and a stamp: ${CARD_SIZE - stamps} ${CARD_SIZE - stamps === 1 ? "visit" : "visits"} from a free coffee.`}
        </p>
        <PillButton
          accent="var(--studio)"
          icon={<Store />}
          onClick={onNextVisit}
          className="relative mt-2"
        >
          Next visit
          <TapHint />
        </PillButton>
      </motion.div>
    );
  }

  const gained = bill === null ? 0 : pointsFor(bill);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between rounded-2xl border-2 border-ink bg-studio-soft px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Mike P.</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            077 ••• 4567 · regular
          </p>
        </div>
        <p className="text-right font-mono text-[10px] uppercase tracking-wider">
          {stamps}/{CARD_SIZE} stamps
          <br />
          {points} pts
        </p>
      </div>

      <div>
        <MonoLabel>Bill amount</MonoLabel>
        <div className="relative mt-2 grid grid-cols-3 gap-2 rounded-xl">
          {step === "found" && <TapHint />}
          {BILLS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onBill(b)}
              className={cn(
                "cursor-pointer rounded-xl border-2 py-2.5 font-mono text-xs transition-all",
                bill === b
                  ? "border-ink bg-studio shadow-[3px_3px_0_0_var(--ink)]"
                  : "border-ink/20 hover:border-ink",
              )}
            >
              {lkr(b)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <MonoLabel>What happens</MonoLabel>
        {bill === null ? (
          <p className="text-sm text-muted-foreground">
            Pick a bill to preview it.
          </p>
        ) : (
          <motion.ul
            key={bill}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-1.5 text-sm"
          >
            <PreviewLine label="Coffee card" value="+1 stamp" />
            <PreviewLine label="Points · 1 per LKR 100" value={`+${gained}`} />
            {completes && (
              <PreviewLine label="Card complete" value="Free coffee" strong />
            )}
          </motion.ul>
        )}
      </div>

      <PillButton
        accent="var(--studio)"
        icon={<Check />}
        onClick={onConfirm}
        disabled={step !== "billed"}
        className="relative mt-1 w-full"
      >
        Confirm visit
        {step === "billed" && <TapHint />}
      </PillButton>
    </motion.div>
  );
}

function PreviewLine({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2",
        strong ? "border-2 border-ink bg-sun" : "bg-muted",
      )}
    >
      <span>{label}</span>
      <span className="font-mono text-xs font-bold">{value}</span>
    </li>
  );
}

/** A number that rolls to its new value. */
function RollingNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, value]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
