import React from "react";
import { formatCurrency } from "../../../lib/formatters";

export const MonthlyStats: React.FC = () => {
  const metrics = [
    { label: "Target Disbursement", value: formatCurrency(120000000), progress: "87%", color: "bg-blue-600" },
    { label: "Achieved This Month", value: formatCurrency(104500000), progress: "104.5M", color: "bg-emerald-600" },
    { label: "DSA Sourced Volume", value: formatCurrency(78400000), progress: "75%", color: "bg-purple-600" },
    { label: "Direct & Web Sourced", value: formatCurrency(26100000), progress: "25%", color: "bg-amber-600" },
    { label: "Average Turnaround Time (TAT)", value: "2.4 Days", progress: "Fastest: 1.1d", color: "bg-teal-600" },
    { label: "NPA / Default Rate", value: "0.82%", progress: "Below 1.5% Cap", color: "bg-rose-600" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Monthly Performance Summary (August 2026)
          </h3>
          <p className="text-xs text-slate-500">Comprehensive monthly targets, sourcing ratios, and risk thresholds</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          On Track (+14.2% MoM)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m) => (
          <div key={m.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{m.label}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{m.progress}</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
