import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Modal, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";
import { getRequiredDocuments, LoanType, EmploymentType } from "@nbfc/shared-types";

interface VerificationTask {
  id: string;
  appNo: string;
  customerName: string;
  loanProduct: string;
  employmentType: EmploymentType;
  amount: number;
  category: "KYC" | "Document" | "Bank" | "Property" | "Guarantor";
  taskTitle: string;
  assignedOfficer: string;
  priority: "High" | "Medium" | "Normal";
  status: "Pending" | "In Progress" | "Verified" | "Action Required" | "Rejected";
  remarks: string;
  dueDate: string;
  coApplicantName?: string;
  coApplicantRelationship?: string;
  checklist?: { label: string; checked: boolean }[];
}

const initialTasks: VerificationTask[] = [
  {
    id: "1",
    appNo: "LA-9485",
    customerName: "Rahul Kapoor",
    loanProduct: "Mortgage Loan",
    employmentType: "self_employed",
    amount: 4500000,
    category: "Property",
    taskTitle: "Property Legal Search & 30-Yr Title Valuation",
    assignedOfficer: "Advocate P. Sharma / Valuer M. Kulkarni",
    priority: "High",
    status: "Verified",
    remarks: "Clear 30-year title with no encumbrance. Fair market valuation ₹ 65 Lakhs.",
    dueDate: "14 Aug 2026",
    coApplicantName: "Sunita Kapoor",
    coApplicantRelationship: "Spouse & Co-Owner (C/O Applicant)",
  },
  {
    id: "2",
    appNo: "LA-9486",
    customerName: "Priya Sundaram",
    loanProduct: "Personal Loan",
    employmentType: "salaried",
    amount: 800000,
    category: "Bank",
    taskTitle: "Salary Inflow & Banking Analysis",
    assignedOfficer: "Credit Analyst A",
    priority: "High",
    status: "In Progress",
    remarks: "Monthly salary ₹ 1.10L credited from Infosys. Average quarterly balance healthy.",
    dueDate: "16 Aug 2026",
  },
  {
    id: "3",
    appNo: "LA-9487",
    customerName: "Rajeshwar Patel",
    loanProduct: "Business Loan",
    employmentType: "business_owner",
    amount: 3500000,
    category: "KYC",
    taskTitle: "Business Entity & MSME Udyam Verification",
    assignedOfficer: "Field Inspector B",
    priority: "Medium",
    status: "Verified",
    remarks: "Manufacturing unit in Ahmedabad inspected. Machinery in working condition.",
    dueDate: "15 Aug 2026",
  },
  {
    id: "4",
    appNo: "LA-9488",
    customerName: "Meenakshi Sen",
    loanProduct: "Mortgage Loan",
    employmentType: "self_employed",
    amount: 2500000,
    category: "Property",
    taskTitle: "Land Conversion & Property Estimate Check",
    assignedOfficer: "Credit Officer C",
    priority: "Normal",
    status: "Verified",
    remarks: "Deed and land mutation records validated with municipality.",
    dueDate: "13 Aug 2026",
    coApplicantName: "Subrata Sen",
    coApplicantRelationship: "Father (Applicant C/O Applicant)",
  },
  {
    id: "5",
    appNo: "LA-9489",
    customerName: "Arun Nair",
    loanProduct: "Car Loan",
    employmentType: "salaried",
    amount: 1200000,
    category: "Guarantor",
    taskTitle: "2-Guarantor KYC & Bank Statement Check",
    assignedOfficer: "Operations Staff D",
    priority: "Normal",
    status: "Pending",
    remarks: "Guarantor PAN verified, awaiting signed guarantee deed.",
    dueDate: "17 Aug 2026",
  },
];

export const VerificationFeature: React.FC = () => {
  const [tasks, setTasks] = useState<VerificationTask[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>("all");
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all");
  const [selectedTaskForReview, setSelectedTaskForReview] = useState<VerificationTask | null>(null);
  const [reviewRemarks, setReviewRemarks] = useState("");
  const [reviewApplicantType, setReviewApplicantType] = useState<EmploymentType>("salaried");

  // Determine dynamic tabs based on selected loan product filter
  const getCategoryTabs = () => {
    const isMortgage = selectedProductFilter.toLowerCase().includes("mortgage");
    const isCar = selectedProductFilter.toLowerCase().includes("car");
    const isPersonal = selectedProductFilter.toLowerCase().includes("personal");

    const baseTabs = [
      { id: "all", label: "All Verification Queues" },
      { id: "KYC", label: "KYC & Identity" },
      { id: "Document", label: "Document Authenticity" },
      { id: "Bank", label: "Bank & Income Analysis" },
    ];

    if (selectedProductFilter === "all") {
      baseTabs.push(
        { id: "Property", label: "Property Legal & Valuation (Mortgage)" },
        { id: "Guarantor", label: "Guarantor Checks (Car / Secured)" }
      );
    } else if (isMortgage) {
      baseTabs.push({ id: "Property", label: "Property Legal & Valuation" });
    } else if (isCar) {
      baseTabs.push({ id: "Guarantor", label: "2-Guarantor Checks" });
    }

    return baseTabs;
  };

  const categoryTabs = getCategoryTabs();

  const handleOpenReview = (task: VerificationTask) => {
    setSelectedTaskForReview(task);
    setReviewRemarks(task.remarks);
    setReviewApplicantType(task.employmentType || "salaried");
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
      "Employment Type": t.employmentType,
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

    const matchesProduct =
      selectedProductFilter === "all" ||
      t.loanProduct.toLowerCase().includes(selectedProductFilter.toLowerCase());

    const matchesCategory = activeCategoryTab === "all" || t.category === activeCategoryTab;

    return matchesSearch && matchesProduct && matchesCategory;
  });

  // Dynamic requirements list for review modal
  const dynamicChecklist = selectedTaskForReview
    ? getRequiredDocuments(selectedTaskForReview.loanProduct, {
        employmentType: reviewApplicantType,
        hasCoApplicant: Boolean(selectedTaskForReview.coApplicantName),
      })
    : [];

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
          {row.coApplicantName && (
            <div className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
              Co-Applicant: {row.coApplicantName} ({row.coApplicantRelationship})
            </div>
          )}
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
      header: "Assigned Underwriter",
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
      header: "Status",
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
        <span className="text-xs text-slate-500 font-mono">{row.dueDate}</span>
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
        title="Verification Queue Module"
        description="Config-driven underwriting verification queue. Task tabs dynamically adapt to the active loan product (e.g. Property Valuation appears for Mortgage, Guarantor Checks for Car loans)."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Queue
            </Button>
          </div>
        }
      />

      {/* Loan Product Filter Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-full sm:w-72">
          <Select
            label="Filter by Loan Product (Adapts Tabs)"
            value={selectedProductFilter}
            onChange={(e) => {
              setSelectedProductFilter(e.target.value);
              setActiveCategoryTab("all");
            }}
            options={[
              { label: "All Loan Products", value: "all" },
              { label: "Personal Loan", value: "personal" },
              { label: "Mortgage Loan (LAP)", value: "mortgage" },
              { label: "Car / Auto Loan", value: "car" },
              { label: "Business Loan", value: "business" },
              { label: "Home Loan", value: "home" },
            ]}
          />
        </div>

        <div className="text-xs text-slate-500">
          Showing {filtered.length} active verification items
        </div>
      </div>

      {/* Dynamic Tabs based on Product */}
      <Tabs tabs={categoryTabs} activeTab={activeCategoryTab} onChange={setActiveCategoryTab} />

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Dynamic Verification Review Modal */}
      {selectedTaskForReview && (
        <Modal
          isOpen={!!selectedTaskForReview}
          onClose={() => setSelectedTaskForReview(null)}
          title={`Underwriting Review - ${selectedTaskForReview.taskTitle}`}
          className="max-w-3xl"
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
                  <span className="text-slate-500 font-semibold">{selectedTaskForReview.loanProduct} ({formatCurrency(selectedTaskForReview.amount)})</span>
                </div>
                <Badge variant={selectedTaskForReview.status === "Verified" ? "success" : "warning"}>
                  {selectedTaskForReview.status}
                </Badge>
              </div>

              {selectedTaskForReview.coApplicantName && (
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs">
                  <span className="font-bold">Co-Applicant (C/O Relationship): </span>
                  {selectedTaskForReview.coApplicantName} — {selectedTaskForReview.coApplicantRelationship}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-500 pt-1">
                <div>Underwriter: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTaskForReview.assignedOfficer}</span></div>
                <div>Due Date: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTaskForReview.dueDate}</span></div>
                <div>Priority: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTaskForReview.priority}</span></div>
              </div>
            </div>

            {/* Employment Type Context Selector */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Applicant Employment Category:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReviewApplicantType("salaried")}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                    reviewApplicantType === "salaried"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Salaried
                </button>
                <button
                  type="button"
                  onClick={() => setReviewApplicantType("self_employed")}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                    reviewApplicantType === "self_employed"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Self-Employed / Business
                </button>
              </div>
            </div>

            {/* Dynamic Config-Driven Document Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                  Config-Driven Document Checklist ({selectedTaskForReview.loanProduct}):
                </span>
                <span className="text-[10px] text-slate-400">
                  {dynamicChecklist.filter((d) => d.isMandatory).length} Mandatory Requirements
                </span>
              </div>

              <div className="space-y-1.5 border border-slate-200 dark:border-slate-800 p-3 rounded-xl max-h-56 overflow-y-auto custom-scrollbar">
                {dynamicChecklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-2.5 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={item.isMandatory}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {item.title}
                        </span>
                        {item.isMandatory ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold">
                            Mandatory
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-semibold">
                            Conditional: {item.conditionalNote || "Optional"}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                    </div>
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
                placeholder="Enter field evaluation remarks, valuation findings, or reasons for rejection..."
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
