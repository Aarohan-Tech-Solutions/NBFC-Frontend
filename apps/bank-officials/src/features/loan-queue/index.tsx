import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { loansApi } from "@nbfc/api-client";
import { Loan, LoanStatus } from "@nbfc/shared-types";
import { formatCurrency } from "../../lib/formatters";
import { exportToCSV } from "../../lib/exportUtils";
import { Badge, Button, Tabs, Select, Input } from "@nbfc/ui";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Filter, Download } from "lucide-react";

export const LoanQueueFeature: React.FC = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loansApi.getLoans().then((data) => {
      setLoans(data);
      setIsLoading(false);
    });
  }, []);

  const tabs = [
    { id: "all", label: "All Active Files" },
    { id: "pending_verification", label: "Pending Verification" },
    { id: "under_review", label: "Under Review" },
    { id: "approved", label: "Approved" },
    { id: "sanctioned", label: "Sanctioned" },
    { id: "disbursed", label: "Disbursed" },
    { id: "rejected", label: "Rejected" },
  ];

  const filteredLoans = loans.filter((loan) => {
    const matchesTab = activeTab === "all" || loan.status.toLowerCase() === activeTab;
    const matchesProduct = selectedProduct === "all" || loan.loanType.toLowerCase() === selectedProduct;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      loan.applicationNo.toLowerCase().includes(q) ||
      loan.customerName.toLowerCase().includes(q) ||
      loan.customerPhone.includes(q) ||
      (loan.dsaName && loan.dsaName.toLowerCase().includes(q));

    return matchesTab && matchesProduct && matchesSearch;
  });

  const handleExport = () => {
    const exportData = filteredLoans.map((l) => ({
      "Application No": l.applicationNo,
      "Customer Name": l.customerName,
      Product: l.loanType,
      Amount: l.amount,
      Tenure: `${l.tenureMonths} Months`,
      ROI: `${l.interestRate}%`,
      CIBIL: l.cibilScore,
      Status: l.status,
      "Sourcing Partner": l.dsaName || l.connectorName || "Direct",
      "Submitted Date": l.submittedAt,
    }));
    exportToCSV("Underwriting_Loan_Queue", exportData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Underwriting & Appraisal Pipeline"
        description="Multi-stage review queue for incoming loan files. Inspect applicant profiles, verify documents, evaluate credit risk, and issue decisions."
        action={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleExport} className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export Queue CSV
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#151722] p-4 rounded-2xl border border-slate-200 dark:border-[#242736]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by app #, borrower, phone..."
            className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-48">
            <Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              options={[
                { label: "All Loan Products", value: "all" },
                { label: "Home Loan", value: "home" },
                { label: "Mortgage Loan (LAP)", value: "mortgage" },
                { label: "Business Loan", value: "business" },
                { label: "Car Loan", value: "car" },
                { label: "Personal Loan", value: "personal" },
              ]}
            />
          </div>
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">
            Showing {filteredLoans.length} files
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#151722] rounded-2xl border border-slate-200 dark:border-[#242736] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a1d29] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-[#252838]">
              <tr>
                <th className="py-3.5 px-4">Application & Borrower</th>
                <th className="py-3.5 px-4">Product & Tenure</th>
                <th className="py-3.5 px-4">Loan Amount</th>
                <th className="py-3.5 px-4">CIBIL & Inflow</th>
                <th className="py-3.5 px-4">Sourcing Partner</th>
                <th className="py-3.5 px-4">SLA Ageing</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50 dark:hover:bg-[#181a24] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer" onClick={() => navigate(`/queue/${loan.applicationNo}`)}>
                      {loan.applicationNo}
                    </div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{loan.customerName}</div>
                    <div className="text-[11px] text-slate-400">{loan.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">{loan.loanType}</span>
                    <div className="text-[11px] text-slate-400">{loan.tenureMonths} Mos @ {loan.interestRate}%</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">{formatCurrency(loan.amount)}</div>
                    {loan.sanctionedAmount && (
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400">Sanctioned: {formatCurrency(loan.sanctionedAmount)}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      CIBIL {loan.cibilScore || 750}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-0.5">₹ {(loan.monthlyIncome / 1000).toFixed(0)}k / mo</div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    <div className="truncate max-w-[140px]">{loan.dsaName || loan.connectorName || "Direct Portal"}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      loan.slaHoursElapsed > 40
                        ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}>
                      {loan.slaHoursElapsed}h elapsed
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        loan.status === "sanctioned" || loan.status === "disbursed" || loan.status === "approved"
                          ? "success"
                          : loan.status === "rejected"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {loan.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/queue/${loan.applicationNo}`)}
                      className="text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      Appraise
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanQueueFeature;
