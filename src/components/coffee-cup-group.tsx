"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const SPAWN_DELAYS_MS = [500, 400, 500, 600];
const DURATION_S = 0.7;

const spawnCups = [
  {
    alt: "Iced coffee back right",
    className: "absolute w-200 -top-25 translate-x-[50%]",
    featured: false,
  },
  {
    alt: "Iced coffee front left",
    className: "absolute w-200 top-35 -translate-x-[40%] z-20",
    featured: false,
  },
  {
    alt: "Iced coffee back left",
    className: "absolute w-200 -top-25 -translate-x-[50%]",
    featured: false,
  },
  {
    alt: "Iced coffee front right",
    className: "absolute w-200 top-35 translate-x-[40%] z-20",
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

function FeaturedFrontRightCup() {
  return (
    <div className="relative h-auto w-200">
      <div className="relative overflow-hidden">
        <Image
          src="/iced-coffee.png"
          alt="Iced coffee front right"
          width={600}
          height={600}
          className="h-auto w-200 saturate-120"
        />
      </div>
      <div className="absolute top-[35%] left-1/2 z-30 -translate-x-1/2 -rotate-10">
        <span className="bg-violet-300 px-6 py-4 text-2xl font-bodoni-moda font-bold tracking-wide text-black uppercase">
          free
        </span>
      </div>
    </div>
  );
}

export default function CoffeeCupGroup() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/3 justify-center"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <div className="relative w-fit">
        <Image
          src="/iced-coffee.png"
          alt="Iced coffee center"
          width={600}
          height={600}
          className="relative z-10 block h-auto w-200"
        />
        {spawnCups.map((cup, index) => (
          <motion.div
            key={cup.alt}
            className={cup.className}
            variants={cupVariants}
            custom={spawnDelays[index]! / 1000}
          >
            {cup.featured ? (
              <FeaturedFrontRightCup />
            ) : (
              <Image
                src="/iced-coffee.png"
                alt={cup.alt}
                width={600}
                height={600}
                className="h-auto w-200"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
