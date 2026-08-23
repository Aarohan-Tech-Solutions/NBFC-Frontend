import React from "react";
import { Badge } from "@nbfc/ui";

export interface ReviewSummaryProps {
  loanType: string;
  amount: string;
  tenure: string;
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({ loanType, amount, tenure }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Application Summary Review</h4>
        <Badge variant="info">{loanType}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block">Requested Amount</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{amount}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Tenure Requested</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tenure}</span>
        </div>
      </div>
    </div>
  );
};
