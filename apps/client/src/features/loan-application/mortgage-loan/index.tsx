import React from "react";
import { Input, Select } from "@nbfc/ui";

export const MortgageLoanFlow: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Mortgage Loan / LAP Property Details</h3>
        <p className="text-xs text-slate-500">Loan against residential or commercial real estate collateral.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Estimated Property Fair Valuation (₹)" placeholder="e.g. 2,00,00,000" required />
        <Input label="Required Loan Amount (₹)" placeholder="e.g. 1,00,00,000" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Property Type"
          options={[
            { label: "Residential Self-Occupied", value: "residential" },
            { label: "Commercial Office / Shop", value: "commercial" },
            { label: "Industrial Plot / Factory", value: "industrial" },
            { label: "Vacant Freehold Land", value: "land" },
          ]}
        />
        <Input label="Municipality / Panchayat Jurisdiction" placeholder="e.g. Kolkata Municipal Corp" required />
      </div>

      {/* Co-Applicant / Guardian Section (Per Client Requirement: Applicant C/O Applicant) */}
      <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider">
            Co-Applicant / Guardian Relationship (Applicant C/O Applicant)
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-200/70 text-blue-900 dark:bg-blue-900 dark:text-blue-200">
            Mandatory for Mortgage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Co-Applicant / Guardian Full Name"
            placeholder="e.g. Sunita Kapoor (C/O Rahul Kapoor)"
            required
          />
          <Select
            label="Relationship with Primary Applicant"
            options={[
              { label: "Spouse (Husband / Wife)", value: "spouse" },
              { label: "Father (Applicant C/O Father)", value: "father" },
              { label: "Mother", value: "mother" },
              { label: "Son / Daughter", value: "child" },
              { label: "Business Partner / Joint Owner", value: "partner" },
              { label: "Legal Guardian", value: "guardian" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Co-Applicant Contact Phone" placeholder="+91 98300 12345" required />
          <Input label="Co-Applicant PAN Card" placeholder="e.g. ABCPS1234D" required />
        </div>
      </div>
    </div>
  );
};

export default MortgageLoanFlow;
