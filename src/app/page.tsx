"use client";

import AnimatedColumns from "@/components/animated-columns";
import CoffeeCupGroup from "@/components/coffee-cup-group";
import WaitlistSection from "@/components/waitlist-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  selectIsWaitlistOpen,
  useWaitlistStore,
} from "@/stores/waitlist-store";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MD_BREAKPOINT_PX = 768;
const panelTransition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

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

export default function HomePage() {
  const openWaitlist = useWaitlistStore((store) => store.open);
  const isWaitlistOpen = useWaitlistStore(selectIsWaitlistOpen);
  const isBelowMd = useIsBelowMd();

  const heroHeight = isWaitlistOpen
    ? isBelowMd
      ? "90%"
      : "75%"
    : "100%";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="relative flex w-full items-center justify-center overflow-hidden bg-[linear-gradient(90deg,rgba(88,28,135,0.08)_1px,transparent_1px),linear-gradient(to_bottom,#fff,#f7f7f7)] bg-size-[2px_100%,100%_100%]"
        animate={{ height: heroHeight }}
        transition={panelTransition}
      >
        <AnimatedColumns />
        <CoffeeCupGroup />

        <div className="relative z-10 max-w-2xl md:translate-y-[-160%] -translate-y-full px-12 md:px-6 flex flex-col items-center">
          <p className="text-5xl font-medium font-bodoni-moda">Gratitude</p>
          <p className="mt-2 text-center font-light text-gray-500">
            build loyalty that feel rewarding, modern and easy to use - giving your customers one seamless place to stay connected with the brands they love.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              className="w-fit cursor-pointer bg-violet-300 text-black hover:bg-gray-900 hover:text-white"
              onClick={() => openWaitlist("brand")}
            >
              <span className="inline-flex items-center gap-1.5 group-hover/button:hidden">
                You&apos;re a brand?
              </span>
              <span className="hidden items-center gap-1.5 group-hover/button:inline-flex">
                Partner with Gratitude
                <ArrowRightIcon className="size-4 shrink-0" />
              </span>
            </Button>
            <Button 
              className="w-fit cursor-pointer bg-orange-300 text-black hover:bg-gray-900 hover:text-white" 
              onClick={() => openWaitlist("consumer")}
            >
              <span className="inline-flex items-center gap-1.5 group-hover/button:hidden">
                You&apos;re a consumer?
              </span>
              <span className="hidden items-center gap-1.5 group-hover/button:inline-flex">
                Get early access
                <ArrowRightIcon className="size-4 shrink-0" />
              </span>
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.section
        aria-hidden={!isWaitlistOpen}
        className="absolute inset-x-0 bottom-0 z-20 flex h-9/10 md:h-1/2 min-h-0 flex-col overflow-hidden bg-white px-6 py-5 rounded-t-xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        initial={false}
        animate={{ y: isWaitlistOpen ? "0%" : "100%" }}
        transition={panelTransition}
      >
        <WaitlistSection />
      </motion.section>
    </div>
  );
}
