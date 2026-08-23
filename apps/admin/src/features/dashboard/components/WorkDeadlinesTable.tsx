import React from "react";
import { Maximize2, MoreHorizontal } from "lucide-react";

export const WorkDeadlinesTable: React.FC = () => {
  const deadlines = [
    { task: "Design task for App", date: "18 Aug 2026" },
    { task: "Angular login page", date: "20 Aug 2026" },
    { task: "React Video tools", date: "22 Aug 2026" },
    { task: "Figma Design", date: "24 Aug 2026" },
    { task: "Logo vector design", date: "25 Aug 2026" },
    { task: "iOs and Android App", date: "28 Aug 2026" },
    { task: "Login page figma design", date: "30 Aug 2026" },
  ];

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Work Deadlines</h3>
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

      {/* Full-width Table */}
      <div className="mt-4 flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs border border-slate-200 dark:border-[#252836] rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-[#13151c] text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[#252836]">
            <tr>
              <th className="py-2.5 px-3.5 border-r border-slate-200 dark:border-[#252836]">Task</th>
              <th className="py-2.5 px-3.5 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#252836]">
            {deadlines.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50 dark:hover:bg-[#1f222e] transition-colors"
              >
                <td className="py-2.5 px-3.5 font-medium text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-[#252836]">
                  {item.task}
                </td>
                <td className="py-2.5 px-3.5 text-right font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
