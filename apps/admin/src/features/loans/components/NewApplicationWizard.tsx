import React, { useState } from "react";
import { Modal, Button, Input, Select } from "@nbfc/ui";
import { LoanType, LoanStatus, getRequiredDocuments } from "@nbfc/shared-types";
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
    loanType: LoanType.MORTGAGE,
    amount: 4500000,
    tenureMonths: 240,
    interestRate: 8.65,
    purpose: "Purchase / Mortgage against residential property in Kolkata",
    monthlyIncome: 145000,
    employmentType: "salaried" as "salaried" | "self_employed",
    employer: "Tata Consultancy Services",
    collateralType: "Residential Flat / Land",
    propertyValue: 6500000,
    propertyAddress: "Flat 4B, South City Towers, Kolkata 700068",
    coApplicantName: "Sunita Kapoor",
    coApplicantRelationship: "Spouse & Co-Owner (Applicant C/O Applicant)",
    coApplicantPhone: "+91 98300 55443",
    coApplicantPan: "ABCPS1234D",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const dynamicChecklist = getRequiredDocuments(formData.loanType, {
    employmentType: formData.employmentType,
    hasCoApplicant: Boolean(formData.coApplicantName),
  });

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
      coApplicantName: formData.coApplicantName,
      coApplicantRelationship: formData.coApplicantRelationship,
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
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s === step
                    ? "bg-blue-600 text-white ring-2 ring-blue-400/30"
                    : s < step
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {step === 1 && "Borrower Info"}
            {step === 2 && "Loan Product & Terms"}
            {step === 3 && "Income & Employment"}
            {step === 4 && "Collateral & Co-Applicant (C/O)"}
            {step === 5 && "Document Checklist"}
          </span>
        </div>

        {/* Step 1: Borrower Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 1: Primary Applicant Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Borrower Full Name"
                placeholder="e.g. Rahul Kapoor"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
              <Input
                label="Mobile Phone (OTP Verified)"
                placeholder="+91 99887 76655"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email ID"
                type="email"
                placeholder="applicant@gmail.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              />
              <Select
                label="Sourcing Channel"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                options={[
                  { label: "DSA Channel Partner", value: "DSA" },
                  { label: "Connector Referral", value: "Connector" },
                  { label: "Direct Branch Walk-In", value: "Direct" },
                ]}
              />
            </div>

            {formData.channel === "DSA" && (
              <Select
                label="Select Sourcing DSA Agency"
                value={formData.dsaName}
                onChange={(e) => setFormData({ ...formData, dsaName: e.target.value })}
                options={[
                  { label: "Apex Financial Solutions (DSA-1042)", value: "Apex Financial Solutions (DSA-1042)" },
                  { label: "Eastern Capital Partners (DSA-1120)", value: "Eastern Capital Partners (DSA-1120)" },
                  { label: "Star Loans Consultancy (DSA-1098)", value: "Star Loans Consultancy (DSA-1098)" },
                ]}
              />
            )}
          </div>
        )}

        {/* Step 2: Loan Product & Terms */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 2: Loan Product Configuration
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
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                options={[
                  { label: "Salaried", value: "salaried" },
                  { label: "Self-Employed / Business Owner", value: "self_employed" },
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

        {/* Step 4: Collateral / Asset & Co-Applicant */}
        {step === 4 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 4: Security Collateral & Co-Applicant (C/O Details)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Collateral / Property Description"
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

            {/* Co-Applicant Relationship Box */}
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800 space-y-3">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200 block uppercase">
                Co-Applicant Relationship (Applicant C/O Applicant)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Co-Applicant / Guardian Name"
                  placeholder="e.g. Sunita Kapoor (C/O Rahul Kapoor)"
                  value={formData.coApplicantName}
                  onChange={(e) => setFormData({ ...formData, coApplicantName: e.target.value })}
                />
                <Input
                  label="Relationship to Borrower"
                  placeholder="e.g. Spouse & Co-Owner / Father C/O"
                  value={formData.coApplicantRelationship}
                  onChange={(e) => setFormData({ ...formData, coApplicantRelationship: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Document Checklist & Final Review */}
        {step === 5 && (
          <div className="space-y-4 text-xs">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step 5: Dynamic Document Checklist ({formData.loanType.toUpperCase()})
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
              {formData.coApplicantName && (
                <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold pt-1">
                  Co-Applicant: {formData.coApplicantName} ({formData.coApplicantRelationship})
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Required Document Records ({dynamicChecklist.filter((d) => d.isMandatory).length} Mandatory):
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar border border-slate-200 dark:border-slate-800 p-2 rounded-xl">
                {dynamicChecklist.map((doc) => (
                  <label key={doc.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg">
                    <input type="checkbox" defaultChecked={doc.isMandatory} className="w-4 h-4 text-blue-600 rounded" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">{doc.title}</span>
                    {doc.isMandatory && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold ml-auto">
                        Required
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {step > 1 ? (
            <Button type="button" variant="outline" size="sm" onClick={prevStep}>
              &larr; Previous Step
            </Button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <Button type="button" size="sm" onClick={nextStep}>
              Next Step &rarr;
            </Button>
          ) : (
            <Button type="submit" size="sm">
              Submit Loan Application
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default NewApplicationWizard;
