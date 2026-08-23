import React from "react";
import { Input } from "@nbfc/ui";

export const PersonalLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Personal Loan Details</h3>
      <Input label="Loan Amount Needed (₹)" placeholder="e.g. 500000" />
      <Input label="Tenure (Months)" placeholder="e.g. 36" />
      <Input label="Monthly Net Salary (₹)" placeholder="e.g. 75000" />
    </div>
  );
};
