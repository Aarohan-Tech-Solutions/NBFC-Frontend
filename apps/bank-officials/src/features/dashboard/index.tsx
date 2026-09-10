import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { bankOfficialsApi, loansApi, verificationApi } from "@nbfc/api-client";
import { OfficialDashboardMetrics } from "@nbfc/shared-types";
import { formatCurrency } from "../../lib/formatters";
import { Badge, Button } from "@nbfc/ui";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  TrendingUp,
  Wallet,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { useOfficialAuthStore } from "../../stores/auth.store";

export const OfficialDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useOfficialAuthStore();
  const [metrics, setMetrics] = useState<OfficialDashboardMetrics | null>(null);
  const [recentLoans, setRecentLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      bankOfficialsApi.getDashboardMetrics(),
      loansApi.getLoans(),
    ]).then(([metricsData, loansData]) => {
      setMetrics(metricsData);
      setRecentLoans(loansData.slice(0, 5));
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !metrics) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Underwriting & Credit Desk — ${user?.assignedBranch || "Kolkata Central"}`}
        description="Official credit risk appraisal queue, document verification SLAs, sanction delegation, and disbursement release oversight."
        action={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate("/queue")}>
              View Full Queue
            </Button>
            <Button size="sm" onClick={() => navigate("/sanction")}>
              + Process Sanction
            </Button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736] shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Assigned Loan Files</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {metrics.totalAssignedFiles}
            </span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">Active Pipeline</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736] shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Verification</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
              {metrics.pendingVerificationCount}
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">KYC / Valuation</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736] shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">SLA / Ageing Alert</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-rose-600 dark:text-rose-400">
              {metrics.slaBreachedCount}
            </span>
            <span className="text-[11px] text-rose-600 dark:text-rose-400 font-bold">&gt; 48h Ageing</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#151722] p-5 rounded-2xl border border-slate-200 dark:border-[#242736] shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Portfolio Sanctioned (MTD)</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {formatCurrency(metrics.totalPortfolioValue)}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold">Avg TAT: {metrics.averageTurnaroundDays}d</span>
          </div>
        </div>
      </div>

      {/* Underwriting Queue Category Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151722] p-6 rounded-2xl border border-slate-200 dark:border-[#242736] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Active Verification Queues by Category
            </h3>
            <span className="text-xs text-emerald-500 font-semibold cursor-pointer" onClick={() => navigate("/verification")}>
              Go to Verification Desk &rarr;
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1b1e2b] border border-slate-200/80 dark:border-[#262a3c]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">KYC & Identity</span>
              <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {metrics.categoryQueueBreakdown.kyc} Files
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1b1e2b] border border-slate-200/80 dark:border-[#262a3c]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Bank & Income</span>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {metrics.categoryQueueBreakdown.financial} Files
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1b1e2b] border border-slate-200/80 dark:border-[#262a3c]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Property Valuation</span>
              <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {metrics.categoryQueueBreakdown.property} Files
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1b1e2b] border border-slate-200/80 dark:border-[#262a3c]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Guarantor Checks</span>
              <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {metrics.categoryQueueBreakdown.guarantor} Files
              </p>
            </div>
          </div>

          {/* SLA & Ageing Matrix */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#171924] border border-slate-200 dark:border-[#252838] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                Underwriting Turnaround Compliance (SLA Target: 48 Hours)
              </span>
              <span className="text-emerald-500">94.2% on Track</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: "82%" }} title="< 24h: 82%" />
              <div className="bg-amber-500 h-full" style={{ width: "12%" }} title="24-48h: 12%" />
              <div className="bg-rose-500 h-full" style={{ width: "6%" }} title="> 48h: 6%" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Fresh (&lt; 24h): 14 files</span>
              <span>Warning (24-48h): 3 files</span>
              <span className="text-rose-500 font-bold">Breached (&gt; 48h): 2 files</span>
            </div>
          </div>
        </div>

        {/* Official Authority Card */}
        <div className="bg-white dark:bg-[#151722] p-6 rounded-2xl border border-slate-200 dark:border-[#242736] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sanction Delegation</span>
              <Badge variant="success">Active Delegation</Badge>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {user?.sanctionLimit ? `₹ ${(user.sanctionLimit / 100000).toFixed(0)} Lakhs` : "Field Inspection"}
              </span>
              <p className="text-xs text-slate-500 mt-0.5">Max single-loan sanction approval threshold</p>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              onClick={() => navigate("/sanction")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1a1d28] dark:hover:bg-[#202434] transition-colors font-semibold text-slate-800 dark:text-slate-200"
            >
              <span>Sanction Letter Generator</span>
              <ArrowRight className="w-4 h-4 text-emerald-500" />
            </button>
            <button
              onClick={() => navigate("/disbursement")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1a1d28] dark:hover:bg-[#202434] transition-colors font-semibold text-slate-800 dark:text-slate-200"
            >
              <span>Authorize Fund Transfer</span>
              <ArrowRight className="w-4 h-4 text-emerald-500" />
            </button>
            <button
              onClick={() => navigate("/rejections")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1a1d28] dark:hover:bg-[#202434] transition-colors font-semibold text-slate-800 dark:text-slate-200"
            >
              <span>Issue Adverse Action Notice</span>
              <ArrowRight className="w-4 h-4 text-rose-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Underwriting Queue Files */}
      <div className="bg-white dark:bg-[#151722] p-6 rounded-2xl border border-slate-200 dark:border-[#242736] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Priority Underwriting Files Awaiting Action
            </h3>
            <p className="text-xs text-slate-400">Loan applications requiring verification or final credit decision</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate("/queue")}>
            View All ({recentLoans.length})
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a1d29] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-[#252838]">
              <tr>
                <th className="py-3 px-4">Application & Borrower</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Loan Amount</th>
                <th className="py-3 px-4">CIBIL Score</th>
                <th className="py-3 px-4">Sourcing Partner</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50 dark:hover:bg-[#181a24] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{loan.applicationNo}</div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{loan.customerName}</div>
                  </td>
                  <td className="py-3 px-4 uppercase text-slate-600 dark:text-slate-300 font-semibold">{loan.loanType}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{formatCurrency(loan.amount)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {loan.cibilScore || 750}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{loan.dsaName || loan.connectorName || "Direct / Portal"}</td>
                  <td className="py-3 px-4">
                    <Badge variant={loan.status === "sanctioned" ? "success" : "warning"}>
                      {loan.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => navigate(`/queue/${loan.applicationNo || loan.id}`)}
                    >
                      Appraise File
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

export default OfficialDashboard;
