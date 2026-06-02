"use client";

import { motion } from "framer-motion";
import { Circle, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "./ui/combobox";

const MODULES = [
  {
    id: 1,
    title: "Launch Campaigns in minutes",
    description:
      "Create and publish loyalty experiences without lengthy setup or technical complexity.",
  },
  {
    id: 2,
    title: "Start with Ready-made Templates",
    description:
      "Choose from proven campaign templates and customize them to fit your brand.",
  },
  {
    id: 3,
    title: "Build Rewards Your Way",
    description:
      "Combine points, tiers, referrals and perks to create a program that feels uniquely yours.",
  },
  {
    id: 4,
    title: "Adapt Campaigns As You Grow",
    description:
      "Refine and expand your loyalty strategy as your audience, goals and business evolve.",
  },
];

export default function ModulesScrollspy() {
  const [currentModule, setCurrentModule] = useState(1);

  return (
    <div className="mt-16 w-full grid grid-cols-5 gap-10">
      <div className="flex flex-col gap-6 col-span-2">
        {MODULES.map((module) => (
          <button
            key={module.id}
            type="button"
            className={cn(
              "text-left border w-full flex flex-col gap-1 p-2 rounded-lg group transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-violet-300",
              currentModule === module.id
                ? "border-violet-300 bg-violet-50"
                : "border-transparent hover:border-violet-200 hover:bg-violet-50/50",
            )}
            onClick={() => setCurrentModule(module.id)}
          >
            <div className="flex gap-4 items-center">
              <Circle
                strokeWidth={4}
                className={cn(
                  "size-2.5 text-violet-300 transition-colors",
                  currentModule === module.id
                    ? "fill-violet-300"
                    : "group-hover:fill-violet-300",
                )}
              />
              <p className="text-lg font-medium font-bodoni-moda">
                {module.title}
              </p>
            </div>
            <p className="text-sm text-gray-500">{module.description}</p>
          </button>
        ))}
      </div>

      <div className="col-span-3 p-8 flex justify-center items-center border rounded-lg">
        <ContentLoader currentModule={currentModule} />
      </div>
    </div>
  );
}

function ContentLoader({ currentModule }: { currentModule: number }) {
  switch (currentModule) {
    case 1: {
      return <CampaignsContent />;
    }
    case 2: {
      return <TemplatesContent />;
    }
    case 3: {
      return <BYOTContent />;
    }
    case 4: {
      return <TrackContent />;
    }
  }
}

function CampaignsContent() {
  return (
    <div className="relative w-full translate-x-1/5 h-[320px]">
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
        className="absolute inset-0 w-full h-full pointer-events-none"
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

        {/* Arrow 2: Customize -> Launch */}
        <path
          d="M 430 42.5 C 480 42.5, 480 152.5, 438 152.5"
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

function TemplatesContent() {
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
    <div className="max-w-2xl flex flex-wrap justify-center items-end gap-2">
      {TEMPLATES.map((template) => (
        <Badge
          key={template}
          className={cn(
            "p-3 text-sm rounded-xl bg-transparent text-black border border-orange-300 cursor-pointer",
            "hover:h-10 hover:rounded-lg",
            "transition-all duration-300",
          )}
        >
          {template}
        </Badge>
      ))}
      <Badge className="p-3 text-sm rounded-full bg-transparent text-black border-dashed border-orange-300 cursor-pointer">
        More
      </Badge>
    </div>
  );
}

function BYOTContent() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-y-4">
      <div className="col-start-1 min-w-44 flex items-center justify-between p-3 rounded-lg border border-violet-300 relative">
        <p className="ml-1">Audience</p>
        <Combobox>
          <ComboboxTrigger className="border-l pl-2" />
          <ComboboxContent className="min-w-44">
            <ComboboxList>
              <ComboboxItem className="p-2">New customers</ComboboxItem>
              <ComboboxItem className="p-2">VIP customers</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <div className="absolute left-0 -translate-x-1/2 py-1 bg-violet-200 rounded-xs">
          <GripVertical className="size-4 text-violet-400" />
        </div>
      </div>

      <div className="col-start-3 row-start-2 min-w-44 flex items-center justify-between p-3 rounded-lg border border-orange-300 relative">
        <p className="ml-1">Reward Type</p>
        <Combobox>
          <ComboboxTrigger className="border-l pl-2" />
          <ComboboxContent className="min-w-44">
            <ComboboxList>
              <ComboboxItem className="p-2">Points</ComboboxItem>
              <ComboboxItem className="p-2">Cashback</ComboboxItem>
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

function TrackContent() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Nodes definition representing growth stages
  const nodes = [
    // Level 0
    { id: 0, x: 40, y: 160, r: 9, fill: "#8b5cf6" }, // violet-500
    // Level 1
    { id: 1, x: 120, y: 160, r: 8, fill: "#a78bfa" }, // violet-400
    // Level 2
    { id: 2, x: 200, y: 100, r: 7, fill: "#c4b5fd" }, // violet-300
    { id: 3, x: 200, y: 220, r: 7, fill: "#c4b5fd" },
    // Level 3
    { id: 4, x: 280, y: 70, r: 6, fill: "#fdba74" }, // orange-300
    { id: 5, x: 280, y: 130, r: 6, fill: "#fdba74" },
    { id: 6, x: 280, y: 190, r: 6, fill: "#fdba74" },
    { id: 7, x: 280, y: 250, r: 6, fill: "#fdba74" },
    // Level 4
    { id: 8, x: 360, y: 55, r: 5, fill: "#f97316" }, // orange-500
    { id: 9, x: 360, y: 85, r: 5, fill: "#f97316" },
    { id: 10, x: 360, y: 115, r: 5, fill: "#f97316" },
    { id: 11, x: 360, y: 145, r: 5, fill: "#f97316" },
    { id: 12, x: 360, y: 175, r: 5, fill: "#f97316" },
    { id: 13, x: 360, y: 205, r: 5, fill: "#f97316" },
    { id: 14, x: 360, y: 235, r: 5, fill: "#f97316" },
    { id: 15, x: 360, y: 265, r: 5, fill: "#f97316" },
  ];

  // Connections definition: [from_node_id, to_node_id, stage]
  const lines = [
    { from: 0, to: 1, stage: 0 },

    { from: 1, to: 2, stage: 1 },
    { from: 1, to: 3, stage: 1 },

    { from: 2, to: 4, stage: 2 },
    { from: 2, to: 5, stage: 2 },
    { from: 3, to: 6, stage: 2 },
    { from: 3, to: 7, stage: 2 },

    { from: 4, to: 8, stage: 3 },
    { from: 4, to: 9, stage: 3 },
    { from: 5, to: 10, stage: 3 },
    { from: 5, to: 11, stage: 3 },
    { from: 6, to: 12, stage: 3 },
    { from: 6, to: 13, stage: 3 },
    { from: 7, to: 14, stage: 3 },
    { from: 7, to: 15, stage: 3 },
  ];

  // Timing helper
  const getTiming = (type: "node" | "line", level: number) => {
    if (type === "node") {
      return {
        delay: level * 0.7,
        duration: 0.3,
      };
    }
    return {
      delay: level * 0.7 + 0.3,
      duration: 0.4,
    };
  };

  return (
    <div
      key={key}
      className="relative w-[400px] h-[320px] flex items-center justify-center"
    >
      <svg className="w-full h-full" viewBox="0 0 400 320">
        <title>Exponential Network Growth</title>
        {/* Draw Lines first so they sit behind circles */}
        {lines.map((line) => {
          const fromNode = nodes[line.from];
          const toNode = nodes[line.to];
          const { delay, duration } = getTiming("line", line.stage);
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

        {/* Draw Node Circles */}
        {nodes.map((node) => {
          let level = 0;
          if (node.x === 120) level = 1;
          else if (node.x === 200) level = 2;
          else if (node.x === 280) level = 3;
          else if (node.x === 360) level = 4;

          const { delay, duration } = getTiming("node", level);

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
