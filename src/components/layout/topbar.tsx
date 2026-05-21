"use client";

import { useWaitlistStore } from "@/stores/waitlist-store";

export default function Topbar() {
  const openWaitlist = useWaitlistStore((store) => store.open);

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-transparent p-4">
      <p className="font-bodoni-moda text-xl font-medium">Gratitude</p>
      <button
        type="button"
        className="cursor-pointer font-bodoni-moda text-xl font-medium transition-opacity hover:opacity-70"
        onClick={() => openWaitlist("brand")}
      >
        / waiting-list
      </button>
    </div>
  );
}
