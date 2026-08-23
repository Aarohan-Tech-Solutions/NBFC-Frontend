import React from "react";
import { Input } from "@nbfc/ui";

export const GoldLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Gold Loan Details</h3>
      <Input label="Approximate Gold Weight in Grams" placeholder="e.g. 50" />
      <Input label="Gold Purity (Karat)" placeholder="e.g. 22K" />
    </div>
  );
};
