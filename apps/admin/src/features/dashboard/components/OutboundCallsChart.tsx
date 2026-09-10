import React, { useState } from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const OutboundCallsChart: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Weekdays data: lead applications received (0-200) and qualification rate (0-100%)
  const weekData = [
    { day: "Mon", calls: 145, rate: 68 },
    { day: "Tue", calls: 180, rate: 74 },
    { day: "Wed", calls: 165, rate: 82 },
    { day: "Thu", calls: 190, rate: 79 },
    { day: "Fri", calls: 175, rate: 88 },
    { day: "Sat", calls: 110, rate: 58 },
    { day: "Sun", calls: 75, rate: 45 },
  ];

  const maxCalls = 200;

  // SVG dimensions for smooth line rendering
  const svgWidth = 500;
  const svgHeight = 220;
  const paddingX = 40;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = 170;

  // Calculate coordinates for line path
  const linePoints = weekData.map((d, i) => {
    const x = paddingX + (i / (weekData.length - 1)) * usableWidth;
    const y = svgHeight - 30 - (d.rate / 100) * usableHeight;
    return { x, y, rate: d.rate, calls: d.calls, day: d.day };
  });

  const pathD = linePoints.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Weekly Lead Inflow & Qualification Rate
          </h3>
          <span className="text-[10px] text-slate-400">Applications received vs credit-approved percentage</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1f212c] hover:bg-slate-200 dark:hover:bg-[#282b3a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Expand Chart"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1f212c] hover:bg-slate-200 dark:hover:bg-[#282b3a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Chart Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Axis Combined Chart Canvas */}
      <div className="relative py-4 flex-1 flex flex-col justify-center">
        {/* Y-Axis Grid Lines & Labels */}
        <div className="relative h-64 w-full">
          {/* Background Grid */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 dark:opacity-20 ml-10 mr-10">
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
          </div>

          {/* Left Y-axis (Received) */}
          <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 pointer-events-none">
            <span>200</span>
            <span>150</span>
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>

          {/* Right Y-axis (Qual Rate %) */}
          <div className="absolute right-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-teal-600 dark:text-[#00d2b4] pointer-events-none text-right font-bold">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Vertical Blue Bars Container */}
          <div className="absolute inset-0 left-10 right-10 bottom-6 flex items-end justify-between px-2">
            {weekData.map((d, i) => {
              const barHeight = (d.calls / maxCalls) * 100;
              const isHovered = hoveredDay === i;

              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                  onMouseEnter={() => setHoveredDay(i)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div
                    style={{ height: `${barHeight}%` }}
                    className={`w-9 bg-blue-600/85 hover:bg-blue-600 rounded-t-lg transition-all duration-200 ${
                      isHovered ? "bg-blue-500 scale-105 shadow-lg shadow-blue-600/40" : ""
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium mt-2 transition-colors ${
                      isHovered ? "text-slate-900 dark:text-white font-bold" : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SVG Overlay for Teal Line & Data Point Badges */}
          <svg
            className="absolute inset-0 left-10 right-10 bottom-6 w-[calc(100%-80px)] h-[calc(100%-24px)] overflow-visible pointer-events-none"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            {/* Smooth Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#00d2b4"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Line Points with Teal Badges */}
            {linePoints.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  className="fill-white dark:fill-[#14161c]"
                  stroke="#00d2b4"
                  strokeWidth="3"
                />
                <g transform={`translate(${pt.x}, ${pt.y - 12})`}>
                  <rect
                    x="-16"
                    y="-12"
                    width="32"
                    height="16"
                    rx="4"
                    fill="#00d2b4"
                  />
                  <text
                    x="0"
                    y="-1"
                    textAnchor="middle"
                    fill="#0f172a"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {pt.rate}%
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Centered Bottom Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-200 dark:border-[#252836] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-600" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">Daily Leads Sourced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-teal-500 dark:bg-[#00d2b4] rounded-full" />
          <span className="text-teal-600 dark:text-[#00d2b4] font-medium">Credit Qualification Rate (%)</span>
        </div>
      </div>
    </div>
  );
};

export default OutboundCallsChart;
