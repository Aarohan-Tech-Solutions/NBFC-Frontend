import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { loansApi } from "@nbfc/api-client";
import { formatCurrency } from "../../lib/formatters";
import { exportToCSV } from "../../lib/exportUtils";
import { Badge, Button, Modal } from "@nbfc/ui";
import { AlertOctagon, Download, Eye, FileText } from "lucide-react";

export const OfficialRejectionsFeature: React.FC = () => {
  const [rejectedFiles, setRejectedFiles] = useState<any[]>([
    {
      id: "rej-1",
      appNo: "LA-9480",
      customerName: "Vikram Malhotra",
      loanProduct: "Personal Loan",
      amount: 600000,
      reasonCode: "CIBIL_LOW_SCORE",
      reasonLabel: "CIBIL Bureau Score Below Risk Cutoff (590 < 680)",
      rejectedBy: "Debashis Banerjee (Senior Credit Officer)",
      rejectedAt: "10 Aug 2026, 04:30 PM",
      officialRemarks: "Overdue credit card written-off in bureau report. Unfavourable 36-month repayment track.",
      noticeGenerated: true,
    },
    {
      id: "rej-2",
      appNo: "LA-9482",
      customerName: "Sandeep Agarwal",
      loanProduct: "Mortgage Loan (LAP)",
      amount: 4000000,
      reasonCode: "PROPERTY_TITLE_DEFECT",
      reasonLabel: "Defective 30-Year Title Lineage & Unmutated Plot",
      rejectedBy: "Advocate P. Sharma / Valuer M. Kulkarni",
      rejectedAt: "11 Aug 2026, 02:15 PM",
      officialRemarks: "Ancestral property lacks legal partition deed among siblings. Legal title clear search failed.",
      noticeGenerated: true,
    },
  ]);

  const [selectedRejection, setSelectedRejection] = useState<any | null>(null);

  const handleExport = () => {
    const exportData = rejectedFiles.map((r) => ({
      "App No": r.appNo,
      Borrower: r.customerName,
      Product: r.loanProduct,
      Amount: r.amount,
      "Reason Code": r.reasonCode,
      "Reason Label": r.reasonLabel,
      "Rejected By": r.rejectedBy,
      "Date / Time": r.rejectedAt,
      Remarks: r.officialRemarks,
    }));
    exportToCSV("Adverse_Action_Rejection_Log", exportData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Adverse Action & Rejection Governance Desk"
        description="Audit rejected loan applications, maintain statutory adverse action reason logs, and verify compliance with Fair Lending Practices."
        action={
          <Button size="sm" variant="outline" onClick={handleExport} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Rejections CSV
          </Button>
        }
      />

      <div className="bg-white dark:bg-[#151722] rounded-2xl border border-slate-200 dark:border-[#242736] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a1d29] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-[#252838]">
              <tr>
                <th className="py-3.5 px-4">Application & Borrower</th>
                <th className="py-3.5 px-4">Product & Amount</th>
                <th className="py-3.5 px-4">Reason Code</th>
                <th className="py-3.5 px-4">Decision Maker</th>
                <th className="py-3.5 px-4">Date of Rejection</th>
                <th className="py-3.5 px-4 text-right">Adverse Notice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rejectedFiles.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-[#181a24] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-rose-600">{r.appNo}</div>
                    <div className="font-bold text-slate-900 dark:text-white">{r.customerName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{r.loanProduct}</div>
                    <div className="text-[11px] text-slate-400 font-bold">{formatCurrency(r.amount)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                      {r.reasonCode}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-0.5">{r.reasonLabel}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-semibold">{r.rejectedBy}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{r.rejectedAt}</td>
                  <td className="py-3 px-4 text-right">
                    <Button size="sm" variant="outline" onClick={() => setSelectedRejection(r)} className="text-xs">
                      <Eye className="w-3.5 h-3.5 mr-1" /> View Notice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRejection && (
        <Modal
          isOpen={!!selectedRejection}
          onClose={() => setSelectedRejection(null)}
          title={`Adverse Action Notice - Application #${selectedRejection.appNo}`}
          className="max-w-lg"
        >
          <div className="space-y-4 text-xs font-serif leading-relaxed text-slate-800 dark:text-slate-200">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200 dark:border-[#262a3a] space-y-2 font-sans">
              <div className="flex justify-between font-bold text-sm">
                <span>Borrower: {selectedRejection.customerName}</span>
                <span className="text-rose-600">REJECTED</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Loan Facility: {selectedRejection.loanProduct} ({formatCurrency(selectedRejection.amount)}) &bull; Ref: {selectedRejection.appNo}
              </div>
            </div>

            <p>
              This is an official communication stating that your credit request has been declined following comprehensive underwriting evaluation.
            </p>

            <div className="font-sans p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 text-[11px] block">Statutory Reason Code:</span>
              <span className="font-mono text-rose-700 dark:text-rose-400 font-bold block">{selectedRejection.reasonCode}</span>
              <p className="text-rose-600 dark:text-rose-300 text-[11px]">{selectedRejection.officialRemarks}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 font-sans flex justify-end">
              <Button size="sm" onClick={() => setSelectedRejection(null)}>
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OfficialRejectionsFeature;
