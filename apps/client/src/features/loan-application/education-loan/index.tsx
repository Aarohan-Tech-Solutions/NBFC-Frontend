import React from "react";
import { Input } from "@nbfc/ui";

export const EducationLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Education Loan Details</h3>
      <Input label="University / Institute Name" placeholder="e.g. University of Manchester" />
      <Input label="Course Name" placeholder="e.g. M.Sc Data Science" />
      <Input label="Total Tuition Fee & Living Expenses (₹)" placeholder="e.g. 3500000" />
    </div>
  );
};
