"use client";

import { ArrowRightIcon, ChartLine, Proportions, Users } from "lucide-react";
import AnimatedColumns from "@/components/animated-columns";
import CoffeeCupGroup from "@/components/coffee-cup-group";
import { Button } from "@/components/ui/button";
import {
  selectWaitlistAudience,
  useWaitlistStore,
} from "@/stores/waitlist-store";

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

export default function HomePage() {
  const _audience = useWaitlistStore(selectWaitlistAudience);
  const _setAudience = useWaitlistStore((store) => store.setAudience);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero section */}
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
            >
              <span className="inline-flex items-center gap-1.5 group-hover/button:hidden">
                You&apos;re a brand?
              </span>
              <span className="hidden items-center gap-1.5 group-hover/button:inline-flex">
                Partner with Gratitude
                <ArrowRightIcon className="size-4 shrink-0" />
              </span>
            </Button>
            <Button className="w-fit cursor-pointer bg-orange-300 text-black hover:bg-gray-900 hover:text-white">
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

      {/* How it works section */}
      <div className="w-full p-16 bg-white flex flex-col items-center">
        {/* <div className="flex items-center gap-2">
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
        </div> */}
        <div className="flex flex-col items-center">
          <p className="text-3xl font-medium font-bodoni-moda">How it works</p>
          <p className="mt-2 text-center max-w-6xl font-light text-gray-500">
            Launching a modern, simple, and beautiful loyalty program should be
            easy for businesses and enjoyable for customers. Gratitude makes
            that possible—giving your brand a central place to connect with
            customers and turn loyalty into something they will actually want to
            use.
          </p>

          <div className="grid grid-cols-3 gap-20 mt-8">
            {/* 
              TODO: Create custom icons for each feature.
              Make it look like a stepper. Add connecting lines.
              Try adding numbers instead of icons.
            */}
            {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => {
              return (
                <div key={title} className="p-6 flex flex-col items-center">
                  <div className="w-12 aspect-square rounded-lg bg-violet-300 flex items-center justify-center">
                    <Icon />
                  </div>
                  <p className="mt-6 text-xl font-medium font-bodoni-moda">
                    {title}
                  </p>
                  <p className="text-sm font-normal text-gray-500">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Built for section */}
      <div className="w-full bg-white min-h-1/2 flex border">
        <div className="w-[55%] p-16 rounded-r-lg shadow-sm bg-[linear-gradient(180deg,rgba(88,28,135,0.08)_1px,transparent_1px),linear-gradient(to_bottom,#fff_10%,#ddd6fe_100%)] bg-size-[100%_2px,100%_100%]">
          <p className="text-3xl font-medium font-bodoni-moda">
            Built for Brands
          </p>
          <ul className="list-disc">
            <li className="text-sm">Launch loyalty campaigns fast</li>
            <li className="text-sm">Understand customer behaviour</li>
            <li className="text-sm">Increase retention and repeat purchases</li>
          </ul>
        </div>
        <div className="flex-1 p-16 bg-[linear-gradient(180deg,rgba(88,28,135,0.08)_1px,transparent_1px),linear-gradient(to_bottom,#fff_10%,#fed7aa_100%)] bg-size-[100%_2px,100%_100%]">
          <p className="text-3xl font-medium font-bodoni-moda">
            Built for Clients
          </p>
          <ul className="list-disc">
            <li className="text-sm">Keep rewards in one place</li>
            <li className="text-sm">Discover perks across brands</li>
            <li className="text-sm">Earn rewards without friction</li>
          </ul>
        </div>
      </div>

      {/* What you can create section */}
      <div className="w-full p-16 bg-white flex flex-col items-center">
        <p className="text-3xl font-medium font-bodoni-moda">Create with Gratitude</p>

        <div className="mt-8 w-5xl grid grid-cols-3 gap-4">
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg">Points & Rewards</div>
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg col-span-2">Tier Memberships</div>
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg col-span-2">Referral Campaign</div>
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg">Digital Perks</div>
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg">Cashback & Credits</div>
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg">Streaks & Challenges</div>
          <div className="border p-4 py-8 flex items-center justify-center rounded-lg">Gift Cards</div>
        </div>
      </div>

      {/* Why now section */}
      <div className="w-full p-16 flex flex-col items-center bg-[linear-gradient(90deg,rgba(88,28,135,0.08)_1px,transparent_1px),linear-gradient(to_bottom,#fff,#f7f7f7)] bg-size-[2px_100%,100%_100%]">
        <p className="text-center max-w-3xl text-xl text-gray-700">Loyalty programs haven’t evolved with modern digital commerce.
          Gratitude brings rewards, engagement and retention into one connected experience.</p>
      </div>

      {/* Social Proof section */}
      <div className="w-full h-56 bg-white">
        <p>Social Proof</p>
      </div>

      {/* Waitlist CTA */}
      <div className="w-full h-56 bg-white">
        <p>Waitlist CTA</p>
      </div>

      {/* Footer */}
      <div className="w-full py-4 bg-black flex items-center justify-center rounded-t-lg">
        <p className="text-white font-light text-sm">
          Gratitude by <span className="font-bold">x2o Life</span> © 2026. All rights reserved.</p>
      </div>
    </div>
  );
}
