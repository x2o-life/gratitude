"use client";

import { useStepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SEPARATOR_COLORS = ["bg-orange-300", "bg-violet-300"] as const;

export const STEP_SEPARATOR_FILL_MS = 750;

type AnimatedStepSeparatorProps = {
  segmentIndex: number;
};

export function AnimatedStepSeparator({ segmentIndex }: AnimatedStepSeparatorProps) {
  const { activeStep } = useStepper();
  const color = SEPARATOR_COLORS[segmentIndex] ?? SEPARATOR_COLORS[1];
  const filled = activeStep > segmentIndex + 1;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      // Mobile (vertical): thin 1.5px-wide bar, h-24 (6rem) to cover gap-24 between items
      // Desktop (horizontal): thin 1.5px-tall bar, width spans between indicators
      className="pointer-events-none absolute top-[calc(100%+0.5rem)] md:top-1/2 left-[calc(50%+0.75rem)] md:left-[calc(50%+1.25rem+0.5rem)] z-0 m-0 h-24 md:h-1.5 w-1.5 md:w-[calc(100%-2.5rem-1rem)] md:-translate-y-1/2 overflow-hidden rounded-full bg-muted"
      aria-hidden
    >
      {isMobile ? (
        // Vertical fill: animate height top-to-bottom
        <motion.div
          className={cn("w-full rounded-full", color)}
          initial={false}
          animate={{ height: filled ? "100%" : "0%" }}
          transition={{
            duration: STEP_SEPARATOR_FILL_MS / 1000,
            ease: [0.32, 0.72, 0, 1],
          }}
        />
      ) : (
        // Horizontal fill: animate width left-to-right
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={false}
          animate={{ width: filled ? "100%" : "0%" }}
          transition={{
            duration: STEP_SEPARATOR_FILL_MS / 1000,
            ease: [0.32, 0.72, 0, 1],
          }}
        />
      )}
    </div>
  );
}
