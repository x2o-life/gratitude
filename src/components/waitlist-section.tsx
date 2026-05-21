"use client";

import WaitlistForm from "@/components/waitlist-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  selectIsWaitlistOpen,
  selectWaitlistAudience,
  useWaitlistStore,
} from "@/stores/waitlist-store";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import type { WaitlistAudience } from "@/stores/waitlist-store";

const audienceContent: Record<
  WaitlistAudience,
  { heading: string; lead: string; benefits: string[] }
> = {
  brand: {
    heading: "For brands",
    lead: "Gratitude gives your business a modern home for loyalty—built to launch fast and feel great for your customers.",
    benefits: [
      "Create and customize loyalty programs without wrestling with complicated setup.",
      "Launch rewards, tiers, and offers when you are ready—not months from now.",
      "Stay connected with the people who love your brand through one seamless experience.",
    ],
  },
  consumer: {
    heading: "For consumers",
    lead: "Gratitude brings the rewards you have earned across brands into a single place you can actually use.",
    benefits: [
      "Keep every loyalty balance, stamp, and perk together instead of scattered across apps and emails.",
      "Manage your points and progress in one view that is simple to follow.",
      "See everything in one place—what you have, what is expiring, and where to use it next.",
    ],
  },
};

export default function WaitlistSection() {
  const close = useWaitlistStore((store) => store.close);
  const setAudience = useWaitlistStore((store) => store.setAudience);
  const isOpen = useWaitlistStore(selectIsWaitlistOpen);
  const audience = useWaitlistStore(selectWaitlistAudience);
  const activeAudience = isOpen ? (audience ?? "brand") : audience;

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute top-0 right-0 z-10 shrink-0"
        onClick={close}
        aria-label="Close waitlist"
      >
        <XIcon className="size-4" />
      </Button>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain md:overflow-visible">
        <div className="flex w-full flex-col gap-8 pt-10 md:w-[90%] md:flex-row md:items-start md:justify-between md:gap-4 md:pt-0">
        <div className="flex w-full flex-col md:w-1/3 md:pr-30">
          <div className="flex items-center gap-2">
            <Badge
              role="button"
              tabIndex={0}
              variant={activeAudience === "brand" ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-sm font-light p-3",
                activeAudience === "brand" ? "bg-violet-300 text-black" : "border-violet-300 text-black",
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
              variant={activeAudience === "consumer" ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-sm font-light p-3",
                activeAudience === "consumer" ? "bg-orange-300 text-black" : "border-orange-300 text-black",
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
          {activeAudience && (
            <>
              <h3 className="mt-4 font-bodoni-moda text-2xl font-medium">
                {audienceContent[activeAudience].heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {audienceContent[activeAudience].lead}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
                {audienceContent[activeAudience].benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="w-full pb-4 md:flex-1 md:pb-0">
          <WaitlistForm />
        </div>
        </div>
      </div>
    </div>
  );
}
