import React from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const TopSellingPlansDonut: React.FC = () => {
  // 3 Donut segments: Plan 1 (48%), Plan 2 (32%), Plan 3 (20%)
  const plans = [
    { name: "Plan 1", pct: 48, amount: "$48,200", color: "#00d2b4", strokeDash: "48 100", offset: 0 },
    { name: "Plan 2", pct: 32, amount: "$32,150", color: "#2563eb", strokeDash: "32 100", offset: -48 },
    { name: "Plan 3", pct: 20, amount: "$20,100", color: "#8b5cf6", strokeDash: "20 100", offset: -80 },
  ];

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Top Selling Plans</h3>
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1f212c] hover:bg-slate-200 dark:hover:bg-[#282b3a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Expand"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1f212c] hover:bg-slate-200 dark:hover:bg-[#282b3a] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Centered Large Donut Chart with Hollow Center */}
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle track */}
            <path
              className="text-slate-100 dark:text-[#202330]"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Plan 1 segment (Teal) */}
            <path
              stroke="#00d2b4"
              strokeWidth="4.5"
              strokeDasharray="48, 100"
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Plan 2 segment (Blue) */}
            <path
              stroke="#2563eb"
              strokeWidth="4.5"
              strokeDasharray="32, 100"
              strokeDashoffset="-48"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Plan 3 segment (Purple) */}
            <path
              stroke="#8b5cf6"
              strokeWidth="4.5"
              strokeDasharray="20, 100"
              strokeDashoffset="-80"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>

          {/* Centered Hollow Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">$100.4k</span>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              Total Volume
            </span>
          </div>
        </div>
      </div>

      {/* Legend Underneath */}
      <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-[#252836] text-xs">
        {plans.map((p) => (
          <div key={p.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="font-semibold text-slate-700 dark:text-slate-300">{p.name}</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-slate-500 dark:text-slate-400">{p.amount}</span>
              <span className="text-slate-900 dark:text-white font-bold">({p.pct}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
