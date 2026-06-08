"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const MD_BREAKPOINT_PX = 768;
const SPAWN_DELAYS_MS = [500, 400, 500, 600];
const DURATION_S = 0.7;
const HOLD_MS = 1500;
const CUP_COUNT = 4;

const spawnCups = [
  {
    alt: "Iced coffee back right",
    className: "absolute md:w-200 -top-25 translate-x-[50%]",
    featured: false,
  },
  {
    alt: "Iced coffee front left",
    className: "absolute md:w-200 top-35 -translate-x-[40%] z-20",
    featured: false,
  },
  {
    alt: "Iced coffee back left",
    className: "absolute md:w-200 -top-25 -translate-x-[50%]",
    featured: false,
  },
  {
    alt: "Iced coffee front right",
    className: "absolute md:w-200 top-35 translate-x-[40%] z-20",
    featured: true,
  },
] as const;

const spawnDelays = SPAWN_DELAYS_MS.reduce<number[]>(
  (acc, ms, index) => {
    acc.push((acc[index - 1] ?? 0) + ms);
    return acc;
  },
  [],
);

const cupVariants: Variants = {
  rest: {
    opacity: 0,
    transition: { duration: DURATION_S },
  },
  hover: (delay: number) => ({
    opacity: 1,
    transition: { duration: DURATION_S, delay },
  }),
};

function useIsBelowMd() {
  const [isBelowMd, setIsBelowMd] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MD_BREAKPOINT_PX - 1}px)`);

    const update = () => setIsBelowMd(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isBelowMd;
}

function useCupLoopAnimation(enabled: boolean) {
  const [opacities, setOpacities] = useState<number[]>(
    () => Array.from({ length: CUP_COUNT }, () => 0),
  );

  useEffect(() => {
    if (!enabled) {
      setOpacities(Array.from({ length: CUP_COUNT }, () => 0));
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const runLoop = async () => {
      while (!cancelled) {
        setOpacities(Array.from({ length: CUP_COUNT }, () => 0));

        for (let i = 0; i < CUP_COUNT; i++) {
          await sleep(SPAWN_DELAYS_MS[i]!);
          if (cancelled) return;
          setOpacities((prev) => {
            const next = [...prev];
            next[i] = 1;
            return next;
          });
        }

        await sleep(DURATION_S * 1000 + HOLD_MS);
        if (cancelled) return;

        for (let i = 0; i < CUP_COUNT; i++) {
          await sleep(SPAWN_DELAYS_MS[i]!);
          if (cancelled) return;
          setOpacities((prev) => {
            const next = [...prev];
            next[i] = 0;
            return next;
          });
        }

        await sleep(DURATION_S * 1000);
      }
    };

    runLoop();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return opacities;
}

function FeaturedFrontRightCup() {
  return (
    <div className="relative h-auto md:w-200">
      <div className="relative overflow-hidden">
        <Image
          src="/iced-coffee.png"
          alt="Iced coffee front right"
          width={600}
          height={600}
          className="h-auto md:w-200 saturate-120"
        />
      </div>
      <div className="absolute md:top-[35%] top-20 left-1/2 z-30 translate-x-[-75%] md:-translate-x-1/2 -rotate-10 px-6 py-4 bg-violet-300 text-center">
        <span className="text-lg md:text-2xl font-bodoni-moda font-bold tracking-wide text-black uppercase">
          5th Coffee is on us
        </span>
      </div>
    </div>
  );
}

export default function CoffeeCupGroup() {
  const isBelowMd = useIsBelowMd();
  const loopOpacities = useCupLoopAnimation(isBelowMd);

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/4 md:translate-y-1/3 justify-center"
      initial="rest"
      animate="rest"
      whileHover={isBelowMd ? undefined : "hover"}
    >
      <div className="relative w-fit">
        <Image
          src="/iced-coffee.png"
          alt="Iced coffee center"
          width={600}
          height={600}
          className="relative z-10 block h-auto md:w-200 w-400"
        />
        {spawnCups.map((cup, index) => (
          <motion.div
            key={cup.alt}
            className={cup.className}
            variants={isBelowMd ? undefined : cupVariants}
            custom={isBelowMd ? undefined : spawnDelays[index]! / 1000}
            animate={
              isBelowMd ? { opacity: loopOpacities[index] ?? 0 } : undefined
            }
            transition={{ duration: DURATION_S }}
          >
            {cup.featured ? (
              <FeaturedFrontRightCup />
            ) : (
              <Image
                src="/iced-coffee.png"
                alt={cup.alt}
                width={600}
                height={600}
                className="h-auto md:w-200 w-400"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
