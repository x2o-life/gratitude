"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const BADGES_LIST = [
  { label: "Points & Rewards", border: "border-violet-300" },
  { label: "Tier Memberships", border: "border-orange-300" },
  { label: "Referral Campaign", border: "border-orange-300" },
  { label: "Digital Perks", border: "border-violet-300" },
  { label: "Cashback & Credits", border: "border-violet-300" },
  { label: "Streaks & Challenges", border: "border-orange-300" },
  { label: "Gift Cards", border: "border-violet-300" },
];

export default function FloatingBadges() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverStates = useRef<Record<number, boolean>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Initialize state objects for physics simulation
    const badges = BADGES_LIST.map((_, index) => {
      const badgeEl = badgeRefs.current[index];
      const width = badgeEl ? badgeEl.offsetWidth : 140;
      const height = badgeEl ? badgeEl.offsetHeight : 40;

      // Random starting positions within borders
      const x = Math.random() * (containerWidth - width - 40) + 20;
      const y = Math.random() * (containerHeight - height - 40) + 20;

      // Very slow floating speeds (0.2 - 0.6px per frame)
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.3;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      return {
        x,
        y,
        vx,
        vy,
        width,
        height,
        currentScale: 1.0,
      };
    });

    let animationFrameId: number;

    const updatePhysics = () => {
      const currentContainerWidth = container.clientWidth;
      const currentContainerHeight = container.clientHeight;

      for (let i = 0; i < badges.length; i++) {
        const badgeState = badges[i];
        const badgeEl = badgeRefs.current[i];
        if (!badgeEl) continue;

        // Keep local width/height updated dynamically
        badgeState.width = badgeEl.offsetWidth;
        badgeState.height = badgeEl.offsetHeight;

        const isHovered = hoverStates.current[i] || false;
        const targetScale = isHovered ? 1.1 : 1.0;

        // Smoothly interpolate the scale animation
        badgeState.currentScale +=
          (targetScale - badgeState.currentScale) * 0.15;

        // If hovered, stop moving but animate scale
        if (!isHovered) {
          badgeState.x += badgeState.vx;
          badgeState.y += badgeState.vy;

          // Bounce off left/right borders
          if (badgeState.x < 0) {
            badgeState.x = 0;
            badgeState.vx = Math.abs(badgeState.vx);
          } else if (badgeState.x > currentContainerWidth - badgeState.width) {
            badgeState.x = currentContainerWidth - badgeState.width;
            badgeState.vx = -Math.abs(badgeState.vx);
          }

          // Bounce off top/bottom borders
          if (badgeState.y < 0) {
            badgeState.y = 0;
            badgeState.vy = Math.abs(badgeState.vy);
          } else if (
            badgeState.y >
            currentContainerHeight - badgeState.height
          ) {
            badgeState.y = currentContainerHeight - badgeState.height;
            badgeState.vy = -Math.abs(badgeState.vy);
          }
        }

        // Apply translation and scale via hardware-accelerated transform
        badgeEl.style.transform = `translate3d(${badgeState.x}px, ${badgeState.y}px, 0) scale(${badgeState.currentScale})`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl h-80 mt-8 rounded-xl overflow-hidden"
    >
      {BADGES_LIST.map((badge, index) => (
        <button
          key={badge.label}
          type="button"
          ref={(el) => {
            badgeRefs.current[index] = el;
          }}
          className={cn(
            "absolute left-0 top-0 cursor-pointer select-none rounded-full px-6 py-2.5 bg-gray-100 text-gray-800 text-sm font-medium border-2 shadow-sm transition-shadow hover:shadow-md duration-300 ease-out will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-violet-300",
            badge.border,
          )}
          onMouseEnter={() => {
            hoverStates.current[index] = true;
          }}
          onMouseLeave={() => {
            hoverStates.current[index] = false;
          }}
        >
          {badge.label}
        </button>
      ))}
    </div>
  );
}
