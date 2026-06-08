'use client'

import { cn } from "@/lib/utils";

export default function Topbar() {
  const handleClick = () => {
    document
      .getElementById("waiting-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 z-50 bg-linear-to-b from-neutral-200/50 to-transparent backdrop-blur-sm flex w-full items-center justify-between p-4">
      <p className="font-bodoni-moda md:text-xl font-medium">Gratitude</p>
      <button
        type="button"
        className={cn("cursor-pointer font-bodoni-moda md:text-xl font-medium transition-opacity hover:opacity-70")}
        onClick={handleClick}
      >
        / waiting-list
      </button>
    </div>
  );
}
