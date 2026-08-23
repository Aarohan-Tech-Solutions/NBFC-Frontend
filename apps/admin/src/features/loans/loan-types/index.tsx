import React, { useState } from "react";
import { Button, Badge, Modal, Input } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";
import { LoanType } from "@nbfc/shared-types";

interface LoanScheme {
  id: string;
  type: LoanType;
  title: string;
  minAmount: number;
  maxAmount: number;
  minRate: number;
  maxRate: number;
  maxTenureMonths: number;
  processingFeePct: number;
  securityType: "Unsecured" | "Secured";
  requiredDocs: string[];
}

const initialSchemes: LoanScheme[] = [
  { id: "1", type: LoanType.PERSONAL, title: "Personal Loan", minAmount: 50000, maxAmount: 1500000, minRate: 10.99, maxRate: 16.5, maxTenureMonths: 60, processingFeePct: 1.5, securityType: "Unsecured", requiredDocs: ["Aadhaar & PAN", "3-Month Salary Slips", "6-Month Bank Statement", "Employee ID"] },
  { id: "2", type: LoanType.MORTGAGE, title: "Mortgage Loan (LAP)", minAmount: 1000000, maxAmount: 50000000, minRate: 9.25, maxRate: 12.0, maxTenureMonths: 180, processingFeePct: 1.0, securityType: "Secured", requiredDocs: ["Property Title Deed", "Mutation Extract", "Property Tax Receipt", "Valuation Report", "ITR 3 Years"] },
  { id: "3", type: LoanType.HOME, title: "Home Loan", minAmount: 1000000, maxAmount: 75000000, minRate: 8.4, maxRate: 10.5, maxTenureMonths: 360, processingFeePct: 0.75, securityType: "Secured", requiredDocs: ["Builder Agreement / Sale Deed", "Approved Building Plan", "Aadhaar & PAN", "6-Month Bank Statement", "Form 16 / ITR"] },
  { id: "4", type: LoanType.BUSINESS, title: "Business Loan", minAmount: 500000, maxAmount: 20000000, minRate: 11.5, maxRate: 18.0, maxTenureMonths: 84, processingFeePct: 2.0, securityType: "Unsecured", requiredDocs: ["GST Returns 12M", "Audited Financials 2Y", "Trade License", "MSME Registration", "Current A/C Statement 12M"] },
  { id: "5", type: LoanType.CAR, title: "Car & Vehicle Loan", minAmount: 200000, maxAmount: 5000000, minRate: 8.75, maxRate: 11.5, maxTenureMonths: 84, processingFeePct: 1.0, securityType: "Secured", requiredDocs: ["Vehicle Proforma Invoice", "Driving Licence", "Aadhaar & PAN", "Bank Statement 6M"] },
  { id: "6", type: LoanType.EDUCATION, title: "Education Loan", minAmount: 300000, maxAmount: 8000000, minRate: 9.5, maxRate: 13.0, maxTenureMonths: 120, processingFeePct: 1.0, securityType: "Unsecured", requiredDocs: ["Admission Offer Letter", "Fee Structure Breakdown", "Co-borrower KYC & ITR", "Academic Marksheets"] },
  { id: "7", type: LoanType.GOLD, title: "Gold Loan", minAmount: 25000, maxAmount: 2500000, minRate: 8.5, maxRate: 12.0, maxTenureMonths: 24, processingFeePct: 0.5, securityType: "Secured", requiredDocs: ["Aadhaar & PAN", "Gold Purity Assayer Certificate"] },
];

export const LoanTypesSubFeature: React.FC = () => {
  const [schemes, setSchemes] = useState<LoanScheme[]>(initialSchemes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<LoanScheme | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    minAmount: 50000,
    maxAmount: 1000000,
    minRate: 9.0,
    maxRate: 14.0,
    maxTenureMonths: 60,
    processingFeePct: 1.0,
  });

  const handleOpenModal = (scheme: LoanScheme) => {
    setEditingScheme(scheme);
    setFormData({
      title: scheme.title,
      minAmount: scheme.minAmount,
      maxAmount: scheme.maxAmount,
      minRate: scheme.minRate,
      maxRate: scheme.maxRate,
      maxTenureMonths: scheme.maxTenureMonths,
      processingFeePct: scheme.processingFeePct,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingScheme) {
      setSchemes((prev) =>
        prev.map((s) =>
          s.id === editingScheme.id
            ? { ...s, ...formData }
            : s
        )
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Loan Products & Scheme Configurations
          </h3>
          <p className="text-xs text-slate-500">
            Configure interest rate ranges, maximum ticket sizes, tenures, and processing fee percentages
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{scheme.title}</h4>
                <Badge variant={scheme.securityType === "Secured" ? "info" : "neutral"} className="text-[10px]">
                  {scheme.securityType}
                </Badge>
              </div>

              <div className="space-y-2 text-xs pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Loan Limit:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(scheme.minAmount)} - {formatCurrency(scheme.maxAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest ROI:</span>
                  <span className="font-bold text-emerald-600">
                    {scheme.minRate}% - {scheme.maxRate}% p.a.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max Tenure:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {scheme.maxTenureMonths} Months ({scheme.maxTenureMonths / 12} Yrs)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Fee:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {scheme.processingFeePct}% + GST
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Required Documents:
                </span>
                <div className="flex flex-wrap gap-1">
                  {scheme.requiredDocs.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs mt-2"
              onClick={() => handleOpenModal(scheme)}
            >
              Configure Scheme Parameters
            </Button>
          </div>
        ))}
      </div>

      {/* Edit Scheme Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Configure Scheme - ${editingScheme?.title}`}
        className="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Min Amount (₹)"
              type="number"
              value={String(formData.minAmount)}
              onChange={(e) => setFormData({ ...formData, minAmount: Number(e.target.value) })}
              required
            />
            <Input
              label="Max Amount (₹)"
              type="number"
              value={String(formData.maxAmount)}
              onChange={(e) => setFormData({ ...formData, maxAmount: Number(e.target.value) })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Min ROI (% p.a.)"
              type="number"
              step="0.05"
              value={String(formData.minRate)}
              onChange={(e) => setFormData({ ...formData, minRate: Number(e.target.value) })}
              required
            />
            <Input
              label="Max ROI (% p.a.)"
              type="number"
              step="0.05"
              value={String(formData.maxRate)}
              onChange={(e) => setFormData({ ...formData, maxRate: Number(e.target.value) })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Max Tenure (Months)"
              type="number"
              value={String(formData.maxTenureMonths)}
              onChange={(e) => setFormData({ ...formData, maxTenureMonths: Number(e.target.value) })}
              required
            />
            <Input
              label="Processing Fee (%)"
              type="number"
              step="0.05"
              value={String(formData.processingFeePct)}
              onChange={(e) => setFormData({ ...formData, processingFeePct: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Scheme</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
