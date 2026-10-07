"use client";

import WaitlistForm from "@/components/waitlist-form";
import { cn } from "@/lib/utils";
import {
  selectWaitlistAudience,
  useWaitlistStore,
  type WaitlistAudience,
} from "@/stores/waitlist-store";
import { DotBackdrop, MonoLabel } from "./kit";

const OPTIONS: { value: WaitlistAudience; label: string; on: string }[] = [
  { value: "consumer", label: "I shop", on: "bg-pass" },
  { value: "brand", label: "I run a business", on: "bg-studio" },
];

export default function Join() {
  const audience = useWaitlistStore(selectWaitlistAudience);
  const setAudience = useWaitlistStore((store) => store.setAudience);

  return (
    <section
      id="waiting-list"
      className="relative scroll-mt-16 overflow-hidden border-t-2 border-ink px-4 py-20 md:py-28"
    >
      <DotBackdrop glow={audience === "brand" ? "#FF8A3D" : "#8B5CF6"} />
      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        <MonoLabel>Opening soon · join the first wave</MonoLabel>

        <div
          role="radiogroup"
          aria-label="I am joining as"
          className="mt-5 flex rounded-full border-2 border-ink bg-white p-1"
        >
          {OPTIONS.map((option) => (
            // biome-ignore lint/a11y/useSemanticElements: a pill-styled radio group
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={audience === option.value}
              onClick={() => setAudience(option.value)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors",
                audience === option.value
                  ? cn(option.on, "text-ink")
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          className="sticker mt-6 w-full rounded-3xl bg-white p-6 transition-shadow md:p-10"
          style={{
            boxShadow: `6px 6px 0 0 ${audience === "brand" ? "var(--studio)" : "var(--pass)"}`,
          }}
        >
          {/* Keyed so switching audience starts a fresh form. */}
          <WaitlistForm key={audience} />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-4 pt-14 pb-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <p className="font-serif text-6xl leading-none tracking-tight md:text-8xl [&_em]:text-lilac">
          Say <em>thanks</em>, often.
        </p>
        <div className="flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row">
          <p>
            Gratitude by <span className="text-white">x2o Life</span> © 2026.
            All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest">
            Made in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
