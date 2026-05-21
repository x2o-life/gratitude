"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COLUMN_COUNT = 12;
const DUPLICATE_SETS = 2;

function getColumnHeights(columns: number): number[] {
  const side = 60;
  const middle = 40;
  const midStart = columns / 2 - 1;
  const midEnd = columns / 2;
  const heights: number[] = [];

  for (let i = 0; i < columns; i++) {
    if (i <= midStart) {
      const t = midStart === 0 ? 0 : i / midStart;
      heights.push(side + (middle - side) * t);
    } else {
      const t = (i - midEnd) / (columns - 1 - midEnd);
      heights.push(middle + (side - middle) * t);
    }
  }

  return heights;
}

const slotHeights = getColumnHeights(COLUMN_COUNT);

function interpolateHeight(slotIndex: number): number {
  const clamped = Math.max(0, Math.min(COLUMN_COUNT - 1, slotIndex));
  const lower = Math.floor(clamped);
  const upper = Math.ceil(clamped);
  const t = clamped - lower;
  return slotHeights[lower]! * (1 - t) + slotHeights[upper]! * t;
}

type ColumnProps = {
  index: number;
  x: MotionValue<number>;
  slotWidth: number;
  gap: number;
  paddingX: number;
  containerWidth: number;
};

function Column({
  index,
  x,
  slotWidth,
  gap,
  paddingX,
  containerWidth,
}: ColumnProps) {
  const height = useTransform(x, (translateX) => {
    const columnCenter =
      paddingX + index * (slotWidth + gap) + slotWidth / 2 + translateX;
    const slotIndex = (columnCenter / containerWidth) * (COLUMN_COUNT - 1);
    return interpolateHeight(slotIndex);
  });

  const heightStyle = useMotionTemplate`${height}%`;

  return (
    <motion.div
      className="shrink-0 bg-violet-200/50"
      style={{ width: slotWidth, height: heightStyle }}
    />
  );
}

export default function AnimatedColumns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [metrics, setMetrics] = useState({
    containerWidth: 0,
    slotWidth: 0,
    gap: 16,
    paddingX: 16,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const styles = getComputedStyle(container);
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 16;
      const paddingRight = Number.parseFloat(styles.paddingRight) || 16;
      const gap = Number.parseFloat(styles.columnGap || "16") || 16;
      const containerWidth = container.clientWidth;
      const slotWidth =
        (containerWidth -
          paddingLeft -
          paddingRight -
          gap * (COLUMN_COUNT - 1)) /
        COLUMN_COUNT;

      setMetrics({
        containerWidth,
        slotWidth,
        gap,
        paddingX: paddingLeft,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { slotWidth, gap } = metrics;
    if (slotWidth <= 0) return;

    const loopDistance = COLUMN_COUNT * (slotWidth + gap);

    const controls = animate(x, -loopDistance, {
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
      duration: 28,
    });

    return () => controls.stop();
  }, [metrics, x]);

  const totalColumns = COLUMN_COUNT * DUPLICATE_SETS;

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 bottom-0 h-full overflow-hidden px-4"
    >
      <motion.div className="flex h-full items-end gap-4" style={{ x }}>
        {Array.from({ length: totalColumns }, (_, index) => (
          <Column
            key={index}
            index={index}
            x={x}
            slotWidth={metrics.slotWidth}
            gap={metrics.gap}
            paddingX={metrics.paddingX}
            containerWidth={metrics.containerWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}
