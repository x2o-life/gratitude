"use client";

import { useStepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SEPARATOR_COLORS = ["bg-orange-300", "bg-violet-300"] as const;

export const STEP_SEPARATOR_FILL_MS = 750;

type AnimatedStepSeparatorProps = {
  segmentIndex: number;
};

export function AnimatedStepSeparator({ segmentIndex }: AnimatedStepSeparatorProps) {
  const { activeStep } = useStepper();
  const color = SEPARATOR_COLORS[segmentIndex] ?? SEPARATOR_COLORS[1];
  const filled = activeStep > segmentIndex + 1;

  return (
    <div
      className="pointer-events-none absolute top-1/2 left-[calc(50%+1.25rem+0.5rem)] z-0 m-0 h-1.5 w-[calc(100%-2.5rem-1rem)] -translate-y-1/2 overflow-hidden rounded-full bg-muted"
      aria-hidden
    >
      <motion.div
        className={cn("h-full rounded-full", color)}
        initial={false}
        animate={{ width: filled ? "100%" : "0%" }}
        transition={{
          duration: STEP_SEPARATOR_FILL_MS / 1000,
          ease: [0.32, 0.72, 0, 1],
        }}
      />
    </div>
  );
}
