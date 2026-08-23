import React from "react";
import { Badge } from "@nbfc/ui";

export const ApplicationStatusFeature: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
      <div className="flex justify-between items-center border-b pb-4 border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Application #LA-2026-9041</h2>
          <p className="text-xs text-slate-500">Personal Loan • Applied on 12 Aug 2026</p>
        </div>
        <Badge variant="warning">Under Review</Badge>
      </div>

      <div className="space-y-6">
        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Live Status Tracker</h4>
        <div className="space-y-4 text-xs border-l-2 border-blue-500 ml-3 pl-4">
          <div>
            <div className="font-bold text-emerald-600">✓ Application Submitted</div>
            <div className="text-slate-400">Received successfully</div>
          </div>
          <div>
            <div className="font-bold text-emerald-600">✓ Document Verification Passed</div>
            <div className="text-slate-400">KYC & Income verified</div>
          </div>
          <div>
            <div className="font-bold text-blue-600">&bull; Underwriting & Risk Review</div>
            <div className="text-slate-400">Currently being reviewed by credit committee</div>
          </div>
          <div>
            <div className="font-bold text-slate-400">&bull; Sanction Letter Generation</div>
            <div className="text-slate-400">Pending approval</div>
          </div>
          <div>
            <div className="font-bold text-slate-400">&bull; Bank Account Disbursement</div>
            <div className="text-slate-400">Pending sanction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusFeature;
