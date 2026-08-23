import React from "react";
import { Input } from "@nbfc/ui";

export const HomeLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Home Loan Details</h3>
      <Input label="Property Market Value (₹)" placeholder="e.g. 7500000" />
      <Input label="Loan Amount Required (₹)" placeholder="e.g. 5000000" />
      <Input label="Property Location / City" placeholder="e.g. Thane, Maharashtra" />
    </div>
  );
};
