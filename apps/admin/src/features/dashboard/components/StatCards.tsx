import React from "react";
import { formatCurrency } from "../../../lib/formatters";

interface StatCardsProps {
  stats: {
    totalLoans: number;
    activeDisbursements: number;
    totalDSA: number;
    pendingVerifications: number;
  };
}

export const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Total Applications",
      value: stats.totalLoans.toLocaleString(),
      change: "+12.4%",
      isPositive: true,
      period: "vs last month",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      accent: "from-blue-600 to-indigo-600",
    },
    {
      title: "Disbursed Volume (YTD)",
      value: formatCurrency(stats.activeDisbursements),
      change: "+28.6%",
      isPositive: true,
      period: "vs last month",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      accent: "from-emerald-600 to-teal-600",
    },
    {
      title: "Active DSA Partners",
      value: stats.totalDSA.toLocaleString(),
      change: "+15 New",
      isPositive: true,
      period: "this quarter",
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      accent: "from-purple-600 to-pink-600",
    },
    {
      title: "Pending Verifications",
      value: stats.pendingVerifications.toLocaleString(),
      change: "4 Urgent",
      isPositive: false,
      period: "requires attention",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      accent: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c) => (
        <div
          key={c.title}
          className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {c.title}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                c.isPositive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
              }`}
            >
              {c.change}
            </span>
          </div>

          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-3 tracking-tight">
            {c.value}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>{c.period}</span>
            <span className="font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
              View details &rarr;
            </span>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${c.accent} opacity-80`}
          />
        </div>
      ))}
    </div>
  );
};
