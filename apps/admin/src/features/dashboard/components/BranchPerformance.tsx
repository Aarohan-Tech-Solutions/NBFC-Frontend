import React from "react";
import { formatCurrency } from "../../../lib/formatters";
import { Badge } from "@nbfc/ui";

interface BranchData {
  id: string;
  rank: number;
  branchName: string;
  area: string;
  manager: string;
  disbursed: number;
  target: number;
  activeDSAs: number;
  conversionRate: number;
}

const branches: BranchData[] = [
  { id: "1", rank: 1, branchName: "Kolkata Central", area: "West Bengal East", manager: "Subhashis Roy", disbursed: 34500000, target: 30000000, activeDSAs: 42, conversionRate: 74 },
  { id: "2", rank: 2, branchName: "Mumbai Nariman Point", area: "Maharashtra South", manager: "Priya Deshmukh", disbursed: 31200000, target: 28000000, activeDSAs: 38, conversionRate: 71 },
  { id: "3", rank: 3, branchName: "Delhi Connaught Place", area: "Delhi NCR North", manager: "Rakesh Verma", disbursed: 27800000, target: 26000000, activeDSAs: 35, conversionRate: 68 },
  { id: "4", rank: 4, branchName: "Bengaluru Koramangala", area: "Karnataka Central", manager: "Anand Murthy", disbursed: 24500000, target: 25000000, activeDSAs: 29, conversionRate: 65 },
  { id: "5", rank: 5, branchName: "Hyderabad Hitech City", area: "Telangana West", manager: "Suresh Reddy", disbursed: 19800000, target: 22000000, activeDSAs: 24, conversionRate: 62 },
];

export const BranchPerformance: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            Branch Performance Leaderboard
          </h3>
          <p className="text-xs text-slate-500">Branch-wise target vs achievement and sourcing efficiency</p>
        </div>
        <Badge variant="info" className="text-xs font-semibold">
          Top 5 Operating Branches
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="pb-3 px-3">#</th>
              <th className="pb-3 px-3">Branch & Area</th>
              <th className="pb-3 px-3">Branch Manager</th>
              <th className="pb-3 px-3">Active DSAs</th>
              <th className="pb-3 px-3">Disbursed Volume</th>
              <th className="pb-3 px-3">Target Progress</th>
              <th className="pb-3 px-3 text-right">Conversion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {branches.map((b) => {
              const achievementPct = Math.round((b.disbursed / b.target) * 100);
              const isAboveTarget = achievementPct >= 100;

              return (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                        b.rank === 1
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                          : b.rank === 2
                          ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          : b.rank === 3
                          ? "bg-amber-800/10 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {b.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{b.branchName}</div>
                    <div className="text-[11px] text-slate-400">{b.area}</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {b.manager}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{b.activeDSAs}</span>
                    <span className="text-slate-400 ml-1">partners</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {formatCurrency(b.disbursed)}
                    </div>
                    <div className="text-[10px] text-slate-400">Target: {formatCurrency(b.target)}</div>
                  </td>
                  <td className="py-3.5 px-3 w-44">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className={isAboveTarget ? "text-emerald-600 font-bold" : "text-slate-600 font-semibold"}>
                        {achievementPct}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {isAboveTarget ? "Target Exceeded" : "In Progress"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isAboveTarget ? "bg-emerald-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${Math.min(achievementPct, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Badge variant={b.conversionRate >= 70 ? "success" : "info"}>
                      {b.conversionRate}%
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
