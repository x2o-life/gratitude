"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const DUPLICATE_SETS = 2;
const MD_BREAKPOINT_PX = 768;

type ColumnConfig = {
  columnCount: number;
  sideHeight: number;
  middleHeight: number;
};

const DESKTOP_CONFIG: ColumnConfig = {
  columnCount: 12,
  sideHeight: 60,
  middleHeight: 40,
};

const MOBILE_CONFIG: ColumnConfig = {
  columnCount: 6,
  sideHeight: 50,
  middleHeight: 40,
};

function getColumnHeights(
  columns: number,
  side: number,
  middle: number,
): number[] {
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

function interpolateHeight(
  slotIndex: number,
  columnCount: number,
  slotHeights: number[],
): number {
  const clamped = Math.max(0, Math.min(columnCount - 1, slotIndex));
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
  columnCount: number;
  slotHeights: number[];
};

function Column({
  index,
  x,
  slotWidth,
  gap,
  paddingX,
  containerWidth,
  columnCount,
  slotHeights,
}: ColumnProps) {
  const height = useTransform(x, (translateX) => {
    const columnCenter =
      paddingX + index * (slotWidth + gap) + slotWidth / 2 + translateX;
    const slotIndex = (columnCenter / containerWidth) * (columnCount - 1);
    return interpolateHeight(slotIndex, columnCount, slotHeights);
  });

  const heightStyle = useMotionTemplate`${height}%`;

  return (
    <motion.div
      className="shrink-0 bg-violet-200/50"
      style={{ width: slotWidth, height: heightStyle }}
    />
  );
}

function useColumnConfig() {
  const [config, setConfig] = useState<ColumnConfig>(DESKTOP_CONFIG);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${MD_BREAKPOINT_PX}px)`);

    const updateConfig = () => {
      setConfig(mediaQuery.matches ? DESKTOP_CONFIG : MOBILE_CONFIG);
    };

    updateConfig();
    mediaQuery.addEventListener("change", updateConfig);
    return () => mediaQuery.removeEventListener("change", updateConfig);
  }, []);

  return config;
}

export default function AnimatedColumns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const config = useColumnConfig();
  const slotHeights = useMemo(
    () =>
      getColumnHeights(
        config.columnCount,
        config.sideHeight,
        config.middleHeight,
      ),
    [config],
  );
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
          gap * (config.columnCount - 1)) /
        config.columnCount;

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
  }, [config.columnCount]);

  useEffect(() => {
    const { slotWidth, gap } = metrics;
    if (slotWidth <= 0) return;

    x.set(0);
    const loopDistance = config.columnCount * (slotWidth + gap);

    const controls = animate(x, -loopDistance, {
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
      duration: 28,
    });

    return () => controls.stop();
  }, [metrics, x, config.columnCount]);

  const totalColumns = config.columnCount * DUPLICATE_SETS;

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 bottom-0 h-full overflow-hidden px-4"
    >
      <motion.div className="flex h-full items-end gap-4" style={{ x }}>
        {Array.from({ length: totalColumns }, (_, index) => (
          <Column
            key={`${config.columnCount}-${index}`}
            index={index}
            x={x}
            slotWidth={metrics.slotWidth}
            gap={metrics.gap}
            paddingX={metrics.paddingX}
            containerWidth={metrics.containerWidth}
            columnCount={config.columnCount}
            slotHeights={slotHeights}
          />
        ))}
      </motion.div>
    </div>
  );
}
