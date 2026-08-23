import React, { useState } from "react";
import { formatCurrency } from "../../../lib/formatters";

interface MonthlyData {
  month: string;
  disbursed: number;
  revenue: number;
  target: number;
}

const data: MonthlyData[] = [
  { month: "Jan", disbursed: 42000000, revenue: 1680000, target: 40000000 },
  { month: "Feb", disbursed: 51000000, revenue: 2040000, target: 45000000 },
  { month: "Mar", disbursed: 68000000, revenue: 2720000, target: 60000000 },
  { month: "Apr", disbursed: 59000000, revenue: 2360000, target: 55000000 },
  { month: "May", disbursed: 74000000, revenue: 2960000, target: 65000000 },
  { month: "Jun", disbursed: 88000000, revenue: 3520000, target: 75000000 },
  { month: "Jul", disbursed: 92000000, revenue: 3680000, target: 80000000 },
  { month: "Aug", disbursed: 104500000, revenue: 4180000, target: 90000000 },
];

export const RevenueChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<"disbursed" | "revenue">("disbursed");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => d[selectedMetric])) * 1.15;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            Revenue & Disbursement Growth
          </h3>
          <p className="text-xs text-slate-500">Monthly loan volume vs interest & fee collections</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setSelectedMetric("disbursed")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              selectedMetric === "disbursed"
                ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Disbursements
          </button>
          <button
            onClick={() => setSelectedMetric("revenue")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              selectedMetric === "revenue"
                ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Net Revenue
          </button>
        </div>
      </div>

      {/* Interactive Bar Visualization */}
      <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
        {data.map((item, idx) => {
          const val = item[selectedMetric];
          const heightPercent = Math.round((val / maxVal) * 100);
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-medium py-1 px-2.5 rounded-md shadow-xl whitespace-nowrap pointer-events-none">
                  <div className="font-bold">{item.month} 2026</div>
                  <div className="text-blue-400">{formatCurrency(val)}</div>
                </div>
              )}

              {/* Bar */}
              <div className="w-full max-w-[40px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-48 flex items-end justify-center overflow-hidden p-0.5">
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    selectedMetric === "disbursed"
                      ? isHovered
                        ? "bg-blue-500"
                        : "bg-gradient-to-t from-blue-700 to-blue-500"
                      : isHovered
                      ? "bg-emerald-500"
                      : "bg-gradient-to-t from-emerald-700 to-emerald-500"
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <span className={`text-xs font-medium ${isHovered ? "text-blue-600 font-bold" : "text-slate-500"}`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 mt-2">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
          <span className="text-[11px] text-slate-500 font-medium">YTD Disbursed</span>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {formatCurrency(579000000)}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
          <span className="text-[11px] text-slate-500 font-medium">Avg Ticket Size</span>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {formatCurrency(1450000)}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
          <span className="text-[11px] text-slate-500 font-medium">YTD Revenue</span>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {formatCurrency(23160000)}
          </p>
        </div>
      </div>
    </div>
  );
};
