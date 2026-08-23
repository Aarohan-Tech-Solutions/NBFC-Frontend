import React from "react";
import { Input } from "@nbfc/ui";

export const CarLoanFlow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-slate-100">Car / Auto Loan Details</h3>
      <Input label="Vehicle Model & Make" placeholder="e.g. Tata Nexon EV" />
      <Input label="On-Road Price (₹)" placeholder="e.g. 1600000" />
    </div>
  );
};
