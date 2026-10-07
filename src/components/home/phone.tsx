import { Compass, Home, User, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A phone running Gratitude Pass, kept white and minimal. Content scrolls
 * inside; an icon-only tab bar is fixed at the bottom.
 */
export function PassPhone({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "sticker relative flex aspect-[9/18] flex-col overflow-hidden rounded-[2.4rem] bg-white p-2 text-ink",
        className,
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] bg-white">
        <div className="mx-auto mt-2 h-5 w-20 shrink-0 rounded-full bg-ink" />
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3.5 pt-3">
          {children}
        </div>
        <TabBar />
      </div>
    </div>
  );
}

function TabBar() {
  const tabs = [
    { icon: Home, label: "Home", active: true },
    { icon: Wallet, label: "Wallet" },
    { icon: Compass, label: "Explore" },
    { icon: User, label: "Me" },
  ];
  return (
    <div className="mx-6 mb-4 flex shrink-0 justify-between">
      {tabs.map(({ icon: Icon, label, active }) => (
        <Icon
          key={label}
          aria-label={label}
          className={cn("size-4", active ? "text-pass-strong" : "text-ink/30")}
          strokeWidth={1.75}
        />
      ))}
    </div>
  );
}
