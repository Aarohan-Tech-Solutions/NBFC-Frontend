import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV, exportToPDF } from "../../lib/exportUtils";

interface ReportEntry {
  [key: string]: any;
}

export const ReportsFeature: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("loans");
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "loans", label: "Loan Reports" },
    { id: "branches", label: "Branch Reports" },
    { id: "dsa", label: "DSA Reports" },
    { id: "connectors", label: "Connector Reports" },
    { id: "customers", label: "Customer Reports" },
    { id: "commissions", label: "Commission Reports" },
    { id: "revenue", label: "Revenue Reports" },
    { id: "rejections", label: "Rejection Reports" },
  ];

  // Report Data Sets
  const loanReportData: ReportEntry[] = [
    { period: "Aug 2026", product: "Home Loan", applications: 142, sanctioned: 118, disbursedAmount: 53100000, avgRoi: "8.65%", avgTenure: "240m" },
    { period: "Aug 2026", product: "Mortgage Loan (LAP)", applications: 98, sanctioned: 74, disbursedAmount: 37000000, avgRoi: "9.75%", avgTenure: "180m" },
    { period: "Aug 2026", product: "Business Loan", applications: 76, sanctioned: 52, disbursedAmount: 18200000, avgRoi: "12.0%", avgTenure: "60m" },
    { period: "Aug 2026", product: "Personal Loan", applications: 210, sanctioned: 185, disbursedAmount: 14800000, avgRoi: "11.5%", avgTenure: "48m" },
    { period: "Aug 2026", product: "Car Loan", applications: 45, sanctioned: 38, disbursedAmount: 4560000, avgRoi: "9.0%", avgTenure: "60m" },
    { period: "Aug 2026", product: "Gold Loan", applications: 32, sanctioned: 32, disbursedAmount: 1440000, avgRoi: "8.5%", avgTenure: "12m" },
  ];

  const branchReportData: ReportEntry[] = [
    { branch: "Kolkata Central", area: "West Bengal East", target: 30000000, disbursed: 34500000, activeDSAs: 42, conversionPct: "74%", avgTat: "1.9d" },
    { branch: "Mumbai Nariman Point", area: "Maharashtra South", target: 28000000, disbursed: 31200000, activeDSAs: 38, conversionPct: "71%", avgTat: "2.1d" },
    { branch: "Delhi Connaught Place", area: "Delhi NCR North", target: 26000000, disbursed: 27800000, activeDSAs: 35, conversionPct: "68%", avgTat: "2.4d" },
    { branch: "Bengaluru Koramangala", area: "Karnataka Central", target: 25000000, disbursed: 24500000, activeDSAs: 29, conversionPct: "65%", avgTat: "2.2d" },
    { branch: "Hyderabad Hitech City", area: "Telangana West", target: 22000000, disbursed: 19800000, activeDSAs: 24, conversionPct: "62%", avgTat: "2.6d" },
    { branch: "Ahmedabad SG Highway", area: "Gujarat North", target: 20000000, disbursed: 18200000, activeDSAs: 22, conversionPct: "64%", avgTat: "2.5d" },
  ];

  const dsaReportData: ReportEntry[] = [
    { dsaCode: "DSA-1042", agencyName: "Apex Financial Solutions", branch: "Bengaluru", sourcedFiles: 45, disbursedAmount: 18400000, conversion: "76%", commissionAccrued: 276000 },
    { dsaCode: "DSA-1098", agencyName: "Star Loans Consultancy", branch: "Mumbai", sourcedFiles: 32, disbursedAmount: 14200000, conversion: "72%", commissionAccrued: 177500 },
    { dsaCode: "DSA-1120", agencyName: "Eastern Capital Partners", branch: "Kolkata", sourcedFiles: 54, disbursedAmount: 24800000, conversion: "78%", commissionAccrued: 372000 },
    { dsaCode: "DSA-1145", agencyName: "Capital Tree Advisory", branch: "Delhi", sourcedFiles: 14, disbursedAmount: 5600000, conversion: "60%", commissionAccrued: 56000 },
    { dsaCode: "DSA-1178", agencyName: "Deccan Financial Associates", branch: "Hyderabad", sourcedFiles: 28, disbursedAmount: 11500000, conversion: "68%", commissionAccrued: 143750 },
  ];

  const connectorReportData: ReportEntry[] = [
    { connectorCode: "CON-301", name: "Anand Deshmukh", city: "Pune", referredLeads: 38, converted: 28, volume: 14500000, totalCommission: 72500 },
    { connectorCode: "CON-304", name: "Sanjay Gupta", city: "Noida", referredLeads: 29, converted: 19, volume: 9800000, totalCommission: 49000 },
    { connectorCode: "CON-312", name: "Sunil Sen", city: "Kolkata", referredLeads: 42, converted: 31, volume: 16800000, totalCommission: 84000 },
    { connectorCode: "CON-320", name: "Meera Krishnan", city: "Bengaluru", referredLeads: 12, converted: 6, volume: 3200000, totalCommission: 16000 },
  ];

  const customerReportData: ReportEntry[] = [
    { customerId: "CUST-4091", name: "Rahul Kapoor", city: "Kolkata", employment: "Salaried", cibil: 782, activeLoans: 1, borrowed: 4500000, repaymentTrack: "Clean (0 Delinquency)" },
    { customerId: "CUST-4092", name: "Priya Sundaram", city: "Bengaluru", employment: "Salaried", cibil: 745, activeLoans: 1, borrowed: 1800000, repaymentTrack: "Clean (0 Delinquency)" },
    { customerId: "CUST-4093", name: "Rajeshwar Patel", city: "Ahmedabad", employment: "Business Owner", cibil: 810, activeLoans: 2, borrowed: 8500000, repaymentTrack: "Clean (0 Delinquency)" },
    { customerId: "CUST-4094", name: "Meenakshi Sen", city: "Kolkata", employment: "Professional", cibil: 720, activeLoans: 1, borrowed: 600000, repaymentTrack: "Clean (0 Delinquency)" },
  ];

  const commissionReportData: ReportEntry[] = [
    { period: "July 2026", partnerType: "DSA Channel", totalPartners: 42, grossCommission: 1845000, tdsDeducted: 92250, netPaid: 1752750, status: "Disbursed" },
    { period: "July 2026", partnerType: "Connector Network", totalPartners: 28, grossCommission: 420000, tdsDeducted: 21000, netPaid: 399000, status: "Disbursed" },
    { period: "June 2026", partnerType: "DSA Channel", totalPartners: 39, grossCommission: 1620000, tdsDeducted: 81000, netPaid: 1539000, status: "Disbursed" },
    { period: "June 2026", partnerType: "Connector Network", totalPartners: 24, grossCommission: 360000, tdsDeducted: 18000, netPaid: 342000, status: "Disbursed" },
  ];

  const revenueReportData: ReportEntry[] = [
    { month: "Aug 2026 (YTD)", interestIncome: 48500000, processingFees: 12450000, penaltyCollections: 450000, grossRevenue: 61400000, costOfFunds: 31200000, netSpread: 30200000 },
    { month: "Jul 2026", interestIncome: 45200000, processingFees: 11200000, penaltyCollections: 380000, grossRevenue: 56780000, costOfFunds: 29000000, netSpread: 27780000 },
    { month: "Jun 2026", interestIncome: 41800000, processingFees: 10400000, penaltyCollections: 320000, grossRevenue: 52520000, costOfFunds: 26800000, netSpread: 25720000 },
  ];

  const rejectionReportData: ReportEntry[] = [
    { rejectionCategory: "Low CIBIL Score (< 650)", count: 48, percentage: "38%", primaryProduct: "Personal & Business", mitigationStrategy: "Re-route to Gold Loan or Co-borrower" },
    { rejectionCategory: "High FOIR / Debt-to-Income (> 65%)", count: 32, percentage: "25%", primaryProduct: "Home & Mortgage", mitigationStrategy: "Tenure extension up to max allowable" },
    { rejectionCategory: "Property Legal Defect / Title Dispute", count: 22, percentage: "18%", primaryProduct: "Mortgage (LAP)", mitigationStrategy: "Alternate collateral submission" },
    { rejectionCategory: "Banking NACH / Cheque Bounces (> 3 in 6M)", count: 16, percentage: "13%", primaryProduct: "Business Loan", mitigationStrategy: "6-Month cooling period" },
    { rejectionCategory: "Negative Field Verification", count: 8, percentage: "6%", primaryProduct: "Personal Loan", mitigationStrategy: "Permanent blacklist flag" },
  ];

  const getActiveData = (): { data: ReportEntry[]; title: string; columns: any[] } => {
    switch (selectedCategory) {
      case "loans":
        return {
          data: loanReportData,
          title: `Loan Origination & Disbursement Report (${timeframe.toUpperCase()})`,
          columns: [
            { header: "Period", accessorKey: "period" as const },
            { header: "Product Scheme", accessorKey: "product" as const },
            { header: "Applications Sourced", accessorKey: "applications" as const },
            { header: "Sanctioned Files", accessorKey: "sanctioned" as const },
            { header: "Disbursed Volume", accessorKey: (r: any) => formatCurrency(r.disbursedAmount) },
            { header: "Avg ROI", accessorKey: "avgRoi" as const },
            { header: "Avg Tenure", accessorKey: "avgTenure" as const },
          ],
        };
      case "branches":
        return {
          data: branchReportData,
          title: "Branch Target vs Achievement Performance Report",
          columns: [
            { header: "Branch Name", accessorKey: "branch" as const },
            { header: "Regional Area", accessorKey: "area" as const },
            { header: "Target", accessorKey: (r: any) => formatCurrency(r.target) },
            { header: "Disbursed", accessorKey: (r: any) => formatCurrency(r.disbursed) },
            { header: "Active DSAs", accessorKey: "activeDSAs" as const },
            { header: "Conversion %", accessorKey: "conversionPct" as const },
            { header: "Avg Sourcing TAT", accessorKey: "avgTat" as const },
          ],
        };
      case "dsa":
        return {
          data: dsaReportData,
          title: "DSA Channel Partner Productivity & Payout Report",
          columns: [
            { header: "DSA Code", accessorKey: "dsaCode" as const },
            { header: "Agency Name", accessorKey: "agencyName" as const },
            { header: "Branch", accessorKey: "branch" as const },
            { header: "Sourced Files", accessorKey: "sourcedFiles" as const },
            { header: "Disbursed Volume", accessorKey: (r: any) => formatCurrency(r.disbursedAmount) },
            { header: "Conversion", accessorKey: "conversion" as const },
            { header: "Commission", accessorKey: (r: any) => formatCurrency(r.commissionAccrued) },
          ],
        };
      case "connectors":
        return {
          data: connectorReportData,
          title: "Connector Network Referral Productivity Report",
          columns: [
            { header: "Connector Code", accessorKey: "connectorCode" as const },
            { header: "Name", accessorKey: "name" as const },
            { header: "Operating City", accessorKey: "city" as const },
            { header: "Referred Leads", accessorKey: "referredLeads" as const },
            { header: "Converted", accessorKey: "converted" as const },
            { header: "Volume", accessorKey: (r: any) => formatCurrency(r.volume) },
            { header: "Total Payout", accessorKey: (r: any) => formatCurrency(r.totalCommission) },
          ],
        };
      case "customers":
        return {
          data: customerReportData,
          title: "Customer Demographic & Portfolio Exposure Report",
          columns: [
            { header: "Customer ID", accessorKey: "customerId" as const },
            { header: "Name", accessorKey: "name" as const },
            { header: "City", accessorKey: "city" as const },
            { header: "Employment", accessorKey: "employment" as const },
            { header: "CIBIL", accessorKey: "cibil" as const },
            { header: "Total Borrowed", accessorKey: (r: any) => formatCurrency(r.borrowed) },
            { header: "Repayment Track", accessorKey: "repaymentTrack" as const },
          ],
        };
      case "commissions":
        return {
          data: commissionReportData,
          title: "Partner Commission Payouts & Statutory TDS Report",
          columns: [
            { header: "Period", accessorKey: "period" as const },
            { header: "Partner Type", accessorKey: "partnerType" as const },
            { header: "Total Partners", accessorKey: "totalPartners" as const },
            { header: "Gross Commission", accessorKey: (r: any) => formatCurrency(r.grossCommission) },
            { header: "TDS (5%)", accessorKey: (r: any) => formatCurrency(r.tdsDeducted) },
            { header: "Net Paid", accessorKey: (r: any) => formatCurrency(r.netPaid) },
            { header: "Status", accessorKey: "status" as const },
          ],
        };
      case "revenue":
        return {
          data: revenueReportData,
          title: "Financial Revenue, Interest Spread & Fee Collection Report",
          columns: [
            { header: "Accounting Month", accessorKey: "month" as const },
            { header: "Interest Income", accessorKey: (r: any) => formatCurrency(r.interestIncome) },
            { header: "Processing Fees", accessorKey: (r: any) => formatCurrency(r.processingFees) },
            { header: "Gross Revenue", accessorKey: (r: any) => formatCurrency(r.grossRevenue) },
            { header: "Cost of Funds", accessorKey: (r: any) => formatCurrency(r.costOfFunds) },
            { header: "Net Interest Spread", accessorKey: (r: any) => formatCurrency(r.netSpread) },
          ],
        };
      case "rejections":
        return {
          data: rejectionReportData,
          title: "Underwriting Rejections, NPA Analytics & Risk Reasons Report",
          columns: [
            { header: "Rejection Reason", accessorKey: "rejectionCategory" as const },
            { header: "File Count", accessorKey: "count" as const },
            { header: "Percentage", accessorKey: "percentage" as const },
            { header: "Primary Product", accessorKey: "primaryProduct" as const },
            { header: "Mitigation Strategy", accessorKey: "mitigationStrategy" as const },
          ],
        };
      default:
        return { data: [], title: "", columns: [] };
    }
  };

  const currentReport = getActiveData();

  const handleExport = (format: "excel" | "csv" | "pdf") => {
    if (format === "excel") {
      exportToExcel(`Report_${selectedCategory}_${timeframe}`, selectedCategory, currentReport.data);
    } else if (format === "csv") {
      exportToCSV(`Report_${selectedCategory}_${timeframe}`, currentReport.data);
    } else if (format === "pdf") {
      const headers = currentReport.columns.map((c) => c.header);
      const rows = currentReport.data.map((row) =>
        currentReport.columns.map((c) => {
          if (typeof c.accessorKey === "function") return c.accessorKey(row);
          return row[c.accessorKey as string] ?? "";
        })
      );
      exportToPDF(`Report_${selectedCategory}`, currentReport.title, headers, rows);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics Engine"
        description="Comprehensive operational, regulatory, DSA productivity, commission payouts, and revenue reports with direct PDF, Excel, and CSV export."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button size="sm" onClick={() => handleExport("csv")}>
              Export CSV
            </Button>
          </div>
        }
      />

      <Tabs tabs={categories} activeTab={selectedCategory} onChange={setSelectedCategory} />

      {/* Date Range & Slicing Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Timeframe Range:</span>
          <button
            onClick={() => setTimeframe("daily")}
            className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
              timeframe === "daily" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            Daily / Today
          </button>
          <button
            onClick={() => setTimeframe("weekly")}
            className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
              timeframe === "weekly" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            Weekly (Last 7 Days)
          </button>
          <button
            onClick={() => setTimeframe("monthly")}
            className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
              timeframe === "monthly" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            Monthly (August 2026)
          </button>
          <button
            onClick={() => setTimeframe("yearly")}
            className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
              timeframe === "yearly" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            Yearly (FY 2026-27)
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total {currentReport.data.length} records in view
        </span>
      </div>

      {/* Report Table View */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {currentReport.title}
          </h3>
          <Badge variant="info" className="text-xs font-semibold">
            Confidential
          </Badge>
        </div>

        <DataTableWrapper
          data={currentReport.data}
          columns={currentReport.columns}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={() => handleExport("csv")}
        />
      </div>
    </div>
  );
};

export default ReportsFeature;
