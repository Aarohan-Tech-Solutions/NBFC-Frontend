import React from "react";
import { formatCurrency } from "../../../lib/formatters";

interface LoanProductStat {
  name: string;
  count: number;
  volume: number;
  percentage: number;
  color: string;
  textColor: string;
  badgeBg: string;
}

const productStats: LoanProductStat[] = [
  { name: "Personal Loan", count: 412, volume: 164800000, percentage: 28, color: "bg-blue-500", textColor: "text-blue-600", badgeBg: "bg-blue-50 text-blue-700" },
  { name: "Mortgage Loan", count: 185, volume: 148000000, percentage: 25, color: "bg-indigo-500", textColor: "text-indigo-600", badgeBg: "bg-indigo-50 text-indigo-700" },
  { name: "Home Loan", count: 142, volume: 113600000, percentage: 19, color: "bg-emerald-500", textColor: "text-emerald-600", badgeBg: "bg-emerald-50 text-emerald-700" },
  { name: "Business Loan", count: 96, volume: 76800000, percentage: 13, color: "bg-purple-500", textColor: "text-purple-600", badgeBg: "bg-purple-50 text-purple-700" },
  { name: "Car Loan", count: 64, volume: 38400000, percentage: 7, color: "bg-amber-500", textColor: "text-amber-600", badgeBg: "bg-amber-50 text-amber-700" },
  { name: "Education Loan", count: 38, volume: 22800000, percentage: 4, color: "bg-rose-500", textColor: "text-rose-600", badgeBg: "bg-rose-50 text-rose-700" },
  { name: "Gold Loan", count: 28, volume: 14600000, percentage: 4, color: "bg-yellow-500", textColor: "text-yellow-600", badgeBg: "bg-yellow-50 text-yellow-700" },
];

export const LoanAnalytics: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Loan Portfolio Distribution
            </h3>
            <p className="text-xs text-slate-500">Active loans breakdown across 7 product categories</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
            965 Active Loans
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 my-4 shadow-inner">
          {productStats.map((prod) => (
            <div
              key={prod.name}
              className={`${prod.color} transition-all duration-500`}
              style={{ width: `${prod.percentage}%` }}
              title={`${prod.name}: ${prod.percentage}% (${formatCurrency(prod.volume)})`}
            />
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-2.5 mt-2 max-h-64 overflow-y-auto pr-1">
        {productStats.map((prod) => (
          <div
            key={prod.name}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-3 h-3 rounded-full ${prod.color}`} />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{prod.name}</span>
              <span className="text-[11px] text-slate-400">({prod.count} loans)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(prod.volume)}
              </span>
              <span className="w-10 text-right font-semibold text-slate-500">
                {prod.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-4 flex items-center justify-between text-xs">
        <span className="text-slate-500">Total Portfolio Value</span>
        <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
          {formatCurrency(579000000)}
        </span>
      </div>
    </div>
  );
};
