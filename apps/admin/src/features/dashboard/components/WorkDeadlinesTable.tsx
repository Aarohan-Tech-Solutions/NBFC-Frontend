import React from "react";
import { Maximize2, MoreHorizontal, Clock } from "lucide-react";
import { Badge } from "@nbfc/ui";

export const WorkDeadlinesTable: React.FC = () => {
  const deadlines = [
    { appNo: "LA-9485", task: "Property Legal Search & Title", applicant: "Rahul Kapoor", date: "Today 14:00", priority: "High" },
    { appNo: "LA-9486", task: "Salary Inflow & Banking Analysis", applicant: "Priya Sundaram", date: "Today 17:30", priority: "High" },
    { appNo: "LA-9487", task: "Business MSME & GST Verification", applicant: "Rajeshwar Patel", date: "Tomorrow 11:00", priority: "Medium" },
    { appNo: "LA-9488", task: "Co-Applicant C/O Net-Worth Check", applicant: "Meenakshi Sen", date: "25 Aug 2026", priority: "Normal" },
    { appNo: "LA-9489", task: "Dealer Proforma & RTO Hypothecation", applicant: "Arun Nair", date: "26 Aug 2026", priority: "Normal" },
  ];

  return (
    <div className="bg-white dark:bg-[#171922] border border-slate-200/80 dark:border-[#252836] rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#252836] pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Underwriting SLA Deadlines
          </h3>
          <span className="text-[10px] text-slate-400">Time-sensitive verification tasks</span>
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

      {/* Full-width Table */}
      <div className="mt-4 flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs border border-slate-200 dark:border-[#252836] rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-[#13151c] text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-[#252836]">
            <tr>
              <th className="py-2.5 px-3 border-r border-slate-200 dark:border-[#252836]">Application & Task</th>
              <th className="py-2.5 px-3 text-right">SLA Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#252836]">
            {deadlines.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50 dark:hover:bg-[#1f222e] transition-colors"
              >
                <td className="py-2.5 px-3 border-r border-slate-200 dark:border-[#252836]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                      {item.appNo}
                    </span>
                    <span className="text-[10px] text-slate-400">• {item.applicant}</span>
                  </div>
                  <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                    {item.task}
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{item.date}</span>
                  </div>
                  <Badge
                    variant={item.priority === "High" ? "danger" : item.priority === "Medium" ? "warning" : "neutral"}
                    className="text-[9px] mt-1"
                  >
                    {item.priority}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkDeadlinesTable;
