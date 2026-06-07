"use client";

import { ArrowRightIcon, ChartLine, Proportions, Users } from "lucide-react";
import Image from "next/image";
import AnimatedColumns from "@/components/animated-columns";
import CoffeeCupGroup from "@/components/coffee-cup-group";
import { HowItWorksStepper } from "@/components/how-it-works-stepper";
import RotatingTrustSignals from "@/components/rotating-signals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WaitlistForm from "@/components/waitlist-form";
import { cn } from "@/lib/utils";
import {
  selectWaitlistAudience,
  useWaitlistStore,
} from "@/stores/waitlist-store";
import ModulesBento from "@/components/modules-bento";

const HOW_IT_WORKS = [
  {
    icon: Users,
    title: "Customers join once",
    description: "One place to manage rewards across brands.",
  },
  {
    icon: Proportions,
    title: "Brands launch campaigns",
    description: "Points, tiers, referrals, perks, streaks and more.",
  },
  {
    icon: ChartLine,
    title: "Engagement grows naturally",
    description: "Better retention without fragmented loyalty systems.",
  },
];

const TRUST_SIGNALS = [
  "Built for modern brands",
  "Built for smart consumers",
  "Early access opening soon",
  "Designed for digital-first commerce",
  "Join the first wave",
];

export default function HomePage() {
  const audience = useWaitlistStore(selectWaitlistAudience);
  const setAudience = useWaitlistStore((store) => store.setAudience);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Gateway */}
      <div className="relative flex w-full h-screen items-center justify-center overflow-hidden bg-[linear-gradient(90deg,rgba(88,28,135,0.08)_1px,transparent_1px),linear-gradient(to_bottom,#fff,#f7f7f7)] bg-size-[2px_100%,100%_100%]">
        <AnimatedColumns />
        <CoffeeCupGroup />

        <div className="relative z-10 max-w-2xl md:translate-y-[-160%] -translate-y-full px-12 md:px-6 flex flex-col items-center">
          <p className="text-5xl font-medium font-bodoni-moda">Gratitude</p>
          <p className="mt-2 text-center font-light text-gray-500">
            build loyalty that feel rewarding, modern and easy to use - giving
            your customers one seamless place to stay connected with the brands
            they love.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              type="button"
              className="w-fit cursor-pointer bg-violet-300 text-black hover:bg-gray-900 hover:text-white"
              onClick={() => {
                setAudience("brand");
                document.getElementById("waiting-list")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
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
              type="button"
              className="w-fit cursor-pointer bg-orange-300 text-black hover:bg-gray-900 hover:text-white"
              onClick={() => {
                setAudience("consumer");
                document.getElementById("waiting-list")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
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
      </div>

      {/* Flow */}
      <div className="w-full p-24 px-10 bg-white flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <p className="text-3xl font-medium font-bodoni-moda">How it works</p>
          <p className="mt-4 text-center max-w-6xl font-light text-gray-500">
            Launching a modern, simple, and beautiful loyalty program should be
            easy for businesses and enjoyable for customers. Gratitude makes
            that possible—giving your brand a central place to connect with
            customers and turn loyalty into something they will actually want to
            use.
          </p>

          <div className="mt-20 w-full">
            <HowItWorksStepper steps={HOW_IT_WORKS} />
          </div>
        </div>
      </div>

      {/* Shift (Incomplete) */}
      {/* TODO: Change background */}
      <div className="w-full p-24 flex flex-col items-center bg-gray-50">
        <p className="text-center max-w-4xl text-xl text-gray-700">
          <span className="text-orange-300">Loyalty programs</span> haven’t evolved with modern digital commerce.
          <span className="text-violet-300"> Gratitude</span> brings <span className="text-orange-300">rewards, engagement and retention</span> into one connected
          experience.
        </p>
      </div>

      {/* Duality */}
      <div className="w-full bg-white min-h-2/3 flex">
        <div className="w-1/2 p-12 group relative overflow-hidden">
          <p className="text-5xl font-medium font-bodoni-moda">Consumers</p>
          <p
            className={cn(
              "text text-gray-500",
              "group-hover:text-orange-300 transition-colors duration-400",
            )}
          >
            get connected
          </p>

          <div className="mt-8 flex w-xs flex-wrap gap-2">
            {[
              "Unified Rewards",
              "Easy Redemption",
              "Discover Perks",
              "One Wallet",
            ].map((label) => (
              <Badge
                key={label}
                className={cn(
                  "rounded-sm bg-gray-100 text-black font-normal p-3",
                  "group-hover:bg-transparent group-hover:border group-hover:border-orange-300 transition-colors duration-400",
                )}
              >
                {label}
              </Badge>
            ))}
          </div>

          <div className="absolute -top-40 -right-20">
            <Image
              src="/hangtag-1.png"
              alt="hangtag"
              width="600"
              height="600"
              className="saturate-0 group-hover:saturate-100"
            />
          </div>
        </div>

        <div className="w-px bg-gray-200 my-10" />

        <div className="relative flex-1 flex flex-col items-end justify-end p-12 group overflow-hidden">
          <p
            className={cn(
              "text text-gray-500",
              "group-hover:text-violet-300 transition-colors duration-400",
            )}
          >
            to their favourite
          </p>
          <p className="text-5xl font-medium font-bodoni-moda">Brands</p>

          <div className="mt-8 flex justify-end w-xs flex-wrap gap-2">
            {[
              "Retention",
              "Engagement",
              "Campaigns",
              "Insights",
              "Loyalty",
            ].map((label) => (
              <Badge
                key={label}
                className={cn(
                  "rounded-sm bg-gray-100 text-black font-normal p-3",
                  "group-hover:bg-transparent group-hover:border group-hover:border-violet-300 transition-colors duration-400",
                )}
              >
                {label}
              </Badge>
            ))}
          </div>

          <div className="absolute -bottom-30 -left-5">
            <Image
              src="/tshirt.png"
              alt="hangtag"
              width="550"
              height="550"
              className="saturate-0 group-hover:saturate-100"
            />
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="w-full py-6 px-12 flex justify-center items-center bg-gray-50">
        <div className="w-full p-12 bg-white rounded-lg flex flex-col items-center">
          <p className="text-3xl font-medium font-bodoni-moda">
            Create with Gratitude
          </p>
          
          <ModulesBento />
        </div>
      </div>

      {/* Signals */}
      <div className="w-full min-h-1/3 p-8 bg-white flex flex-col items-center">
        <p className="text-xs text-gray-400 uppercase">Trust Signals</p>
        <RotatingTrustSignals items={TRUST_SIGNALS} />
      </div>

      {/* Waitlist (Incomplete) */}
      <div id="waiting-list" className="w-full p-16 bg-white">
        <div className="flex justify-center items-center gap-2">
          <Badge
            role="button"
            tabIndex={0}
            variant={audience === "brand" ? "default" : "outline"}
            className={cn(
              "cursor-pointer text-sm font-light p-3",
              audience === "brand"
                ? "bg-violet-300 text-black"
                : "border-violet-300 text-black",
            )}
            onClick={() => setAudience("brand")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setAudience("brand");
              }
            }}
          >
            Brand
          </Badge>
          <Badge
            role="button"
            tabIndex={0}
            variant={audience === "consumer" ? "default" : "outline"}
            className={cn(
              "cursor-pointer text-sm font-light p-3",
              audience === "consumer"
                ? "bg-orange-300 text-black"
                : "border-orange-300 text-black",
            )}
            onClick={() => setAudience("consumer")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setAudience("consumer");
              }
            }}
          >
            Consumer
          </Badge>
        </div>
        <div className=" mt-12 w-full px-80">
          <WaitlistForm />
        </div>
      </div>

      {/* Terminal */}
      <div className="w-full py-4 bg-black flex items-center justify-center rounded-t-lg">
        <p className="text-white font-light text-sm">
          Gratitude by <span className="font-bold">x2o Life</span> © 2026. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}
