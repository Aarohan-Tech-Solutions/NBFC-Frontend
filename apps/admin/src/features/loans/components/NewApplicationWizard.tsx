import React, { useState } from "react";
import { Modal, Button, Input, Select } from "@nbfc/ui";
import { LoanType, LoanStatus } from "@nbfc/shared-types";
import { formatCurrency } from "../../../lib/formatters";

interface NewApplicationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (loan: any) => void;
}

export const NewApplicationWizard: React.FC<NewApplicationWizardProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "+91 99887 76655",
    customerEmail: "applicant@gmail.com",
    channel: "DSA",
    dsaName: "Apex Financial Solutions (DSA-1042)",
    branch: "Kolkata Central",
    loanType: LoanType.HOME,
    amount: 4500000,
    tenureMonths: 240,
    interestRate: 8.65,
    purpose: "Purchase of 3BHK residential apartment in Kolkata",
    monthlyIncome: 145000,
    employmentType: "Salaried",
    employer: "Tata Consultancy Services",
    collateralType: "Residential Flat",
    propertyValue: 6500000,
    propertyAddress: "Flat 4B, South City Towers, Kolkata 700068",
    documentsChecked: {
      aadhaar: true,
      pan: true,
      bankStmt: true,
      salarySlips: true,
      propertyRegistry: true,
    },
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp = {
      id: String(Date.now()),
      applicationNo: `LA-${Math.floor(9490 + Math.random() * 50)}`,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      branch: formData.branch,
      loanType: formData.loanType,
      amount: Number(formData.amount),
      tenureMonths: Number(formData.tenureMonths),
      interestRate: Number(formData.interestRate),
      status: LoanStatus.SUBMITTED,
      channel: formData.channel,
      dsaName: formData.channel === "DSA" ? formData.dsaName : "Direct / Staff",
      monthlyIncome: Number(formData.monthlyIncome),
      createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    onSubmit(newApp);
    setStep(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setStep(1);
        onClose();
      }}
      title={`Create Loan Application (Step ${step} of 5)`}
      className="max-w-2xl"
    >
      {/* Wizard Step Indicator */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-3 text-xs">
        {["Customer", "Loan Terms", "Income", "Collateral", "Review"].map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;

          return (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : isDone
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {isDone ? "✓" : stepNum}
              </span>
              <span className={`hidden sm:inline font-semibold ${isActive ? "text-blue-600" : isDone ? "text-emerald-600" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Customer & Sourcing */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 1: Borrower & Sourcing Channel Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Borrower Full Name"
                placeholder="e.g. Ramesh Chandra"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
              <Input
                label="Mobile Phone"
                placeholder="+91 98765 43210"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Sourcing Channel"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                options={[
                  { label: "DSA Partner", value: "DSA" },
                  { label: "Connector Referral", value: "Connector" },
                  { label: "Direct Branch Walk-in", value: "Direct" },
                  { label: "Website Digital Lead", value: "Website" },
                ]}
              />
              <Select
                label="Select DSA Partner"
                value={formData.dsaName}
                onChange={(e) => setFormData({ ...formData, dsaName: e.target.value })}
                options={[
                  { label: "Apex Financial Solutions", value: "Apex Financial Solutions (DSA-1042)" },
                  { label: "Star Loans Consultancy", value: "Star Loans Consultancy (DSA-1098)" },
                  { label: "Eastern Capital Partners", value: "Eastern Capital Partners (DSA-1120)" },
                ]}
              />
              <Select
                label="Processing Branch"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                options={[
                  { label: "Kolkata Central", value: "Kolkata Central" },
                  { label: "Mumbai Nariman Point", value: "Mumbai Nariman Point" },
                  { label: "Delhi Connaught Place", value: "Delhi Connaught Place" },
                  { label: "Bengaluru Koramangala", value: "Bengaluru Koramangala" },
                ]}
              />
            </div>
          </div>
        )}

        {/* Step 2: Loan Product & Terms */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 2: Loan Product, Scheme & Requested Terms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Loan Product Type"
                value={formData.loanType}
                onChange={(e) => setFormData({ ...formData, loanType: e.target.value as LoanType })}
                options={[
                  { label: "Personal Loan", value: LoanType.PERSONAL },
                  { label: "Mortgage Loan (LAP)", value: LoanType.MORTGAGE },
                  { label: "Home Loan", value: LoanType.HOME },
                  { label: "Business Loan", value: LoanType.BUSINESS },
                  { label: "Car Loan", value: LoanType.CAR },
                  { label: "Education Loan", value: LoanType.EDUCATION },
                  { label: "Gold Loan", value: LoanType.GOLD },
                ]}
              />
              <Input
                label="Requested Loan Amount (₹)"
                type="number"
                value={String(formData.amount)}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tenure (Months)"
                type="number"
                value={String(formData.tenureMonths)}
                onChange={(e) => setFormData({ ...formData, tenureMonths: Number(e.target.value) })}
                required
              />
              <Input
                label="Rate of Interest (% p.a.)"
                type="number"
                step="0.05"
                value={String(formData.interestRate)}
                onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                required
              />
            </div>

            <Input
              label="Loan Purpose / End Use"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            />
          </div>
        )}

        {/* Step 3: Income & Employment */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 3: Income Assessment & Financial Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Employment Type"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                options={[
                  { label: "Salaried", value: "Salaried" },
                  { label: "Self-Employed Professional", value: "Self-Employed Professional" },
                  { label: "Business Owner / Enterprise", value: "Business Owner" },
                ]}
              />
              <Input
                label="Employer / Business Name"
                value={formData.employer}
                onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                required
              />
            </div>

            <Input
              label="Monthly Net Take-Home Income (₹)"
              type="number"
              value={String(formData.monthlyIncome)}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              required
            />
          </div>
        )}

        {/* Step 4: Collateral / Asset (if secured) */}
        {step === 4 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 4: Security / Collateral & Valuation Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Collateral / Asset Description"
                placeholder="e.g. 3BHK Residential Flat"
                value={formData.collateralType}
                onChange={(e) => setFormData({ ...formData, collateralType: e.target.value })}
              />
              <Input
                label="Estimated Market Valuation (₹)"
                type="number"
                value={String(formData.propertyValue)}
                onChange={(e) => setFormData({ ...formData, propertyValue: Number(e.target.value) })}
              />
            </div>

            <Input
              label="Property / Asset Location Address"
              value={formData.propertyAddress}
              onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
            />
          </div>
        )}

        {/* Step 5: Document Checklist & Final Review */}
        {step === 5 && (
          <div className="space-y-4 text-xs">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 5: Document Verification Checklist & Application Summary
            </h4>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                <span>{formData.customerName || "Applicant"}</span>
                <span className="text-blue-600">{formatCurrency(formData.amount)} ({formData.loanType.toUpperCase()})</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-slate-500 pt-1">
                <div>Tenure: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.tenureMonths} mos</span></div>
                <div>ROI: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.interestRate}%</span></div>
                <div>Branch: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.branch}</span></div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Uploaded Mandatory Documents:</span>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span>Aadhaar Card (Identity)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span>PAN Card (Tax Identification)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span>6-Month Bank Statement</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                  <span>Salary Slips / ITR Forms</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              &larr; Back
            </Button>
          ) : (
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          )}

          {step < 5 ? (
            <Button
              type="button"
              onClick={() => {
                if (step === 1 && !formData.customerName) {
                  alert("Please enter customer name.");
                  return;
                }
                nextStep();
              }}
            >
              Continue to Step {step + 1} &rarr;
            </Button>
          ) : (
            <Button type="submit">
              Submit Loan Application
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};
