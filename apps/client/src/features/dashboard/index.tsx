import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "@nbfc/ui";

export const ClientDashboardFeature: React.FC = () => {
  const loanTypes = [
    { title: "Personal Loan", rate: "10.5% p.a.", max: "Up to ₹25 Lakhs", path: "/apply/personal-loan" },
    { title: "Home Loan", rate: "8.4% p.a.", max: "Up to ₹5 Crores", path: "/apply/home-loan" },
    { title: "Business Loan", rate: "12.0% p.a.", max: "Up to ₹1 Crore", path: "/apply/business-loan" },
    { title: "Mortgage Loan (LAP)", rate: "9.5% p.a.", max: "Up to ₹3 Crores", path: "/apply/mortgage-loan" },
    { title: "Car Loan", rate: "8.9% p.a.", max: "Up to ₹50 Lakhs", path: "/apply/car-loan" },
    { title: "Education Loan", rate: "9.0% p.a.", max: "Up to ₹75 Lakhs", path: "/apply/education-loan" },
    { title: "Gold Loan", rate: "7.5% p.a.", max: "Up to ₹25 Lakhs", path: "/apply/gold-loan" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <Badge variant="info" className="bg-blue-500/20 text-blue-200 border border-blue-400/30">
            Instant Digital Approval
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            All Loan Needs, Simplified in One Portal.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Get instant eligibility quotes, upload KYC documents securely, and track your disbursement live.
          </p>
        </div>
      </div>

      {/* Loan Products Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Select Loan Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanTypes.map((loan, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{loan.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Starting from <span className="text-blue-600 font-semibold">{loan.rate}</span></p>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2">{loan.max}</p>
              </div>
              <Link to={loan.path} className="mt-6">
                <Button variant="outline" className="w-full">Apply Now &rarr;</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardFeature;
