import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Modal, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

interface VerificationTask {
  id: string;
  appNo: string;
  customerName: string;
  loanProduct: string;
  amount: number;
  category: "KYC" | "Document" | "Bank" | "Property" | "Guarantor";
  taskTitle: string;
  assignedOfficer: string;
  priority: "High" | "Medium" | "Normal";
  status: "Pending" | "In Progress" | "Verified" | "Action Required" | "Rejected";
  remarks: string;
  dueDate: string;
  checklist: { label: string; checked: boolean }[];
}

const initialTasks: VerificationTask[] = [
  { id: "1", appNo: "LA-9485", customerName: "Rahul Kapoor", loanProduct: "Home Loan", amount: 4500000, category: "Property", taskTitle: "Property Legal Search & Technical Valuation", assignedOfficer: "Advocate P. Sharma / Valuer M. Kulkarni", priority: "High", status: "Verified", remarks: "Clear 30-year title with no encumbrance. Fair valuation ₹ 65 Lakhs.", dueDate: "14 Aug 2026", checklist: [{ label: "30-Year Title Search Report Clear", checked: true }, { label: "Municipal Plan Sanction Approved", checked: true }, { label: "Site Technical Valuation > 125% of Loan", checked: true }, { label: "No Active Mortgages on CERSAI Registry", checked: true }] },
  { id: "2", appNo: "LA-9486", customerName: "Priya Sundaram", loanProduct: "Personal Loan", amount: 800000, category: "Bank", taskTitle: "Salary Inflow & Banking Analysis", assignedOfficer: "Credit Analyst A", priority: "High", status: "In Progress", remarks: "Monthly salary ₹ 1.10L credited from Infosys. Average quarterly balance is healthy.", dueDate: "16 Aug 2026", checklist: [{ label: "Net Salary Inflow verified on HDFC Statement", checked: true }, { label: "Salary Slip Tax Deductions consistent with Form 16", checked: true }, { label: "Zero ECS / NACH Bounces in last 6 months", checked: true }] },
  { id: "3", appNo: "LA-9487", customerName: "Rajeshwar Patel", loanProduct: "Business Loan", amount: 3500000, category: "KYC", taskTitle: "Business Entity & MSME Udyam Verification", assignedOfficer: "Field Inspector B", priority: "Medium", status: "Verified", remarks: "Manufacturing unit in Ahmedabad inspected. Machinery in working condition.", dueDate: "15 Aug 2026", checklist: [{ label: "GST Registration Verified on GSTN Portal", checked: true }, { label: "Factory Physical Premises Visited", checked: true }, { label: "Utility Electricity Bill in Entity Name", checked: true }] },
  { id: "4", appNo: "LA-9488", customerName: "Meenakshi Sen", loanProduct: "Mortgage Loan", amount: 2500000, category: "Guarantor", taskTitle: "Co-Borrower / Guarantor Net-Worth Verification", assignedOfficer: "Credit Officer C", priority: "Normal", status: "Verified", remarks: "Spouse consent and salary backing confirmed.", dueDate: "13 Aug 2026", checklist: [{ label: "Guarantor PAN & Aadhaar KYC Verified", checked: true }, { label: "Guarantor Net Worth & ITR Backing Confirmed", checked: true }, { label: "Signed Guarantee Deed in place", checked: true }] },
  { id: "5", appNo: "LA-9489", customerName: "Arun Nair", loanProduct: "Car Loan", amount: 1200000, category: "Document", taskTitle: "Dealer Proforma & RTO Registration Check", assignedOfficer: "Operations Staff D", priority: "Normal", status: "Pending", remarks: "Dealer invoice and hypothecation letter awaiting signature.", dueDate: "17 Aug 2026", checklist: [{ label: "Authorized Dealer Proforma Invoice Verified", checked: false }, { label: "Driving Licence Validation on Sarathi Portal", checked: true }, { label: "Hypothecation clause endorsed by Bank", checked: false }] },
];

export const VerificationFeature: React.FC = () => {
  const [tasks, setTasks] = useState<VerificationTask[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all");
  const [selectedTaskForReview, setSelectedTaskForReview] = useState<VerificationTask | null>(null);
  const [reviewRemarks, setReviewRemarks] = useState("");

  const categoryTabs = [
    { id: "all", label: "All Verification Queues" },
    { id: "KYC", label: "KYC & Identity" },
    { id: "Document", label: "Document Authenticity" },
    { id: "Bank", label: "Bank & Income" },
    { id: "Property", label: "Property Legal & Valuation" },
    { id: "Guarantor", label: "Guarantor Checks" },
  ];

  const handleOpenReview = (task: VerificationTask) => {
    setSelectedTaskForReview(task);
    setReviewRemarks(task.remarks);
  };

  const handleUpdateTaskStatus = (newStatus: VerificationTask["status"]) => {
    if (!selectedTaskForReview) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTaskForReview.id
          ? { ...t, status: newStatus, remarks: reviewRemarks }
          : t
      )
    );
    setSelectedTaskForReview(null);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = tasks.map((t) => ({
      "Application No": t.appNo,
      "Customer Name": t.customerName,
      Product: t.loanProduct,
      Amount: t.amount,
      Category: t.category,
      "Task Title": t.taskTitle,
      "Assigned Officer": t.assignedOfficer,
      Priority: t.priority,
      Status: t.status,
      "Due Date": t.dueDate,
      Remarks: t.remarks,
    }));

    if (format === "excel") {
      exportToExcel("Verification_Queue_Report", "Queue", exportData);
    } else {
      exportToCSV("Verification_Queue_Report", exportData);
    }
  };

  const filtered = tasks.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategoryTab === "all" || t.category === activeCategoryTab;

    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      header: "Task & Application",
      accessorKey: (row: VerificationTask) => (
        <div
          className="cursor-pointer group"
          onClick={() => handleOpenReview(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.taskTitle}
          </div>
          <div className="text-[11px] text-slate-400">
            <span className="font-mono font-semibold text-blue-600">{row.appNo}</span> • {row.customerName} (
            {row.loanProduct})
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: (row: VerificationTask) => (
        <Badge
          variant={
            row.category === "KYC"
              ? "info"
              : row.category === "Bank"
              ? "success"
              : row.category === "Property"
              ? "warning"
              : "neutral"
          }
          className="text-[10px]"
        >
          {row.category}
        </Badge>
      ),
    },
    {
      header: "Assigned Evaluator",
      accessorKey: (row: VerificationTask) => (
        <div className="text-xs text-slate-800 dark:text-slate-200">{row.assignedOfficer}</div>
      ),
    },
    {
      header: "Priority",
      accessorKey: (row: VerificationTask) => (
        <Badge
          variant={row.priority === "High" ? "danger" : row.priority === "Medium" ? "warning" : "neutral"}
          className="text-[10px]"
        >
          {row.priority}
        </Badge>
      ),
    },
    {
      header: "Verification Status",
      accessorKey: (row: VerificationTask) => (
        <Badge
          variant={
            row.status === "Verified"
              ? "success"
              : row.status === "In Progress"
              ? "info"
              : row.status === "Rejected"
              ? "danger"
              : "warning"
          }
          className="text-[10px]"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Due Date",
      accessorKey: (row: VerificationTask) => (
        <span className="text-xs text-slate-500">{row.dueDate}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: VerificationTask) => (
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={() => handleOpenReview(row)}
        >
          Review & Decision
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification Module"
        description="Underwriting verification queue for KYC biometric matches, banking analysis, property legal/technical title, and guarantor checks."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Queue
            </Button>
          </div>
        }
      />

      <Tabs tabs={categoryTabs} activeTab={activeCategoryTab} onChange={setActiveCategoryTab} />

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Verification Review Modal */}
      {selectedTaskForReview && (
        <Modal
          isOpen={!!selectedTaskForReview}
          onClose={() => setSelectedTaskForReview(null)}
          title={`Verification Review - ${selectedTaskForReview.taskTitle}`}
          className="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {selectedTaskForReview.customerName}
                  </h4>
                  <span className="font-mono text-blue-600 font-semibold">{selectedTaskForReview.appNo}</span> •{" "}
                  <span className="text-slate-500">{selectedTaskForReview.loanProduct} ({formatCurrency(selectedTaskForReview.amount)})</span>
                </div>
                <Badge variant={selectedTaskForReview.status === "Verified" ? "success" : "warning"}>
                  {selectedTaskForReview.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-500 pt-1">
                <div>Evaluator: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTaskForReview.assignedOfficer}</span></div>
                <div>Due Date: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTaskForReview.dueDate}</span></div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] block">
                Verification Verification Checklist:
              </span>
              <div className="space-y-1.5 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                {selectedTaskForReview.checklist.map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Remarks input */}
            <div>
              <label className="block font-bold text-slate-900 dark:text-slate-100 mb-1.5 text-[11px] uppercase tracking-wider">
                Official Verification Remarks & Field Findings:
              </label>
              <textarea
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
                value={reviewRemarks}
                onChange={(e) => setReviewRemarks(e.target.value)}
                placeholder="Enter detailed field evaluation remarks, valuation notes, or reasons for rejection..."
              />
            </div>

            {/* Decision Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                className="text-rose-600 hover:bg-rose-50"
                onClick={() => handleUpdateTaskStatus("Rejected")}
              >
                Reject Verification
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-amber-600 hover:bg-amber-50"
                  onClick={() => handleUpdateTaskStatus("Action Required")}
                >
                  Request More Documents
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUpdateTaskStatus("Verified")}
                >
                  Approve & Clear Task
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VerificationFeature;
