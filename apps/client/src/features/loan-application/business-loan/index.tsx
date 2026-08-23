import React from "react";
import { Input } from "@nbfc/ui";

export const BusinessLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Business Loan Details</h3>
      <Input label="Company / Entity Name" placeholder="e.g. Acme Enterprises Pvt Ltd" />
      <Input label="Annual Business Turnover (₹)" placeholder="e.g. 15000000" />
      <Input label="GSTIN" placeholder="27ABCDE1234F1Z5" />
    </div>
  );
};
