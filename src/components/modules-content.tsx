"use client";

import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "./ui/combobox";

export function CampaignsContent() {
  return (
    <div className="relative w-full scale-75 md:scale-100 origin-left -translate-x-1/20 md:translate-x-1/14 h-[320px]">
      <style>{`
                @keyframes path-flow {
                    from {
                        stroke-dashoffset: 20;
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .path-flow-animated {
                    stroke-dasharray: 6, 4;
                    animation: path-flow 1.5s linear infinite;
                }
            `}</style>

      {/* SVG drawing the connecting arrows */}
      <svg
        viewBox="0 0 450 320"
        className="pointer-events-none absolute left-0 top-0 h-full w-[450px] max-w-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Campaign flow arrows</title>
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#a78bfa" />
          </marker>
        </defs>

        {/* Arrow 1: Template -> Customize */}
        <path
          d="M 140 42.5 L 300 42.5"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="path-flow-animated"
        />

        {/* Arrow 2 (mobile): Customize -> Launch (straight down) */}
        <path
          d="M 370 65 L 370 120"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="path-flow-animated"
        />

        {/* Arrow 3: Launch -> Track */}
        <path
          d="M 310 152.5 C 225 152.5, 225 200, 225 247"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          className="path-flow-animated"
        />
      </svg>

      {/* Nodes */}
      <div className="absolute left-[20px] top-[20px] w-[120px] h-[45px] flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-sm hover:border-violet-300 hover:shadow-md transition-all text-sm font-medium">
        Template
      </div>
      <div className="absolute left-[310px] top-[20px] w-[120px] h-[45px] flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-sm hover:border-violet-300 hover:shadow-md transition-all text-sm font-medium">
        Customize
      </div>
      <div className="absolute left-[310px] top-[130px] w-[120px] h-[45px] flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-sm hover:border-violet-300 hover:shadow-md transition-all text-sm font-medium">
        Launch
      </div>
      <div className="absolute left-[165px] top-[255px] w-[120px] h-[45px] flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-sm hover:border-violet-300 hover:shadow-md transition-all text-sm font-medium">
        Track
      </div>
    </div>
  );
}

export function CampaignsContent02() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="rounded-lg p-2 flex items-center justify-center border-2 border-violet-300">Template</div>
      <div className="rounded-lg p-2 flex items-center justify-center border-2 border-orange-300">Launch</div>
      <div className="rounded-lg p-2 flex items-center justify-center border-2 border-violet-300">Track</div>
    </div>
  )
}

export function TemplatesContent() {
  const TEMPLATES = [
    "Points & Rewards",
    "Tier Memberships",
    "Referral Campaigns",
    "Digital Perks",
    "Cashback & Credits",
    "Streaks & Challenges",
    "Gift Cards",
  ];

  return (
    <div className="max-w-md flex flex-wrap justify-center items-end gap-2">
      {TEMPLATES.map((template) => (
        <Badge
          key={template}
          className={cn(
            "p-3 text-xs md:text-sm rounded-xl bg-transparent text-black border border-orange-300 cursor-pointer",
            "hover:h-10 hover:rounded-lg",
            "transition-all duration-300",
          )}
        >
          {template}
        </Badge>
      ))}
      <Badge className="p-3 text-xs md:text-sm rounded-full bg-transparent text-black border-dashed border-orange-300 cursor-pointer">
        More
      </Badge>
    </div>
  );
}

export function BYOTContent() {
  return (
    <div className="max-w-md grid grid-cols-3 grid-rows-2 gap-y-4">
      <div className="col-start-1 min-w-44 flex items-center justify-between p-3 rounded-lg border border-violet-300 relative">
        <p className="ml-1 text-sm">Audience</p>
        <Combobox>
          <ComboboxTrigger className="border-l pl-2" />
          <ComboboxContent className="min-w-44">
            <ComboboxList>
              <ComboboxItem className="p-2 text-sm">New customers</ComboboxItem>
              <ComboboxItem className="p-2 text-sm">VIP customers</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <div className="absolute left-0 -translate-x-1/2 py-1 bg-violet-200 rounded-xs">
          <GripVertical className="size-4 text-violet-400" />
        </div>
      </div>

      <div className="col-start-3 row-start-2 place-self-end min-w-44 flex items-center justify-between p-3 rounded-lg border border-orange-300 relative">
        <p className="ml-1 text-sm">Reward Type</p>
        <Combobox>
          <ComboboxTrigger className="border-l pl-2" />
          <ComboboxContent className="min-w-44">
            <ComboboxList>
              <ComboboxItem className="p-2 text-sm">Points</ComboboxItem>
              <ComboboxItem className="p-2 text-sm">Cashback</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <div className="absolute left-0 -translate-x-1/2 py-1 bg-orange-200 rounded-xs">
          <GripVertical className="size-4 text-orange-400" />
        </div>
      </div>
    </div>
  );
}

/** Network Spread Animation */
const TRACK_RADIUS = 8;
/** Center-to-center spacing: diameter + gap (gap equals diameter). */
const TRACK_STEP = TRACK_RADIUS * 4;
const TRACK_VIEW_WIDTH = 400;
const TRACK_VIEW_HEIGHT = 320;
const TRACK_CENTER_X = TRACK_VIEW_WIDTH / 2;
const TRACK_CENTER_Y = TRACK_VIEW_HEIGHT / 2;
const TRACK_GROWTH_TURNS = 20;
const TRACK_NODE_COLORS = [
  "#c4b5fd", // violet-300
  "#ddd6fe", // violet-200
  "#fdba74", // orange-300
  "#fed7aa", // orange-200
] as const;

type SpreadDirection = "north" | "south" | "east" | "west";

const SPREAD_DIRECTIONS: SpreadDirection[] = [
  "north",
  "south",
  "east",
  "west",
];

const SPREAD_DELTA: Record<SpreadDirection, [number, number]> = {
  north: [0, -1],
  south: [0, 1],
  east: [1, 0],
  west: [-1, 0],
};

type SpreadNode = {
  id: number;
  gx: number;
  gy: number;
  x: number;
  y: number;
  r: number;
  fill: string;
  lineStep: number;
  nodeStep: number;
  turn: number;
};

type SpreadLine = {
  from: number;
  to: number;
  step: number;
};

type SpreadNetwork = {
  nodes: SpreadNode[];
  lines: SpreadLine[];
  durationMs: number;
};

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

function shuffleWithRng<T>(items: T[], rng: () => number) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function gridKey(gx: number, gy: number) {
  return `${gx},${gy}`;
}

function gridToPixel(gx: number, gy: number) {
  return {
    x: TRACK_CENTER_X + gx * TRACK_STEP,
    y: TRACK_CENTER_Y + gy * TRACK_STEP,
  };
}

function isInsideView(x: number, y: number) {
  const margin = TRACK_RADIUS + 12;
  return (
    x - margin >= 0 &&
    x + margin <= TRACK_VIEW_WIDTH &&
    y - margin >= 0 &&
    y + margin <= TRACK_VIEW_HEIGHT
  );
}

function pickRandomNodeColor(rng: () => number) {
  return TRACK_NODE_COLORS[
    Math.floor(rng() * TRACK_NODE_COLORS.length)
  ] as (typeof TRACK_NODE_COLORS)[number];
}

function findSpawnCell(
  parent: SpreadNode,
  occupied: Set<string>,
  rng: () => number,
) {
  const directions = shuffleWithRng(SPREAD_DIRECTIONS, rng);

  for (const direction of directions) {
    const [dx, dy] = SPREAD_DELTA[direction];
    const nextGx = parent.gx + dx;
    const nextGy = parent.gy + dy;
    const nextKey = gridKey(nextGx, nextGy);

    if (occupied.has(nextKey)) {
      continue;
    }

    const { x, y } = gridToPixel(nextGx, nextGy);
    if (!isInsideView(x, y)) {
      continue;
    }

    return { gx: nextGx, gy: nextGy, x, y };
  }

  return null;
}

function buildSpreadNetwork(seed: number): SpreadNetwork {
  const rng = seededRandom(seed);
  const occupied = new Set<string>();
  const nodes: SpreadNode[] = [];
  const lines: SpreadLine[] = [];
  let animationStep = 0;

  // Turn 1: center node only
  occupied.add(gridKey(0, 0));
  nodes.push({
    id: 0,
    gx: 0,
    gy: 0,
    x: TRACK_CENTER_X,
    y: TRACK_CENTER_Y,
    r: TRACK_RADIUS,
    fill: pickRandomNodeColor(rng),
    lineStep: 0,
    nodeStep: 0,
    turn: 1,
  });
  animationStep = 1;

  for (let turn = 2; turn <= TRACK_GROWTH_TURNS; turn += 1) {
    const parents =
      turn === 2 ? [nodes[0]] : shuffleWithRng([...nodes], rng);
    const turnLineStep = animationStep;
    const turnNodeStep = animationStep + 1;
    let spawnedThisTurn = false;

    for (const parent of parents) {
      const cell = findSpawnCell(parent, occupied, rng);
      if (!cell) {
        continue;
      }

      spawnedThisTurn = true;
      const id = nodes.length;
      occupied.add(gridKey(cell.gx, cell.gy));
      lines.push({ from: parent.id, to: id, step: turnLineStep });
      nodes.push({
        id,
        gx: cell.gx,
        gy: cell.gy,
        x: cell.x,
        y: cell.y,
        r: TRACK_RADIUS,
        fill: pickRandomNodeColor(rng),
        lineStep: turnLineStep,
        nodeStep: turnNodeStep,
        turn,
      });
    }

    if (spawnedThisTurn) {
      animationStep += 2;
    }
  }

  const durationMs = animationStep * 450 + 800;

  return { nodes, lines, durationMs };
}

function getSpreadTiming(type: "node" | "line", step: number) {
  const beat = 0.45;
  if (type === "node") {
    return { delay: step * beat, duration: 0.3 };
  }
  return { delay: step * beat, duration: 0.35 };
}

export function TrackContent() {
  const [key, setKey] = useState(0);

  const { nodes, lines, durationMs } = useMemo(
    () => buildSpreadNetwork(key),
    [key],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, durationMs);
    return () => clearInterval(interval);
  }, [durationMs]);

  return (
    <div
      key={key}
      className="relative flex h-[320px] md:w-[400px] items-center justify-center"
    >
      <svg className="h-full w-full" viewBox={`0 0 ${TRACK_VIEW_WIDTH} ${TRACK_VIEW_HEIGHT}`}>
        <title>Network spread growth</title>
        {lines.map((line) => {
          const fromNode = nodes[line.from];
          const toNode = nodes[line.to];
          const { delay, duration } = getSpreadTiming("line", line.step);

          return (
            <motion.line
              key={`line-${line.from}-${line.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#e2e8f0"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay,
                duration,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {nodes.map((node) => {
          const { delay, duration } = getSpreadTiming("node", node.nodeStep);

          return (
            <motion.circle
              key={`node-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.fill}
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              transition={{
                delay,
                duration,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
