"use client";

import { useStepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SEPARATOR_COLORS = ["bg-orange-300", "bg-violet-300"] as const;

export const STEP_SEPARATOR_FILL_MS = 750;

const separatorFillTransition = {
  duration: STEP_SEPARATOR_FILL_MS / 1000,
  ease: [0.32, 0.72, 0, 1] as const,
};

type AnimatedStepSeparatorProps = {
  segmentIndex: number;
};

export function AnimatedStepSeparator({ segmentIndex }: AnimatedStepSeparatorProps) {
  const { activeStep } = useStepper();
  const color = SEPARATOR_COLORS[segmentIndex] ?? SEPARATOR_COLORS[1];
  const filled = activeStep > segmentIndex + 1;

  return (
    <div
      className="pointer-events-none absolute top-[calc(100%+0.5rem)] md:top-1/2 left-[calc(50%+0.75rem)] md:left-[calc(50%+1.25rem+0.5rem)] z-0 m-0 h-24 md:h-1.5 w-1.5 md:w-[calc(100%-2.5rem-1rem)] md:-translate-y-1/2 overflow-hidden rounded-full bg-muted"
      aria-hidden
    >
      {/* Mobile: vertical fill (scaleY avoids broken % height animation) */}
      <motion.div
        className={cn("h-full w-full origin-top rounded-full md:hidden", color)}
        initial={false}
        animate={{ scaleY: filled ? 1 : 0 }}
        transition={separatorFillTransition}
      />
      {/* Desktop: horizontal fill */}
      <motion.div
        className={cn("hidden h-full w-full origin-left rounded-full md:block", color)}
        initial={false}
        animate={{ scaleX: filled ? 1 : 0 }}
        transition={separatorFillTransition}
      />
    </div>
  );
}
