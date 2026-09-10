import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../../components/layout/PageHeader";
import { loansApi, bankOfficialsApi } from "@nbfc/api-client";
import { formatCurrency } from "../../lib/formatters";
import { Badge, Button, Input, Select, Modal } from "@nbfc/ui";
import { Stamp, Download, CheckCircle2, FileText, Printer } from "lucide-react";
import { useOfficialAuthStore } from "../../stores/auth.store";

export const SanctionFeature: React.FC = () => {
  const [searchParams] = useSearchParams();
  const loanIdParam = searchParams.get("loanId") || "LA-9485";
  const { user } = useOfficialAuthStore();

  const [loans, setLoans] = useState<any[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);

  // Calculator state
  const [approvedAmount, setApprovedAmount] = useState<number>(4500000);
  const [interestRate, setInterestRate] = useState<number>(8.75);
  const [tenureMonths, setTenureMonths] = useState<number>(240);
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(1.0);
  const [insuranceFee, setInsuranceFee] = useState<number>(12500);

  // Generated Sanction Letter State
  const [sanctionLetter, setSanctionLetter] = useState<any | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    loansApi.getLoans().then((data) => {
      setLoans(data);
      const target = data.find((l) => l.applicationNo === loanIdParam || l.id === loanIdParam) || data[0];
      if (target) {
        setSelectedLoan(target);
        setApprovedAmount(target.amount || 4500000);
        setInterestRate(target.interestRate || 8.75);
        setTenureMonths(target.tenureMonths || 240);
      }
    });
  }, [loanIdParam]);

  const calc = bankOfficialsApi.calculateSanction({
    loanId: selectedLoan?.id || "loan-1",
    requestedAmount: selectedLoan?.amount || 4500000,
    approvedAmount,
    interestRate,
    tenureMonths,
    processingFeePercent,
    insuranceFee,
    foirPercent: 42.5,
  });

  const handleGenerateLetter = async () => {
    if (!selectedLoan) return;
    const letter = await bankOfficialsApi.generateSanctionLetter(
      {
        loanId: selectedLoan.id,
        requestedAmount: selectedLoan.amount,
        approvedAmount,
        interestRate,
        tenureMonths,
        processingFeePercent,
        insuranceFee,
        foirPercent: 42.5,
      },
      {
        borrowerName: selectedLoan.customerName,
        coBorrowerName: selectedLoan.coApplicantName,
        appNo: selectedLoan.applicationNo,
        loanProduct: selectedLoan.loanType?.toUpperCase() + " LOAN",
        officialName: user?.name || "Dr. Anirban Mukherjee",
      }
    );
    setSanctionLetter(letter);
    setIsGenerated(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sanction Letter Generation & Sign-Off Desk"
        description="Calculate underwriting terms, adjust interest rate / tenure, compute EMI and statutory deductions, and issue official digitally signed sanction letters."
        action={
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleGenerateLetter} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Stamp className="w-4 h-4 mr-1.5" />
              Generate Official Sanction Letter
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Calculation Parameters */}
        <div className="lg:col-span-6 space-y-4 bg-white dark:bg-[#151722] p-6 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Sanction Underwriting Parameters
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Select Active Loan File</label>
            <select
              value={selectedLoan?.applicationNo}
              onChange={(e) => {
                const l = loans.find((item) => item.applicationNo === e.target.value);
                if (l) {
                  setSelectedLoan(l);
                  setApprovedAmount(l.amount);
                  setInterestRate(l.interestRate || 8.75);
                  setTenureMonths(l.tenureMonths || 240);
                }
              }}
              className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none"
            >
              {loans.map((l) => (
                <option key={l.id} value={l.applicationNo}>
                  {l.applicationNo} — {l.customerName} ({formatCurrency(l.amount)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Approved Amount (₹)</label>
              <input
                type="number"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Annual ROI (%)</label>
              <input
                type="number"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tenure (Months)</label>
              <input
                type="number"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Processing Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={processingFeePercent}
                onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>

          {/* Computed Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Monthly EMI:</span>
              <span className="font-extrabold text-blue-600 text-sm">{formatCurrency(calc.monthlyEmi)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Interest Payable:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(calc.totalInterestPayable)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Processing Fee + GST:</span>
              <span className="font-bold text-rose-500">-{formatCurrency(calc.processingFeeAmount + calc.gstOnProcessingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Insurance & Documentation:</span>
              <span className="font-bold text-rose-500">-{formatCurrency(insuranceFee)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-black text-sm">
              <span className="text-slate-800 dark:text-slate-200">Net Disbursable Release:</span>
              <span className="text-emerald-600 dark:text-emerald-400">{formatCurrency(calc.netDisbursalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Right: Live Sanction Letter Document Preview */}
        <div className="lg:col-span-6 bg-white dark:bg-[#151722] p-6 rounded-2xl border border-slate-200 dark:border-[#242736] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Official Sanction Letter Preview
                </h3>
              </div>
              <button onClick={() => window.print()} className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>

            {/* Letter Body */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a] space-y-4 text-xs font-serif leading-relaxed text-slate-800 dark:text-slate-200">
              <div className="text-center pb-3 border-b border-slate-200 dark:border-slate-800 font-sans">
                <h4 className="font-black text-base text-slate-900 dark:text-white">AROHON FINANCIAL SERVICES LTD.</h4>
                <p className="text-[10px] text-slate-400">RBI Regd. NBFC-ICC &bull; Corporate Desk: Sector V, Salt Lake, Kolkata</p>
              </div>

              <div className="flex justify-between font-sans text-[11px] text-slate-500">
                <div>Ref: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">SN-{selectedLoan?.applicationNo}</span></div>
                <div>Date: <span className="font-bold text-slate-800 dark:text-slate-200">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div>
              </div>

              <div>
                <p className="font-sans font-bold">To,</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedLoan?.customerName}</p>
                {selectedLoan?.coApplicantName && <p className="text-slate-500">C/O: {selectedLoan.coApplicantName} ({selectedLoan.coApplicantRelationship})</p>}
              </div>

              <p>
                Dear Customer, with reference to your loan application <span className="font-mono font-bold">{selectedLoan?.applicationNo}</span>, we are pleased to inform you that Arohon NBFC has sanctioned your credit facility under the following terms:
              </p>

              <div className="font-sans grid grid-cols-2 gap-2 p-3 rounded-lg bg-white dark:bg-[#12141c] border border-slate-200 dark:border-slate-800 text-[11px]">
                <div>Sanctioned Limit: <span className="font-bold text-emerald-600">{formatCurrency(approvedAmount)}</span></div>
                <div>Tenure: <span className="font-bold">{tenureMonths} Months</span></div>
                <div>Interest Rate: <span className="font-bold">{interestRate}% p.a. (Floating)</span></div>
                <div>Monthly EMI: <span className="font-bold text-blue-600">{formatCurrency(calc.monthlyEmi)}</span></div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                Subject to NACH mandate registration, clear 30-year property title lien creation, and final execution of loan agreement.
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 font-sans flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-slate-400 block">Sanctioned By</span>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{user?.name || "Dr. Anirban Mukherjee"}</span>
                  <span className="text-[10px] text-emerald-500 block">Branch Underwriting Head</span>
                </div>
                <div className="px-3 py-1 rounded border border-emerald-500/40 text-emerald-500 font-mono text-[10px] font-bold">
                  DIGITALLY SIGNED
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button size="sm" onClick={handleGenerateLetter} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              <Stamp className="w-4 h-4 mr-2" />
              Sign & Issue Official Sanction Notice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanctionFeature;
