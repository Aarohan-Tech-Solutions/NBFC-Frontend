import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Modal, Input } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

interface CommissionRecord {
  id: string;
  partnerType: "DSA" | "Connector";
  partnerCode: string;
  partnerName: string;
  appNo: string;
  customerName: string;
  loanProduct: string;
  disbursedAmount: number;
  ratePct: number;
  grossAmount: number;
  tdsAmount: number;
  netPayout: number;
  status: "Pending" | "Approved" | "Paid";
  payoutDate: string;
  utrNo: string;
  bankDetails: string;
}

const initialCommissions: CommissionRecord[] = [
  { id: "1", partnerType: "DSA", partnerCode: "DSA-1042", partnerName: "Apex Financial Solutions", appNo: "LA-9485", customerName: "Rahul Kapoor", loanProduct: "Home Loan", disbursedAmount: 4500000, ratePct: 1.5, grossAmount: 67500, tdsAmount: 3375, netPayout: 64125, status: "Approved", payoutDate: "16 Aug 2026", utrNo: "", bankDetails: "HDFC Bank (A/C: 502000849201)" },
  { id: "2", partnerType: "DSA", partnerCode: "DSA-1098", partnerName: "Star Loans Consultancy", appNo: "LA-9487", customerName: "Rajeshwar Patel", loanProduct: "Business Loan", disbursedAmount: 3500000, ratePct: 1.25, grossAmount: 43750, tdsAmount: 2188, netPayout: 41562, status: "Pending", payoutDate: "Pending", utrNo: "", bankDetails: "ICICI Bank (A/C: 000405018392)" },
  { id: "3", partnerType: "DSA", partnerCode: "DSA-1120", partnerName: "Eastern Capital Partners", appNo: "LA-9480", customerName: "Debabrata Sen", loanProduct: "Personal Loan", disbursedAmount: 600000, ratePct: 1.5, grossAmount: 9000, tdsAmount: 450, netPayout: 8550, status: "Paid", payoutDate: "10 Aug 2026", utrNo: "HDFC98492019", bankDetails: "Axis Bank (A/C: 918020048192)" },
  { id: "4", partnerType: "Connector", partnerCode: "CON-301", partnerName: "Anand Deshmukh", appNo: "LA-9482", customerName: "Vikram Malhotra", loanProduct: "Mortgage Loan", disbursedAmount: 2500000, ratePct: 0.5, grossAmount: 12500, tdsAmount: 625, netPayout: 11875, status: "Paid", payoutDate: "05 Aug 2026", utrNo: "ICIC84920194", bankDetails: "ICICI Bank (A/C: 000401928471)" },
  { id: "5", partnerType: "Connector", partnerCode: "CON-312", partnerName: "Sunil Sen", appNo: "LA-9488", customerName: "Meenakshi Sen", loanProduct: "Personal Loan", disbursedAmount: 800000, ratePct: 0.5, grossAmount: 4000, tdsAmount: 200, netPayout: 3800, status: "Approved", payoutDate: "16 Aug 2026", utrNo: "", bankDetails: "Axis Bank (A/C: 918020048192)" },
];

export const CommissionsFeature: React.FC = () => {
  const [commissions, setCommissions] = useState<CommissionRecord[]>(initialCommissions);
  const [activeTab, setActiveTab] = useState<"dsa" | "connector" | "rules">("dsa");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Payout Modal
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [selectedRecordForPayout, setSelectedRecordForPayout] = useState<CommissionRecord | null>(null);
  const [utrInput, setUtrInput] = useState("");

  const tabs = [
    { id: "dsa", label: "DSA Partner Commission" },
    { id: "connector", label: "Connector Referral Commission" },
    { id: "rules", label: "Commission Slabs & Rules" },
  ];

  const handleOpenPayout = (record: CommissionRecord) => {
    setSelectedRecordForPayout(record);
    setUtrInput(`UTR-${Math.floor(100000000 + Math.random() * 900000000)}`);
    setIsPayoutModalOpen(true);
  };

  const handleCompletePayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecordForPayout) return;

    setCommissions((prev) =>
      prev.map((c) =>
        c.id === selectedRecordForPayout.id
          ? {
              ...c,
              status: "Paid",
              utrNo: utrInput,
              payoutDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            }
          : c
      )
    );
    setIsPayoutModalOpen(false);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = commissions.map((c) => ({
      "Partner Type": c.partnerType,
      "Partner Code": c.partnerCode,
      "Partner Name": c.partnerName,
      "Application No": c.appNo,
      "Customer Name": c.customerName,
      "Loan Product": c.loanProduct,
      "Disbursed Amount": c.disbursedAmount,
      "Rate %": c.ratePct,
      "Gross Commission": c.grossAmount,
      "TDS (5%)": c.tdsAmount,
      "Net Payout": c.netPayout,
      Status: c.status,
      "Payout Date": c.payoutDate,
      "UTR Reference": c.utrNo,
    }));

    if (format === "excel") {
      exportToExcel("Commission_Ledger", "Commissions", exportData);
    } else {
      exportToCSV("Commission_Ledger", exportData);
    }
  };

  const currentList = commissions.filter((c) => {
    const matchesTab = activeTab === "dsa" ? c.partnerType === "DSA" : activeTab === "connector" ? c.partnerType === "Connector" : true;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesSearch =
      c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.partnerCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesStatus && matchesSearch;
  });

  const totalGross = currentList.reduce((acc, curr) => acc + curr.grossAmount, 0);
  const totalNet = currentList.reduce((acc, curr) => acc + curr.netPayout, 0);

  const columns = [
    {
      header: "Partner & Code",
      accessorKey: (row: CommissionRecord) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100">{row.partnerName}</div>
          <div className="text-[11px] text-slate-400 font-mono">
            {row.partnerCode} • {row.partnerType}
          </div>
        </div>
      ),
    },
    {
      header: "Loan File & Customer",
      accessorKey: (row: CommissionRecord) => (
        <div>
          <span className="font-mono text-blue-600 font-semibold">{row.appNo}</span>
          <div className="text-slate-800 dark:text-slate-200">{row.customerName}</div>
          <div className="text-[11px] text-slate-400">
            {row.loanProduct} ({formatCurrency(row.disbursedAmount)})
          </div>
        </div>
      ),
    },
    {
      header: "Rate",
      accessorKey: (row: CommissionRecord) => (
        <span className="font-bold text-blue-600 dark:text-blue-400">{row.ratePct}%</span>
      ),
    },
    {
      header: "Payout Breakdown",
      accessorKey: (row: CommissionRecord) => (
        <div className="text-xs">
          <div className="font-bold text-slate-900 dark:text-slate-100">
            Net: {formatCurrency(row.netPayout)}
          </div>
          <div className="text-[11px] text-slate-400">
            Gross: {formatCurrency(row.grossAmount)} (TDS: -{formatCurrency(row.tdsAmount)})
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: (row: CommissionRecord) => (
        <Badge
          variant={row.status === "Paid" ? "success" : row.status === "Approved" ? "info" : "warning"}
          className="text-[10px]"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "UTR / Payout Date",
      accessorKey: (row: CommissionRecord) => (
        <div className="text-xs">
          <div className="text-slate-700 dark:text-slate-300 font-medium">{row.payoutDate}</div>
          <div className="text-[11px] text-slate-400 font-mono">{row.utrNo || "—"}</div>
        </div>
      ),
    },
    {
      header: "Action",
      accessorKey: (row: CommissionRecord) => (
        <div>
          {row.status !== "Paid" ? (
            <Button size="sm" onClick={() => handleOpenPayout(row)} className="text-xs">
              Process Payout
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => alert(`Commission Payout Receipt for ${row.appNo}\nAmount: ${formatCurrency(row.netPayout)}\nUTR: ${row.utrNo}`)}
            >
              Receipt
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commission Management"
        description="Calculate, approve, and execute commission disbursements for DSA Channel Partners and Freelance Connectors."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
              Export CSV
            </Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} />

      {activeTab !== "rules" && (
        <div className="space-y-4">
          {/* KPI Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Gross Accrual</span>
              <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{formatCurrency(totalGross)}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Net Payable</span>
              <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(totalNet)}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">TDS (Section 194H)</span>
              <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{formatCurrency(totalGross - totalNet)}</p>
            </div>
          </div>

          {/* Filters Bar */}
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
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("Approved")}
                className={`px-3 py-1 text-xs rounded-lg font-semibold ${statusFilter === "Approved" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
              >
                Approved
              </button>
              <button
                onClick={() => setStatusFilter("Paid")}
                className={`px-3 py-1 text-xs rounded-lg font-semibold ${statusFilter === "Paid" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
              >
                Paid
              </button>
            </div>

            <Button size="sm" onClick={() => alert("Batch payout initiated for all approved commission records.")}>
              Authorize Batch Transfer
            </Button>
          </div>

          <DataTableWrapper
            data={currentList}
            columns={columns}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onExport={() => handleExport("csv")}
          />
        </div>
      )}

      {/* Tab: Rules */}
      {activeTab === "rules" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Commission Structure & Tiering Slabs
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <div className="flex justify-between font-bold text-xs text-slate-900 dark:text-slate-100">
                <span>Platinum Tier DSAs (Monthly Sourcing &gt; ₹ 1.5 Cr)</span>
                <span className="text-blue-600 font-bold">1.50% Payout</span>
              </div>
              <p className="text-[11px] text-slate-500">Applicable on Home, Mortgage, and Business Loan disbursements.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <div className="flex justify-between font-bold text-xs text-slate-900 dark:text-slate-100">
                <span>Gold Tier DSAs (Monthly Sourcing ₹ 50L - ₹ 1.5 Cr)</span>
                <span className="text-blue-600 font-bold">1.25% Payout</span>
              </div>
              <p className="text-[11px] text-slate-500">Applicable across all retail loan categories.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <div className="flex justify-between font-bold text-xs text-slate-900 dark:text-slate-100">
                <span>Silver Tier DSAs (Monthly Sourcing &lt; ₹ 50L)</span>
                <span className="text-blue-600 font-bold">1.00% Payout</span>
              </div>
              <p className="text-[11px] text-slate-500">Standard entry tier rate.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
              <div className="flex justify-between font-bold text-xs text-slate-900 dark:text-slate-100">
                <span>Freelance Connector Referrals (Flat Rate)</span>
                <span className="text-emerald-600 font-bold">0.50% Payout</span>
              </div>
              <p className="text-[11px] text-slate-500">Paid out upon successful loan fund disbursement.</p>
            </div>
          </div>
        </div>
      )}

      {/* Process Payout Modal */}
      {selectedRecordForPayout && (
        <Modal
          isOpen={isPayoutModalOpen}
          onClose={() => setIsPayoutModalOpen(false)}
          title={`Process Commission Payout - ${selectedRecordForPayout.partnerName}`}
        >
          <form onSubmit={handleCompletePayout} className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                <span>{selectedRecordForPayout.partnerName}</span>
                <span className="text-emerald-600">{formatCurrency(selectedRecordForPayout.netPayout)}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Beneficiary: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedRecordForPayout.bankDetails}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-slate-500 pt-1">
                <div>Gross: <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(selectedRecordForPayout.grossAmount)}</span></div>
                <div>TDS (5%): <span className="font-semibold text-rose-500">-{formatCurrency(selectedRecordForPayout.tdsAmount)}</span></div>
                <div>Rate: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedRecordForPayout.ratePct}%</span></div>
              </div>
            </div>

            <Input
              label="Bank Transaction UTR Number"
              placeholder="e.g. HDFC98492019"
              value={utrInput}
              onChange={(e) => setUtrInput(e.target.value)}
              required
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsPayoutModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Confirm Payout Execution</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CommissionsFeature;
