import React from "react";
import { formatCurrency } from "../../../lib/formatters";

export const TodayStats: React.FC = () => {
  const stats = [
    { title: "Today's New Applications", count: "34", change: "+18%", positive: true, detail: "Across 14 active branches", color: "border-blue-500 bg-blue-50/30 dark:bg-blue-950/20" },
    { title: "Disbursed Today", count: formatCurrency(12450000), change: "+24%", positive: true, detail: "11 Loans credited via RTGS", color: "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20" },
    { title: "DSA Logins Today", count: "186", change: "+8%", positive: true, detail: "62% active partner engagement", color: "border-purple-500 bg-purple-50/30 dark:bg-purple-950/20" },
    { title: "Pending Immediate Action", count: "12", change: "4 High Priority", positive: false, detail: "KYC & Sanction approvals pending", color: "border-amber-500 bg-amber-50/30 dark:bg-amber-950/20" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Real-Time Operations Snapshot (Today)
        </h4>
        <span className="text-xs text-slate-500">Live updated: {new Date().toLocaleTimeString()}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.title}
            className={`p-5 rounded-2xl border-l-4 border shadow-sm ${s.color} border-slate-200 dark:border-slate-800 transition-transform hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{s.title}</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  s.positive
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                }`}
              >
                {s.change}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">{s.count}</div>
            <div className="text-[11px] text-slate-500 mt-1">{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
