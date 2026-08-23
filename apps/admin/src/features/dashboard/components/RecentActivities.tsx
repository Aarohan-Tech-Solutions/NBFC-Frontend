import React from "react";
import { Badge } from "@nbfc/ui";

interface Activity {
  id: string;
  type: "loan" | "kyc" | "disbursement" | "dsa" | "security";
  title: string;
  description: string;
  user: string;
  time: string;
  statusVariant: "success" | "warning" | "info" | "danger";
  statusText: string;
}

const activities: Activity[] = [
  { id: "1", type: "disbursement", title: "Loan Disbursed - LA-9482", description: "₹ 15,00,000 transferred to Ramesh Sharma (Business Loan)", user: "Disbursal Officer / Finance", time: "10 mins ago", statusVariant: "success", statusText: "Disbursed" },
  { id: "2", type: "kyc", title: "KYC Verified - Aadhaar & PAN", description: "Customer Anita Roy identity documents validated via NSDL API", user: "Credit Analyst A", time: "24 mins ago", statusVariant: "info", statusText: "Verified" },
  { id: "3", type: "loan", title: "Sanction Letter Issued - LA-9485", description: "Home loan ₹ 45,00,000 sanctioned with 8.65% ROI", user: "Branch Manager (Kolkata Central)", time: "42 mins ago", statusVariant: "success", statusText: "Sanctioned" },
  { id: "4", type: "dsa", title: "New DSA Partner Onboarded", description: "Venture FinServ registered under Area: Maharashtra South", user: "Area Manager", time: "1 hr ago", statusVariant: "info", statusText: "Onboarded" },
  { id: "5", type: "security", title: "High Value Loan Under Review", description: "Mortgage loan application ₹ 1,20,00,000 flagged for Super Admin signoff", user: "System Risk Engine", time: "2 hrs ago", statusVariant: "warning", statusText: "Action Required" },
  { id: "6", type: "loan", title: "Application Rejected - LA-9471", description: "Low CIBIL score (580) and active default in external bureau", user: "Automated Credit Engine", time: "3 hrs ago", statusVariant: "danger", statusText: "Rejected" },
];

export const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Real-Time Audit & Activity Feed
          </h3>
          <p className="text-xs text-slate-500">System-wide operational actions, underwriting events, and partner updates</p>
        </div>
        <Badge variant="neutral" className="text-xs">Live Feed</Badge>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {activities.map((act) => (
          <div key={act.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{act.title}</h4>
                  <Badge variant={act.statusVariant} className="text-[10px]">
                    {act.statusText}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{act.description}</p>
                <div className="text-[10px] text-slate-400 mt-1">
                  By <span className="font-semibold text-slate-500">{act.user}</span> • {act.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
