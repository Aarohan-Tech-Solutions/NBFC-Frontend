import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { disbursementApi } from "@nbfc/api-client";
import { formatCurrency } from "../../lib/formatters";
import { exportToCSV } from "../../lib/exportUtils";
import { Badge, Button, Modal, Input } from "@nbfc/ui";
import { Wallet, CheckCircle2, Download, Send } from "lucide-react";
import { useOfficialAuthStore } from "../../stores/auth.store";

export const OfficialDisbursementFeature: React.FC = () => {
  const { user } = useOfficialAuthStore();
  const [disbursements, setDisbursements] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [txnId, setTxnId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    disbursementApi.getDisbursements().then((data) => {
      setDisbursements(data);
      setIsLoading(false);
    });
  }, []);

  const handleOpenRelease = (item: any) => {
    setSelectedItem(item);
    setTxnId(`RTGS-${Math.floor(100000000 + Math.random() * 900000000)}`);
  };

  const handleExecuteRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    await disbursementApi.authorizeDisbursement({
      loanId: selectedItem.loanId || selectedItem.id,
      sanctionedAmount: selectedItem.sanctionedAmount,
      deductions: {
        processingFee: selectedItem.processingFee,
        insurance: selectedItem.insuranceFee,
        documentationCharges: 2500,
      },
      netDisbursal: selectedItem.netDisbursal,
      beneficiaryBank: selectedItem.bankName,
      accountNumber: selectedItem.accountNumber,
      ifsc: selectedItem.ifsc,
      accountHolder: selectedItem.accountHolder,
      paymentMode: "RTGS",
      transactionId: txnId,
      authorizedBy: user?.name || "Disbursement Officer",
    });

    setDisbursements((prev) =>
      prev.map((d) =>
        d.id === selectedItem.id
          ? {
              ...d,
              status: "Success",
              txnId,
              disbursedDate: new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : d
      )
    );
    setSelectedItem(null);
  };

  const handleExport = () => {
    const exportData = disbursements.map((d) => ({
      "App No": d.appNo,
      Borrower: d.customerName,
      Bank: d.bankName,
      Account: d.accountNumber,
      IFSC: d.ifsc,
      Sanctioned: d.sanctionedAmount,
      "Net Disbursed": d.netDisbursal,
      Status: d.status,
      "UTR / Txn ID": d.txnId,
      Date: d.disbursedDate,
    }));
    exportToCSV("Official_Disbursement_Ledger", exportData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Escrow Banking & Fund Disbursement Release"
        description="Verify beneficiary account details, execute RTGS payouts from corporate escrow pool, and log bank UTR references."
        action={
          <Button size="sm" variant="outline" onClick={handleExport} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Bank Batch CSV
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Escrow Balance Available</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(125000000)}</p>
          <span className="text-[10px] text-slate-400">HDFC Corporate Escrow Desk</span>
        </div>
        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Awaiting Payout Authorization</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {formatCurrency(disbursements.filter((d) => d.status !== "Success").reduce((acc, curr) => acc + curr.netDisbursal, 0))}
          </p>
          <span className="text-[10px] text-slate-400">Ready for RTGS / NEFT</span>
        </div>
        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Disbursed Volume (MTD)</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {formatCurrency(disbursements.filter((d) => d.status === "Success").reduce((acc, curr) => acc + curr.netDisbursal, 0))}
          </p>
          <span className="text-[10px] text-slate-400">Successful Bank Credits</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#151722] rounded-2xl border border-slate-200 dark:border-[#242736] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a1d29] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-[#252838]">
              <tr>
                <th className="py-3.5 px-4">Application & Borrower</th>
                <th className="py-3.5 px-4">Beneficiary Bank Account</th>
                <th className="py-3.5 px-4">Net Release Amount</th>
                <th className="py-3.5 px-4">UTR / Ref No.</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {disbursements.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-[#181a24] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{d.appNo}</div>
                    <div className="font-bold text-slate-900 dark:text-white">{d.customerName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{d.bankName}</div>
                    <div className="text-[11px] font-mono text-slate-400">A/C: {d.accountNumber} ({d.ifsc})</div>
                  </td>
                  <td className="py-3 px-4 font-black text-slate-900 dark:text-white">
                    {formatCurrency(d.netDisbursal)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{d.txnId || "Pending Release"}</td>
                  <td className="py-3 px-4">
                    <Badge variant={d.status === "Success" ? "success" : "warning"}>{d.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {d.status !== "Success" ? (
                      <Button size="sm" onClick={() => handleOpenRelease(d)} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Send className="w-3.5 h-3.5 mr-1" /> Authorize Fund Transfer
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs" onClick={() => alert(`Disbursement Receipt #${d.appNo}\nAmount: ${formatCurrency(d.netDisbursal)}\nUTR: ${d.txnId}`)}>
                        View Receipt
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Authorize Escrow Disbursement - #${selectedItem.appNo}`}
          className="max-w-lg"
        >
          <form onSubmit={handleExecuteRelease} className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200 dark:border-[#262a3a] space-y-2">
              <div className="flex justify-between font-bold">
                <span>Beneficiary: {selectedItem.accountHolder}</span>
                <span className="text-emerald-600 text-sm">{formatCurrency(selectedItem.netDisbursal)}</span>
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                {selectedItem.bankName} &bull; A/C: {selectedItem.accountNumber} &bull; IFSC: {selectedItem.ifsc}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bank RTGS / NEFT UTR Reference Number:
              </label>
              <input
                required
                type="text"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setSelectedItem(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Confirm & Disburse Funds
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default OfficialDisbursementFeature;
