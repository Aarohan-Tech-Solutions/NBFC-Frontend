import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Modal, Input } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

interface DisbursementItem {
  id: string;
  appNo: string;
  customerName: string;
  customerPhone: string;
  loanProduct: string;
  sanctionedAmount: number;
  processingFee: number;
  insuranceFee: number;
  netDisbursal: number;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolder: string;
  txnId: string;
  paymentMode: "RTGS" | "NEFT" | "IMPS";
  status: "Pending" | "Initiated" | "Success" | "Failed";
  disbursedDate: string;
}

const initialDisbursements: DisbursementItem[] = [
  { id: "1", appNo: "LA-9485", customerName: "Rahul Kapoor", customerPhone: "+91 99887 76655", loanProduct: "Home Loan", sanctionedAmount: 4500000, processingFee: 45000, insuranceFee: 12500, netDisbursal: 4442500, bankName: "HDFC Bank Ltd.", accountNumber: "50100084920194", ifsc: "HDFC0000060", accountHolder: "Rahul Kapoor", txnId: "CMS9948201", paymentMode: "RTGS", status: "Success", disbursedDate: "16 Aug 2026, 11:30 AM" },
  { id: "2", appNo: "LA-9488", customerName: "Meenakshi Sen", customerPhone: "+91 98301 44556", loanProduct: "Mortgage Loan", sanctionedAmount: 2500000, processingFee: 25000, insuranceFee: 8000, netDisbursal: 2467000, bankName: "Axis Bank Ltd.", accountNumber: "91802004819284", ifsc: "UTIB0000142", accountHolder: "Meenakshi Sen", txnId: "CMS8849201", paymentMode: "RTGS", status: "Success", disbursedDate: "15 Aug 2026, 03:45 PM" },
  { id: "3", appNo: "LA-9487", customerName: "Rajeshwar Patel", customerPhone: "+91 98250 11223", loanProduct: "Business Loan", sanctionedAmount: 3500000, processingFee: 52500, insuranceFee: 15000, netDisbursal: 3432500, bankName: "ICICI Bank Ltd.", accountNumber: "00040501839201", ifsc: "ICIC0000004", accountHolder: "Patel Precision Engineering", txnId: "", paymentMode: "RTGS", status: "Pending", disbursedDate: "Pending Authorization" },
  { id: "4", appNo: "LA-9489", customerName: "Arun Nair", customerPhone: "+91 98490 66778", loanProduct: "Car Loan", sanctionedAmount: 1200000, processingFee: 12000, insuranceFee: 24000, netDisbursal: 1164000, bankName: "State Bank of India", accountNumber: "11223344556677", ifsc: "SBIN0000691", accountHolder: "Arun Nair", txnId: "CMS7739201", paymentMode: "NEFT", status: "Initiated", disbursedDate: "16 Aug 2026, 12:00 PM" },
];

export const DisbursementFeature: React.FC = () => {
  const [disbursements, setDisbursements] = useState<DisbursementItem[]>(initialDisbursements);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisbursal, setSelectedDisbursal] = useState<DisbursementItem | null>(null);
  const [txnInput, setTxnInput] = useState("");

  const handleOpenProcess = (item: DisbursementItem) => {
    setSelectedDisbursal(item);
    setTxnInput(`RTGS-${Math.floor(100000000 + Math.random() * 900000000)}`);
    setIsModalOpen(true);
  };

  const handleExecuteDisbursement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDisbursal) return;

    setDisbursements((prev) =>
      prev.map((d) =>
        d.id === selectedDisbursal.id
          ? {
              ...d,
              status: "Success",
              txnId: txnInput,
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
    setIsModalOpen(false);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = disbursements.map((d) => ({
      "Application No": d.appNo,
      "Customer Name": d.customerName,
      Product: d.loanProduct,
      "Sanctioned Amount": d.sanctionedAmount,
      "Processing Fee": d.processingFee,
      "Insurance Fee": d.insuranceFee,
      "Net Disbursed Amount": d.netDisbursal,
      "Beneficiary Bank": d.bankName,
      "Account Number": d.accountNumber,
      "IFSC Code": d.ifsc,
      "Payment Mode": d.paymentMode,
      "UTR / Transaction ID": d.txnId,
      Status: d.status,
      "Disbursement Date": d.disbursedDate,
    }));

    if (format === "excel") {
      exportToExcel("Disbursement_Batch_Ledger", "Disbursements", exportData);
    } else {
      exportToCSV("Disbursement_Batch_Ledger", exportData);
    }
  };

  const filtered = disbursements.filter((d) => {
    const matchesSearch =
      d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.txnId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || d.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalDisbursed = disbursements
    .filter((d) => d.status === "Success")
    .reduce((acc, curr) => acc + curr.netDisbursal, 0);

  const pendingDisbursal = disbursements
    .filter((d) => d.status === "Pending" || d.status === "Initiated")
    .reduce((acc, curr) => acc + curr.netDisbursal, 0);

  const columns = [
    {
      header: "Application & Customer",
      accessorKey: (row: DisbursementItem) => (
        <div>
          <div className="font-mono font-bold text-blue-600 text-xs">{row.appNo}</div>
          <div className="font-bold text-slate-900 dark:text-slate-100">{row.customerName}</div>
          <div className="text-[11px] text-slate-400">{row.loanProduct}</div>
        </div>
      ),
    },
    {
      header: "Beneficiary Bank Account",
      accessorKey: (row: DisbursementItem) => (
        <div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">{row.bankName}</div>
          <div className="text-[11px] text-slate-400 font-mono">
            A/C: {row.accountNumber} ({row.ifsc})
          </div>
          <div className="text-[10px] text-slate-500">Holder: {row.accountHolder}</div>
        </div>
      ),
    },
    {
      header: "Net Disbursed Amount",
      accessorKey: (row: DisbursementItem) => (
        <div>
          <div className="font-extrabold text-slate-900 dark:text-slate-100">
            {formatCurrency(row.netDisbursal)}
          </div>
          <div className="text-[11px] text-slate-400">
            Sanction: {formatCurrency(row.sanctionedAmount)} (Fee: -{formatCurrency(row.processingFee + row.insuranceFee)})
          </div>
        </div>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: (row: DisbursementItem) => (
        <Badge
          variant={row.status === "Success" ? "success" : row.status === "Initiated" ? "info" : "warning"}
          className="text-[10px]"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Transaction ID / Date",
      accessorKey: (row: DisbursementItem) => (
        <div className="text-xs">
          <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {row.txnId || "Pending Gateway"}
          </div>
          <div className="text-[11px] text-slate-400">{row.disbursedDate}</div>
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: DisbursementItem) => (
        <div>
          {row.status !== "Success" ? (
            <Button size="sm" onClick={() => handleOpenProcess(row)} className="text-xs">
              Authorize Fund Transfer
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => alert(`Disbursement Receipt #${row.appNo}\nTransferred: ${formatCurrency(row.netDisbursal)}\nBeneficiary: ${row.accountHolder}\nUTR: ${row.txnId}`)}
            >
              Print Receipt
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Disbursement Module"
        description="Direct escrow bank integration, fee deductions calculation, RTGS/NEFT batch payout execution, and transaction tracking."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Bank Batch File
            </Button>
          </div>
        }
      />

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Disbursed (Success)</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(totalDisbursed)}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Awaiting Fund Transfer</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{formatCurrency(pendingDisbursal)}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Escrow Balance Available</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{formatCurrency(125000000)}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${statusFilter === "all" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("Pending")}
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${statusFilter === "Pending" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
          >
            Pending Authorization
          </button>
          <button
            onClick={() => setStatusFilter("Initiated")}
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${statusFilter === "Initiated" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
          >
            In Gateway
          </button>
          <button
            onClick={() => setStatusFilter("Success")}
            className={`px-3 py-1 text-xs rounded-lg font-semibold ${statusFilter === "Success" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
          >
            Success
          </button>
        </div>

        <Button size="sm" onClick={() => alert("Batch RTGS payload generated for HDFC Corporate Escrow Portal.")}>
          Generate RTGS Payment Batch
        </Button>
      </div>

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Process Disbursement Modal */}
      {selectedDisbursal && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Authorize Loan Disbursement - ${selectedDisbursal.appNo}`}
          className="max-w-xl"
        >
          <form onSubmit={handleExecuteDisbursement} className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                <span>{selectedDisbursal.customerName}</span>
                <span className="text-emerald-600">{formatCurrency(selectedDisbursal.netDisbursal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-500">
                <div>Sanctioned: <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(selectedDisbursal.sanctionedAmount)}</span></div>
                <div>Processing Fee: <span className="font-bold text-rose-500">-{formatCurrency(selectedDisbursal.processingFee)}</span></div>
                <div>Insurance / Legal: <span className="font-bold text-rose-500">-{formatCurrency(selectedDisbursal.insuranceFee)}</span></div>
                <div>Net Disbursal: <span className="font-extrabold text-emerald-600">{formatCurrency(selectedDisbursal.netDisbursal)}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50 text-[11px] text-slate-600 dark:text-slate-300">
                Beneficiary A/C: <span className="font-mono font-bold">{selectedDisbursal.accountNumber}</span> &bull; {selectedDisbursal.bankName} (IFSC: {selectedDisbursal.ifsc})
              </div>
            </div>

            <Input
              label="Bank Transaction UTR / Ref No."
              value={txnInput}
              onChange={(e) => setTxnInput(e.target.value)}
              required
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Confirm & Credit Funds</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default DisbursementFeature;
