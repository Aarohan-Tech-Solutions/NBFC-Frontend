import React from "react";
import { Maximize2, MoreHorizontal, ShieldCheck } from "lucide-react";

export const RunningProjectsCard: React.FC = () => {
  const stages = [
    { name: "KYC & Identity Verification", count: "142 Files", pct: 92, color: "#00d2b4" },
    { name: "Bank & Income Statement Analysis", count: "98 Files", pct: 85, color: "#2563eb" },
    { name: "Property Legal & Technical Valuation", count: "46 Files", pct: 64, color: "#f59e0b" },
    { name: "Credit Underwriting & Sanction", count: "112 Files", pct: 88, color: "#10b981" },
    { name: "Escrow Bank Account Disbursement", count: "84 Files", pct: 76, color: "#8b5cf6" },
  ];

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Active Loan Pipeline</h3>
          <span className="text-[10px] text-slate-400">Origination lifecycle stages</span>
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

      {/* Yearly Disbursed Volume Banner */}
      <div className="my-4 p-3.5 rounded-xl bg-slate-50 dark:bg-[#13151c] border border-slate-200/80 dark:border-[#252836]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Annual Loan Book (YTD)
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            RBI Compliant
          </span>
        </div>
        <span className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white block mt-0.5 tracking-tight">
          ₹ 68,450,000
        </span>
      </div>

      {/* Pipeline Stage Rows */}
      <div className="space-y-3.5 pt-1 flex-1 flex flex-col justify-around">
        {stages.map((stg) => (
          <div key={stg.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-200 truncate pr-2">
                {stg.name}
              </span>
              <span className="font-bold text-slate-900 dark:text-white font-mono shrink-0">
                {stg.count} ({stg.pct}%)
              </span>
            </div>
            {/* Horizontal Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#222532] rounded-full overflow-hidden">
              <div
                style={{
                  width: `${stg.pct}%`,
                  backgroundColor: stg.color,
                }}
                className="h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningProjectsCard;
