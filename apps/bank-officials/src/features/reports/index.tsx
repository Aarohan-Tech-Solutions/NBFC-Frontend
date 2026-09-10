import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { reportsApi } from "@nbfc/api-client";
import { formatCurrency } from "../../lib/formatters";
import { exportToCSV } from "../../lib/exportUtils";
import { Button, Badge } from "@nbfc/ui";
import { BarChart3, Download, Clock, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

export const OfficialReportsFeature: React.FC = () => {
  const [portfolio, setPortfolio] = useState<any | null>(null);
  const [branchData, setBranchData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([reportsApi.getPortfolioSummary(), reportsApi.getBranchReports()]).then(
      ([port, branches]) => {
        setPortfolio(port);
        setBranchData(branches);
      }
    );
  }, []);

  const handleExport = () => {
    if (!branchData.length) return;
    const exportData = branchData.map((b) => ({
      Branch: b.branchName,
      "Disbursed (₹)": b.disbursed,
      "Target (₹)": b.target,
      "Average TAT (Days)": b.tat,
      "SLA Adherence (%)": `${b.slaAdherence}%`,
    }));
    exportToCSV("Underwriting_Branch_Performance_Report", exportData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Underwriting TAT & Branch Credit Risk Analytics"
        description="Monitor loan sanction turnaround times (TAT), SLA compliance percentages, credit quality, and product portfolio distribution."
        action={
          <Button size="sm" variant="outline" onClick={handleExport} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Analytics CSV
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Average Underwriting TAT</span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">3.2 Days</p>
          <span className="text-[10px] text-emerald-500 font-semibold">Target &lt; 4.0 Days</span>
        </div>

        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">SLA Adherence Rate</span>
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">94.8%</p>
          <span className="text-[10px] text-blue-500 font-semibold">Decisions within 48h</span>
        </div>

        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736]">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total AUM Managed</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-2">
            {formatCurrency(portfolio?.totalAUM || 425000000)}
          </p>
          <span className="text-[10px] text-purple-500 font-semibold">Across all active schemes</span>
        </div>
      </div>

      {/* Branch Table */}
      <div className="bg-white dark:bg-[#151722] rounded-2xl border border-slate-200 dark:border-[#242736] p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Branch-Level Underwriting Efficiency & Disbursal Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a1d29] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-[#252838]">
              <tr>
                <th className="py-3 px-4">Branch Office</th>
                <th className="py-3 px-4">MTD Disbursal</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Average TAT</th>
                <th className="py-3 px-4">SLA Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {branchData.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#181a24] transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{b.branchName}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(b.disbursed)}</td>
                  <td className="py-3 px-4 text-slate-500">{formatCurrency(b.target)}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800 dark:text-slate-200">{b.tat} Days</td>
                  <td className="py-3 px-4">
                    <Badge variant={b.slaAdherence > 92 ? "success" : "warning"}>
                      {b.slaAdherence}%
                    </Badge>
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

export default OfficialReportsFeature;
