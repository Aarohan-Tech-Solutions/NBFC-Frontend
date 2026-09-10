import React from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const TopSellingPlansDonut: React.FC = () => {
  const products = [
    { name: "Personal Loans", pct: 48, amount: "₹ 48.2 Lakhs", color: "#00d2b4" },
    { name: "Mortgage / LAP Loans", pct: 32, amount: "₹ 32.1 Lakhs", color: "#2563eb" },
    { name: "Business & MSME", pct: 20, amount: "₹ 20.1 Lakhs", color: "#8b5cf6" },
  ];

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Loan Product Mix</h3>
          <span className="text-[10px] text-slate-400">Disbursed volume distribution</span>
        </div>
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
            {/* Product 1 segment (Teal) */}
            <path
              stroke="#00d2b4"
              strokeWidth="4.5"
              strokeDasharray="48, 100"
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Product 2 segment (Blue) */}
            <path
              stroke="#2563eb"
              strokeWidth="4.5"
              strokeDasharray="32, 100"
              strokeDashoffset="-48"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Product 3 segment (Purple) */}
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
            <span className="text-xl font-black text-slate-900 dark:text-white">₹ 1.00 Cr</span>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              Disbursed Volume
            </span>
          </div>
        </div>
      </div>

      {/* Legend Underneath */}
      <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-[#252836] text-xs">
        {products.map((p) => (
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

export default TopSellingPlansDonut;
