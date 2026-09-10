import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loansApi, bankOfficialsApi, verificationApi } from "@nbfc/api-client";
import { formatCurrency, formatDate } from "../../lib/formatters";
import { Badge, Button, Tabs, Modal, Select, Input } from "@nbfc/ui";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  User,
  Building,
  Shield,
  Clock,
  AlertTriangle,
  Download,
  Stamp,
  XCircle,
} from "lucide-react";
import { useOfficialAuthStore } from "../../stores/auth.store";

export const ApplicationDetailFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useOfficialAuthStore();

  const [loan, setLoan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isSanctionModalOpen, setIsSanctionModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("CIBIL_LOW_SCORE");
  const [rejectRemarks, setRejectRemarks] = useState("");

  useEffect(() => {
    loansApi.getLoanById(id || "LA-9485").then((data) => {
      setLoan(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading || !loan) {
    return (
      <div className="space-y-6 animate-pulse p-8">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/4" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  const detailTabs = [
    { id: "profile", label: "Borrower & Sourcing" },
    { id: "kyc_docs", label: "KYC & Document Vault" },
    { id: "financials", label: "Income & FOIR Analysis" },
    { id: "collateral", label: "Property / Vehicle Valuation" },
    { id: "timeline", label: "Audit Timeline" },
  ];

  const handleApproveSanction = () => {
    navigate(`/sanction?loanId=${loan.id || loan.applicationNo}`);
  };

  const handleExecuteReject = async (e: React.FormEvent) => {
    e.preventDefault();
    await bankOfficialsApi.rejectApplicationWithReason({
      loanId: loan.id,
      reasonCode: rejectReason as any,
      reasonLabel: rejectReason.replace(/_/g, " "),
      officialRemarks: rejectRemarks,
      adverseActionNoticeSent: true,
      rejectedBy: user?.name || "Official",
      rejectedAt: new Date().toISOString(),
    });
    setLoan((prev: any) => ({ ...prev, status: "rejected" }));
    setIsRejectModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#222530]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/queue")}
            className="p-2 rounded-xl bg-white dark:bg-[#161822] border border-slate-200 dark:border-[#262938] hover:bg-slate-100 dark:hover:bg-[#1c202e] text-slate-600 dark:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400">
                {loan.applicationNo}
              </span>
              <Badge variant={loan.status === "sanctioned" || loan.status === "approved" ? "success" : "warning"}>
                {loan.status}
              </Badge>
              <span className="text-xs text-slate-400 font-mono">
                Submitted: {loan.submittedAt || "12 Aug 2026"}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {loan.customerName} &bull; {loan.loanType?.toUpperCase()} LOAN
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-rose-600 hover:bg-rose-50 border-rose-200 dark:border-rose-900/50"
            onClick={() => setIsRejectModalOpen(true)}
          >
            <XCircle className="w-3.5 h-3.5 mr-1" />
            Reject File
          </Button>
          <Button size="sm" onClick={handleApproveSanction} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Stamp className="w-3.5 h-3.5 mr-1" />
            Sanction & Issue Letter
          </Button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-[#151722] p-4 rounded-2xl border border-slate-200 dark:border-[#242736]">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold">Requested Amount</span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{formatCurrency(loan.amount)}</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold">CIBIL Bureau Score</span>
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{loan.cibilScore || 785} / 900</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold">Assessed FOIR (DTI)</span>
          <p className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">42.5% (Safe &lt; 50%)</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Underwriter</span>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{user?.name || "Official"}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={detailTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      <div className="bg-white dark:bg-[#151722] p-6 rounded-2xl border border-slate-200 dark:border-[#242736]">
        {activeTab === "profile" && (
          <div className="space-y-6 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Primary Applicant & Co-Applicant Demographics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a]">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[11px]">Primary Borrower</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-500">
                  <div>Full Name: <span className="font-semibold text-slate-800 dark:text-slate-200">{loan.customerName}</span></div>
                  <div>Phone: <span className="font-semibold text-slate-800 dark:text-slate-200">{loan.customerPhone}</span></div>
                  <div>Email: <span className="font-semibold text-slate-800 dark:text-slate-200">{loan.customerEmail}</span></div>
                  <div>PAN: <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">ABCDE1234F</span></div>
                  <div>Employment: <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{loan.employmentType}</span></div>
                  <div>Monthly Inflow: <span className="font-bold text-emerald-600">{formatCurrency(loan.monthlyIncome)}</span></div>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a]">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[11px]">Co-Applicant / Guarantor</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-500">
                  <div>Co-Borrower: <span className="font-semibold text-slate-800 dark:text-slate-200">{loan.coApplicantName || "Sunita Kapoor"}</span></div>
                  <div>Relationship: <span className="font-semibold text-slate-800 dark:text-slate-200">{loan.coApplicantRelationship || "Spouse & Co-Owner"}</span></div>
                  <div>KYC Status: <span className="font-semibold text-emerald-600">Aadhaar & PAN Linked</span></div>
                  <div>Contribution: <span className="font-semibold text-slate-800 dark:text-slate-200">Co-Obligor</span></div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a] space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase text-[11px]">Sourcing Channel & Intermediary</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Sourced via: <span className="font-bold text-slate-900 dark:text-white">{loan.dsaName || loan.connectorName || "Direct NBFC Online Portal"}</span> &bull; Branch: <span className="font-bold">Kolkata Central Main (BR-KOL-01)</span>
              </p>
            </div>
          </div>
        )}

        {activeTab === "kyc_docs" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Verified Documents Repository
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Aadhaar Card (Front & Back)", type: "KYC Identity", verified: true, size: "1.2 MB" },
                { name: "PAN Card Verification Copy", type: "KYC Tax ID", verified: true, size: "850 KB" },
                { name: "Salary Slips (Last 3 Months)", type: "Income Proof", verified: true, size: "2.4 MB" },
                { name: "12-Month Bank Statement (Infosys Inflow)", type: "Banking Analysis", verified: true, size: "4.8 MB" },
                { name: "Property 30-Year Title Search Deed", type: "Collateral Legal", verified: true, size: "8.1 MB" },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{doc.name}</div>
                      <div className="text-[10px] text-slate-400">{doc.type} &bull; {doc.size}</div>
                    </div>
                  </div>
                  <Badge variant="success">Verified</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "financials" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Income Eligibility & Debt Burden (FOIR)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a]">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Gross Monthly Inflow</span>
                <p className="text-xl font-black text-emerald-600 mt-1">{formatCurrency(loan.monthlyIncome || 185000)}</p>
                <span className="text-[10px] text-slate-400">Verified via NetBanking API</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a]">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Proposed Loan EMI</span>
                <p className="text-xl font-black text-blue-600 mt-1">{formatCurrency(39800)}</p>
                <span className="text-[10px] text-slate-400">8.75% ROI, 240 Mos</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a]">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Net Fixed Obligation Ratio</span>
                <p className="text-xl font-black text-emerald-600 mt-1">42.5%</p>
                <span className="text-[10px] text-emerald-500 font-bold">Policy Limit: 60.0% max</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "collateral" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Collateral Valuation & Legal Search
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200/80 dark:border-[#262a3a] space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Fair Market Property Valuation:</span>
                <span className="font-black text-emerald-600 text-sm">{formatCurrency(loan.propertyValuation || 6500000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Loan-To-Value (LTV) Ratio:</span>
                <span className="font-black text-blue-600 text-sm">69.2% (Permissible &lt; 75%)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-500">
                Advocate Report: Clear 30-year lineage mutation. Free of encumbrance or statutory lien.
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Audit History & Stage Progression
            </h3>
            <div className="space-y-3 pl-2 border-l-2 border-emerald-500/40 ml-2">
              <div className="relative pl-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[21px] top-1" />
                <span className="font-bold text-slate-900 dark:text-white">Application Sourced & Submitted</span>
                <p className="text-slate-400 text-[10px]">{loan.submittedAt} &bull; Sourced by {loan.dsaName || "Portal"}</p>
              </div>
              <div className="relative pl-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[21px] top-1" />
                <span className="font-bold text-slate-900 dark:text-white">KYC & Document Verification Cleared</span>
                <p className="text-slate-400 text-[10px]">14 Aug 2026, 03:30 PM &bull; Priya Sundaram (Verification Officer)</p>
              </div>
              <div className="relative pl-4">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute -left-[21px] top-1" />
                <span className="font-bold text-slate-900 dark:text-white">Credit Appraisal & Sanction Underwriting</span>
                <p className="text-slate-400 text-[10px]">Current Stage &bull; Assigned to {user?.name || "Official"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <Modal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          title={`Reject Loan Application #${loan.applicationNo}`}
          className="max-w-lg"
        >
          <form onSubmit={handleExecuteReject} className="space-y-4 text-xs">
            <Select
              label="Standardized Rejection Reason Code (Adverse Action Notice)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              options={[
                { label: "CIBIL Score Below Threshold (< 680)", value: "CIBIL_LOW_SCORE" },
                { label: "Over-leveraged Monthly FOIR (> 65%)", value: "OVERLEVERAGED_FOIR" },
                { label: "Property Title Defect / Encumbered Land", value: "PROPERTY_TITLE_DEFECT" },
                { label: "Forged / Manipulated Financial Records", value: "FORGED_FAKE_DOCUMENTS" },
                { label: "Insufficient Verifiable Income Inflow", value: "INSUFFICIENT_INCOME" },
                { label: "Negative On-Site Field Inspection Report", value: "NEGATIVE_FIELD_REPORT" },
              ]}
            />

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Credit Officer Remarks (Recorded to Audit Trail):
              </label>
              <textarea
                required
                rows={3}
                value={rejectRemarks}
                onChange={(e) => setRejectRemarks(e.target.value)}
                placeholder="Enter detailed reason for rejection..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white">
                Confirm Rejection & Send Notice
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ApplicationDetailFeature;
