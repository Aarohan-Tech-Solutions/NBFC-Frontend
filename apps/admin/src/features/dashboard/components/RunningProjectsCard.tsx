import React from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const RunningProjectsCard: React.FC = () => {
  const projects = [
    { name: "Database configuration", pct: 82, color: "#00d2b4" },
    { name: "Design iOS app", pct: 64, color: "#2563eb" },
    { name: "Internet configuration", pct: 45, color: "#f59e0b" },
    { name: "Angular Admin", pct: 90, color: "#10b981" },
    { name: "Web Solution", pct: 73, color: "#8b5cf6" },
  ];

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Running Project</h3>
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

      {/* Yearly Income Banner */}
      <div className="my-4">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Yearly Income
        </span>
        <span className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white block mt-0.5 tracking-tight">
          $8,945,200
        </span>
      </div>

      {/* Progress Rows */}
      <div className="space-y-4 pt-1 flex-1 flex flex-col justify-around">
        {projects.map((proj) => (
          <div key={proj.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-200">{proj.name}</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{proj.pct}%</span>
            </div>
            {/* Thin Horizontal Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#222532] rounded-full overflow-hidden">
              <div
                style={{
                  width: `${proj.pct}%`,
                  backgroundColor: proj.color,
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
