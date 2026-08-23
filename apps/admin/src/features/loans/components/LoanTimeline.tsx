import React from "react";

export const LoanTimeline: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Application Progress Timeline</h4>
      <div className="border-l-2 border-slate-200 dark:border-slate-700 ml-2 pl-4 space-y-4 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100">Application Submitted</span>
          <span className="text-slate-400 block">12 Aug 2026, 10:30 AM</span>
        </div>
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100">KYC Verification Completed</span>
          <span className="text-slate-400 block">13 Aug 2026, 02:15 PM</span>
        </div>
        <div>
          <span className="font-bold text-blue-600">Under Review by Credit Officer</span>
          <span className="text-slate-400 block">In Progress</span>
        </div>
      </div>
    </div>
  );
};
