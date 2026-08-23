import React, { useState } from "react";
import { Drawer, Badge, Button, Tabs } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";
import { LoanType, LoanStatus } from "@nbfc/shared-types";
import { exportToPDF } from "../../../lib/exportUtils";

export interface LoanApplicationItem {
  id: string;
  applicationNo: string;
  customerName: string;
  customerPhone: string;
  branch: string;
  loanType: LoanType;
  amount: number;
  tenureMonths: number;
  interestRate: number;
  status: LoanStatus;
  channel: string;
  dsaName: string;
  monthlyIncome: number;
  createdAt: string;
}

interface LoanDetailPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  loan?: LoanApplicationItem | null;
  onUpdateStatus?: (id: string, newStatus: LoanStatus) => void;
}

export const LoanDetailPanel: React.FC<LoanDetailPanelProps> = ({
  isOpen = true,
  onClose = () => {},
  loan,
  onUpdateStatus = () => {},
}) => {
  const [subTab, setSubTab] = useState("overview");

  // Fallback demo loan if previewing standalone
  const activeLoan: LoanApplicationItem = loan || {
    id: "demo-1",
    applicationNo: "LA-9485",
    customerName: "Rahul Kapoor",
    customerPhone: "+91 99887 76655",
    branch: "Kolkata Central",
    loanType: LoanType.HOME,
    amount: 4500000,
    tenureMonths: 240,
    interestRate: 8.65,
    status: LoanStatus.APPROVED,
    channel: "DSA",
    dsaName: "Apex Financial Solutions (DSA-1042)",
    monthlyIncome: 145000,
    createdAt: "12 Aug 2026",
  };

  const tabs = [
    { id: "overview", label: "Application Summary" },
    { id: "underwriting", label: "Credit & Underwriting" },
    { id: "verification", label: "Verification Checks" },
    { id: "sanction", label: "Sanction Letter" },
  ];

  const estimatedEmi = Math.round(
    (activeLoan.amount * (activeLoan.interestRate / 1200) * Math.pow(1 + activeLoan.interestRate / 1200, activeLoan.tenureMonths)) /
      (Math.pow(1 + activeLoan.interestRate / 1200, activeLoan.tenureMonths) - 1)
  );

  const handleDownloadSanction = () => {
    exportToPDF(
      `Sanction_Letter_${activeLoan.applicationNo}`,
      `SANCTION LETTER - ${activeLoan.applicationNo}`,
      ["Parameter", "Sanctioned Details"],
      [
        ["Borrower Name", activeLoan.customerName],
        ["Loan Account Number", activeLoan.applicationNo],
        ["Sanctioned Amount", formatCurrency(activeLoan.amount)],
        ["Loan Product Scheme", activeLoan.loanType.toUpperCase()],
        ["Rate of Interest", `${activeLoan.interestRate}% p.a. (Floating)`],
        ["Repayment Tenure", `${activeLoan.tenureMonths} Months (${activeLoan.tenureMonths / 12} Years)`],
        ["Estimated Monthly EMI", formatCurrency(estimatedEmi)],
        ["Processing Fee (1%)", formatCurrency(activeLoan.amount * 0.01)],
        ["Sanction Date", new Date().toLocaleDateString("en-IN")],
        ["Originating Branch", activeLoan.branch],
        ["Sanctioning Authority", "Arohon Capital Credit Committee"],
      ]
    );
  };

  const renderContent = () => (
    <div className="space-y-5">
      <Tabs tabs={tabs} activeTab={subTab} onChange={setSubTab} />

      {/* Overview */}
      {subTab === "overview" && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-blue-600 text-sm">{activeLoan.applicationNo}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{activeLoan.customerName}</h3>
                <p className="text-xs text-slate-500">{activeLoan.customerPhone} • {activeLoan.branch}</p>
              </div>
              <Badge
                variant={
                  activeLoan.status === LoanStatus.APPROVED || activeLoan.status === LoanStatus.DISBURSED
                    ? "success"
                    : activeLoan.status === LoanStatus.REJECTED
                    ? "danger"
                    : "warning"
                }
                className="text-xs uppercase"
              >
                {activeLoan.status.replace("_", " ")}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div>
                <span className="text-slate-400">Loan Product</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 uppercase">{activeLoan.loanType}</p>
              </div>
              <div>
                <span className="text-slate-400">Requested Amount</span>
                <p className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(activeLoan.amount)}</p>
              </div>
              <div>
                <span className="text-slate-400">Interest Rate</span>
                <p className="font-bold text-slate-900 dark:text-slate-100">{activeLoan.interestRate}% p.a.</p>
              </div>
              <div>
                <span className="text-slate-400">Tenure</span>
                <p className="font-bold text-slate-900 dark:text-slate-100">{activeLoan.tenureMonths} Mos</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Calculated EMI</span>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{formatCurrency(estimatedEmi)}/mo</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Borrower Income</span>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{formatCurrency(activeLoan.monthlyIncome)}/mo</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Sourcing Partner</span>
              <p className="text-xs font-bold text-blue-600 truncate mt-1">{activeLoan.dsaName}</p>
            </div>
          </div>

          {/* Decision Action Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Underwriter Decisions:</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-rose-600 hover:bg-rose-50"
                onClick={() => onUpdateStatus(activeLoan.id, LoanStatus.REJECTED)}
              >
                Reject Application
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-amber-600 hover:bg-amber-50"
                onClick={() => onUpdateStatus(activeLoan.id, LoanStatus.UNDER_REVIEW)}
              >
                Move to Under Review
              </Button>
              <Button
                size="sm"
                onClick={() => onUpdateStatus(activeLoan.id, LoanStatus.APPROVED)}
              >
                Approve & Sanction
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Underwriting */}
      {subTab === "underwriting" && (
        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Automated Risk Scoring & Bureau Insights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400">CIBIL Bureau Score</span>
                <p className="font-bold text-emerald-600 text-sm mt-0.5">782 (Low Risk)</p>
              </div>
              <div>
                <span className="text-slate-400">FOIR (Debt-to-Income)</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">38.5% (Within 50% Cap)</p>
              </div>
              <div>
                <span className="text-slate-400">LTV (Loan-to-Value)</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">69.2% (Within 75% Cap)</p>
              </div>
              <div>
                <span className="text-slate-400">Cheque Bounces (12M)</span>
                <p className="font-bold text-emerald-600 text-sm mt-0.5">0 Zero Bounces</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification */}
      {subTab === "verification" && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Verification Queue Milestones
          </h4>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
            {[
              { check: "Applicant Identity & Biometric KYC", officer: "NSDL API Gateway", status: "Verified" },
              { check: "Bank Statement & Banking Average Balance", officer: "Credit Analyst A", status: "Verified" },
              { check: "Field Residence & Office Physical Inspection", officer: "Field Officer B", status: "Verified" },
              { check: "Property Legal Search & Title Clear Search", officer: "Advocate P. Sharma", status: "Verified" },
              { check: "Property Technical Valuation Report", officer: "Valuer M. Kulkarni", status: "Verified" },
            ].map((v, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{v.check}</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">Evaluator: {v.officer}</div>
                </div>
                <Badge variant="success" className="text-[10px]">{v.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sanction Letter */}
      {subTab === "sanction" && (
        <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Official Loan Sanction Letter</h4>
              <p className="text-xs text-slate-500">Formally authorized by Arohon Capital Credit Committee</p>
            </div>
            <Button size="sm" onClick={handleDownloadSanction}>
              Download PDF Sanction Letter
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-2 font-mono">
            <div>REF: AROHON/SANCTION/2026/{activeLoan.applicationNo}</div>
            <div>DATE: {new Date().toLocaleDateString("en-IN")}</div>
            <div className="font-bold pt-1">TO: {activeLoan.customerName.toUpperCase()}</div>
            <p className="font-sans text-slate-600 dark:text-slate-300 pt-2 leading-relaxed">
              We are pleased to inform you that your application for a <strong>{activeLoan.loanType.toUpperCase()}</strong> has been approved for a principal sum of <strong>{formatCurrency(activeLoan.amount)}</strong> at an interest rate of <strong>{activeLoan.interestRate}% p.a.</strong> for a tenure of <strong>{activeLoan.tenureMonths} Months</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (loan) {
    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title={`Loan Application ${activeLoan.applicationNo}`}
        description={`Customer: ${activeLoan.customerName} • ${activeLoan.branch}`}
        size="lg"
      >
        {renderContent()}
      </Drawer>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
        Application Detail Panel (Live Preview)
      </h3>
      {renderContent()}
    </div>
  );
};
