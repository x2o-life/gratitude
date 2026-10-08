"use client";

import { ArrowDown, Store } from "lucide-react";
import Image from "next/image";
import { track } from "@/lib/analytics";
import { DotBackdrop, MonoLabel, PillButton, SerifTitle } from "./kit";

/** A quiet opening: the promise, and a door for each audience. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-28"
    >
      <DotBackdrop />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/gratitude-white.svg"
          alt="Gratitude"
          width={338}
          height={349}
          loading="eager"
          className="mb-8 h-16 w-auto md:h-20"
        />
        <SerifTitle
          as="h1"
          className="text-5xl md:text-8xl [&_em]:text-pass-strong"
        >
          Get rewarded at the places you already <em>love</em>.
        </SerifTitle>
        <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
          Just give your number at the counter. Gratitude keeps every stamp,
          point and treat from every brand in one Pass.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PillButton
            accent="var(--pass)"
            icon={<ArrowDown />}
            onClick={() => {
              track("select_audience", {
                audience: "consumer",
                location: "hero",
              });
              document
                .getElementById("for-you")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            I shop
          </PillButton>
          <PillButton
            accent="var(--studio)"
            icon={<Store />}
            onClick={() => {
              track("select_audience", { audience: "brand", location: "hero" });
              document
                .getElementById("for-brands")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            I run a business
          </PillButton>
        </div>
      </div>

      <MonoLabel className="absolute bottom-8 text-[10px]">Scroll</MonoLabel>
    </section>
  );
}
