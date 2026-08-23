import React from "react";
import { Input } from "@nbfc/ui";

export const MortgageLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Mortgage Loan / LAP Details</h3>
      <Input label="Estimated Property Valuation (₹)" placeholder="e.g. 20000000" />
      <Input label="Required Loan Amount (₹)" placeholder="e.g. 10000000" />
    </div>
  );
};
