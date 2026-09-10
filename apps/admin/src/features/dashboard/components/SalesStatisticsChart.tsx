import React, { useState } from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const SalesStatisticsChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 12 Months data: Disbursed (Lakhs) & Commission Payouts (Lakhs)
  const monthsData = [
    { month: "Jan", disbursed: 110, commission: 12 },
    { month: "Feb", disbursed: 130, commission: 14 },
    { month: "Mar", disbursed: 125, commission: 13 },
    { month: "Apr", disbursed: 155, commission: 16 },
    { month: "May", disbursed: 140, commission: 15 },
    { month: "Jun", disbursed: 175, commission: 19 },
    { month: "Jul", disbursed: 165, commission: 18 },
    { month: "Aug", disbursed: 184, commission: 21 },
    { month: "Sep", disbursed: 150, commission: 16 },
    { month: "Oct", disbursed: 160, commission: 17 },
    { month: "Nov", disbursed: 170, commission: 19 },
    { month: "Dec", disbursed: 195, commission: 22 },
  ];

  const maxVal = 220; // Scale max for 0 to 220 Lakhs

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Disbursement & Commission Flow
          </h3>
          <span className="text-[10px] text-slate-400">Monthly loan volume vs partner payouts (₹ Lakhs)</span>
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

      {/* Metric Summary Boxes */}
      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="bg-slate-50 dark:bg-[#13151c] border border-slate-200 dark:border-[#252836] rounded-xl p-3.5 text-center">
          <span className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white block">
            ₹ 1.84 Cr
          </span>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mt-0.5">
            Disbursed (August)
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-[#13151c] border border-slate-200 dark:border-[#252836] rounded-xl p-3.5 text-center">
          <span className="text-xl lg:text-2xl font-black text-teal-600 dark:text-[#00d2b4] block">
            ₹ 21.4 Lakhs
          </span>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mt-0.5">
            Partner Commissions
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
            <span>₹2.0Cr</span>
            <span>₹1.5Cr</span>
            <span>₹1.0Cr</span>
            <span>₹50L</span>
            <span>₹0</span>
          </div>

          {/* Stacked Bars */}
          <div className="ml-10 w-full h-full flex items-end justify-between gap-1.5 sm:gap-2 pt-4">
            {monthsData.map((d, idx) => {
              const disHeight = (d.disbursed / maxVal) * 100;
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
                      <div>Disbursed: ₹{d.disbursed}L</div>
                      <div className="text-teal-400 dark:text-[#00d2b4]">Commission: ₹{d.commission}L</div>
                    </div>
                  )}

                  {/* Bar stack */}
                  <div className="w-full max-w-[24px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-300">
                    <div
                      style={{ height: `${disHeight}%` }}
                      className={`w-full bg-gradient-to-t from-blue-600 to-[#00d2b4] rounded-t transition-all ${
                        isHovered ? "brightness-110 shadow-lg shadow-blue-500/20" : ""
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
          <span className="text-slate-600 dark:text-slate-400 font-medium">Disbursed Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#00d2b4]" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">Payout Rate (Avg 1.25%)</span>
        </div>
      </div>
    </div>
  );
};

export default SalesStatisticsChart;
