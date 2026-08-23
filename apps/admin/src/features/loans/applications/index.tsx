import React, { useState } from "react";
import { DataTableWrapper } from "../../../components/data-table/DataTableWrapper";
import { Badge, Button, Select } from "@nbfc/ui";
import { LoanType, LoanStatus } from "@nbfc/shared-types";
import { formatCurrency } from "../../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../../lib/exportUtils";
import { LoanDetailPanel, LoanApplicationItem } from "../components/LoanDetailPanel";

export const initialLoanApplications: LoanApplicationItem[] = [
  { id: "1", applicationNo: "LA-9485", customerName: "Rahul Kapoor", customerPhone: "+91 99887 76655", branch: "Kolkata Central", loanType: LoanType.HOME, amount: 4500000, tenureMonths: 240, interestRate: 8.65, status: LoanStatus.APPROVED, channel: "DSA", dsaName: "Apex Financial (DSA-1042)", monthlyIncome: 145000, createdAt: "12 Aug 2026" },
  { id: "2", applicationNo: "LA-9486", customerName: "Priya Sundaram", customerPhone: "+91 97766 55443", branch: "Bengaluru Koramangala", loanType: LoanType.PERSONAL, amount: 800000, tenureMonths: 48, interestRate: 11.5, status: LoanStatus.PENDING_VERIFICATION, channel: "Direct", dsaName: "Direct Web", monthlyIncome: 110000, createdAt: "13 Aug 2026" },
  { id: "3", applicationNo: "LA-9487", customerName: "Rajeshwar Patel", customerPhone: "+91 98250 11223", branch: "Ahmedabad SG Highway", loanType: LoanType.BUSINESS, amount: 3500000, tenureMonths: 60, interestRate: 12.0, status: LoanStatus.UNDER_REVIEW, channel: "DSA", dsaName: "Star Loans (DSA-1098)", monthlyIncome: 350000, createdAt: "14 Aug 2026" },
  { id: "4", applicationNo: "LA-9488", customerName: "Meenakshi Sen", customerPhone: "+91 98301 44556", branch: "Kolkata Central", loanType: LoanType.MORTGAGE, amount: 2500000, tenureMonths: 120, interestRate: 9.75, status: LoanStatus.DISBURSED, channel: "Connector", dsaName: "Sunil Sen (CON-312)", monthlyIncome: 95000, createdAt: "10 Aug 2026" },
  { id: "5", applicationNo: "LA-9489", customerName: "Arun Nair", customerPhone: "+91 98490 66778", branch: "Hyderabad Hitech City", loanType: LoanType.CAR, amount: 1200000, tenureMonths: 60, interestRate: 9.0, status: LoanStatus.SUBMITTED, channel: "DSA", dsaName: "Deccan Fin (DSA-1178)", monthlyIncome: 220000, createdAt: "15 Aug 2026" },
  { id: "6", applicationNo: "LA-9490", customerName: "Ananya Mukherjee", customerPhone: "+91 98327 89012", branch: "Kolkata Central", loanType: LoanType.GOLD, amount: 450000, tenureMonths: 12, interestRate: 8.5, status: LoanStatus.DRAFT, channel: "Direct", dsaName: "Direct Staff", monthlyIncome: 85000, createdAt: "16 Aug 2026" },
  { id: "7", applicationNo: "LA-9471", customerName: "Kunal Ghosh", customerPhone: "+91 98114 00998", branch: "Delhi Connaught Place", loanType: LoanType.PERSONAL, amount: 500000, tenureMonths: 36, interestRate: 13.5, status: LoanStatus.REJECTED, channel: "DSA", dsaName: "Capital Tree (DSA-1145)", monthlyIncome: 45000, createdAt: "08 Aug 2026" },
  { id: "8", applicationNo: "LA-8902", customerName: "Sanjay Kumar", customerPhone: "+91 98200 44332", branch: "Mumbai Nariman Point", loanType: LoanType.EDUCATION, amount: 1800000, tenureMonths: 84, interestRate: 9.8, status: LoanStatus.CLOSED, channel: "Direct", dsaName: "Direct Branch", monthlyIncome: 130000, createdAt: "01 Jan 2026" },
];

interface ApplicationsSubFeatureProps {
  applications?: LoanApplicationItem[];
  onOpenDetail?: (loan: LoanApplicationItem) => void;
  onUpdateStatus?: (id: string, newStatus: LoanStatus) => void;
}

export const ApplicationsSubFeature: React.FC<ApplicationsSubFeatureProps> = ({
  applications = initialLoanApplications,
  onOpenDetail,
  onUpdateStatus,
}) => {
  const [apps, setApps] = useState<LoanApplicationItem[]>(applications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [selectedLoanForPanel, setSelectedLoanForPanel] = useState<LoanApplicationItem | null>(null);

  const statusTabs = [
    { id: "all", label: "All Applications" },
    { id: LoanStatus.SUBMITTED, label: "Submitted" },
    { id: LoanStatus.PENDING_VERIFICATION, label: "Pending Verification" },
    { id: LoanStatus.UNDER_REVIEW, label: "Under Review" },
    { id: LoanStatus.APPROVED, label: "Approved" },
    { id: LoanStatus.DISBURSED, label: "Disbursed" },
    { id: LoanStatus.REJECTED, label: "Rejected" },
    { id: LoanStatus.DRAFT, label: "Draft" },
    { id: LoanStatus.CLOSED, label: "Closed" },
  ];

  const handleStatusChange = (id: string, newStatus: LoanStatus) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (onUpdateStatus) onUpdateStatus(id, newStatus);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = apps.map((a) => ({
      "Application No": a.applicationNo,
      "Customer Name": a.customerName,
      Phone: a.customerPhone,
      Branch: a.branch,
      "Loan Product": a.loanType.toUpperCase(),
      "Loan Amount": a.amount,
      "Tenure (Months)": a.tenureMonths,
      "ROI (%)": a.interestRate,
      Status: a.status,
      Channel: a.channel,
      "Sourced By": a.dsaName,
      "Application Date": a.createdAt,
    }));

    if (format === "excel") {
      exportToExcel("Loan_Applications_Pipeline", "Applications", exportData);
    } else {
      exportToCSV("Loan_Applications_Pipeline", exportData);
    }
  };

  const filtered = apps.filter((a) => {
    const matchesSearch =
      a.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.dsaName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatusTab === "all" || a.status === selectedStatusTab;
    const matchesProduct = productFilter === "all" || a.loanType === productFilter;

    return matchesSearch && matchesStatus && matchesProduct;
  });

  const columns = [
    {
      header: "Application & Customer",
      accessorKey: (row: LoanApplicationItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => {
            if (onOpenDetail) onOpenDetail(row);
            else setSelectedLoanForPanel(row);
          }}
        >
          <div className="font-mono font-bold text-blue-600 text-xs">{row.applicationNo}</div>
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.customerName}
          </div>
          <div className="text-[11px] text-slate-400">{row.customerPhone}</div>
        </div>
      ),
    },
    {
      header: "Product & Branch",
      accessorKey: (row: LoanApplicationItem) => (
        <div>
          <Badge variant="neutral" className="uppercase text-[10px] font-semibold">
            {row.loanType}
          </Badge>
          <div className="text-[11px] text-slate-500 mt-1">{row.branch}</div>
        </div>
      ),
    },
    {
      header: "Requested Loan",
      accessorKey: (row: LoanApplicationItem) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(row.amount)}
          </div>
          <div className="text-[11px] text-slate-400">
            {row.tenureMonths}m @ {row.interestRate}%
          </div>
        </div>
      ),
    },
    {
      header: "Sourced By",
      accessorKey: (row: LoanApplicationItem) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{row.channel}</span>
          <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{row.dsaName}</div>
        </div>
      ),
    },
    {
      header: "Pipeline Status",
      accessorKey: (row: LoanApplicationItem) => {
        const variant =
          row.status === LoanStatus.APPROVED || row.status === LoanStatus.DISBURSED
            ? "success"
            : row.status === LoanStatus.REJECTED
            ? "danger"
            : row.status === LoanStatus.UNDER_REVIEW || row.status === LoanStatus.PENDING_VERIFICATION
            ? "warning"
            : "neutral";

        return (
          <Badge variant={variant} className="uppercase text-[10px]">
            {row.status.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      header: "Date",
      accessorKey: (row: LoanApplicationItem) => (
        <span className="text-xs text-slate-500">{row.createdAt}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: LoanApplicationItem) => (
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={() => {
            if (onOpenDetail) onOpenDetail(row);
            else setSelectedLoanForPanel(row);
          }}
        >
          Review File
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Horizontal Status Pill Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {statusTabs.map((tab) => {
          const count =
            tab.id === "all" ? apps.length : apps.filter((a) => a.status === tab.id).length;
          const isSelected = selectedStatusTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-full sm:w-64">
          <Select
            label="Filter by Loan Product"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            options={[
              { label: "All Loan Products", value: "all" },
              { label: "Personal Loan", value: LoanType.PERSONAL },
              { label: "Mortgage Loan (LAP)", value: LoanType.MORTGAGE },
              { label: "Home Loan", value: LoanType.HOME },
              { label: "Business Loan", value: LoanType.BUSINESS },
              { label: "Car Loan", value: LoanType.CAR },
              { label: "Education Loan", value: LoanType.EDUCATION },
              { label: "Gold Loan", value: LoanType.GOLD },
            ]}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
            Export CSV
          </Button>
        </div>
      </div>

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Detail Panel Drawer */}
      <LoanDetailPanel
        isOpen={!!selectedLoanForPanel}
        onClose={() => setSelectedLoanForPanel(null)}
        loan={selectedLoanForPanel}
        onUpdateStatus={(id, status) => {
          handleStatusChange(id, status);
          if (selectedLoanForPanel && selectedLoanForPanel.id === id) {
            setSelectedLoanForPanel((prev) => (prev ? { ...prev, status } : null));
          }
        }}
      />
    </div>
  );
};
