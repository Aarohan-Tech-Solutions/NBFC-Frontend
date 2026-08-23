import React, { useState } from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const SalesStatisticsChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 12 Months data: revenue & cost
  const monthsData = [
    { month: "Jan", revenue: 110, cost: 42 },
    { month: "Feb", revenue: 130, cost: 48 },
    { month: "Mar", revenue: 125, cost: 50 },
    { month: "Apr", revenue: 155, cost: 58 },
    { month: "May", revenue: 140, cost: 52 },
    { month: "Jun", revenue: 175, cost: 65 },
    { month: "Jul", revenue: 165, cost: 60 },
    { month: "Aug", revenue: 184, cost: 62 },
    { month: "Sep", revenue: 150, cost: 54 },
    { month: "Oct", revenue: 160, cost: 56 },
    { month: "Nov", revenue: 170, cost: 62 },
    { month: "Dec", revenue: 195, cost: 70 },
  ];

  const maxVal = 220; // Scale max for 0 to 220k

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Sales Statistics</h3>
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

      {/* Metric Summary Boxes */}
      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="bg-slate-50 dark:bg-[#13151c] border border-slate-200 dark:border-[#252836] rounded-xl p-3.5 text-center">
          <span className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white block">
            $184,250
          </span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mt-0.5">
            Revenue
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-[#13151c] border border-slate-200 dark:border-[#252836] rounded-xl p-3.5 text-center">
          <span className="text-xl lg:text-2xl font-black text-teal-600 dark:text-[#00d2b4] block">
            $62,400
          </span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mt-0.5">
            Cost
          </span>
        </div>
      </div>

      {/* Stacked Vertical Bar Chart */}
      <div className="relative pt-2 pb-4 flex-1 flex flex-col justify-end">
        {/* Y-Axis Grid Lines & Labels */}
        <div className="relative h-56 w-full flex items-end">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 dark:opacity-20">
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
            <div className="border-b border-slate-300 dark:border-slate-500 w-full" />
          </div>

          {/* Left Y-axis ticks */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 pr-2 pointer-events-none">
            <span>$200k</span>
            <span>$150k</span>
            <span>$100k</span>
            <span>$50k</span>
            <span>$0</span>
          </div>

          {/* Stacked Bars */}
          <div className="ml-10 w-full h-full flex items-end justify-between gap-1.5 sm:gap-2 pt-4">
            {monthsData.map((d, idx) => {
              const revHeight = (d.revenue / maxVal) * 100;
              const costHeight = (d.cost / maxVal) * 100;
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={d.month}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 z-20 bg-slate-900 dark:bg-[#1e212b] border border-slate-700 dark:border-[#2e3242] text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap">
                      <div>Rev: ${d.revenue}k</div>
                      <div className="text-teal-400 dark:text-[#00d2b4]">Cost: ${d.cost}k</div>
                    </div>
                  )}

                  {/* Bar stack */}
                  <div className="w-full max-w-[24px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-300">
                    {/* Top teal stack (Cost) */}
                    <div
                      style={{ height: `${costHeight}%` }}
                      className={`w-full bg-teal-500 dark:bg-[#00d2b4] transition-all ${
                        isHovered ? "brightness-110" : ""
                      }`}
                    />
                    {/* Bottom blue stack (Revenue) */}
                    <div
                      style={{ height: `${revHeight}%` }}
                      className={`w-full bg-blue-600 transition-all ${
                        isHovered ? "brightness-110" : ""
                      }`}
                    />
                  </div>

                  {/* X-axis label */}
                  <span
                    className={`text-[10px] font-medium mt-2 transition-colors ${
                      isHovered ? "text-slate-900 dark:text-white font-bold" : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Centered Bottom Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-200 dark:border-[#252836] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-600" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-teal-500 dark:bg-[#00d2b4]" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">Cost</span>
        </div>
      </div>
    </div>
  );
};
