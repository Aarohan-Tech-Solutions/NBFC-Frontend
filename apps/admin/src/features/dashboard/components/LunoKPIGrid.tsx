import React from "react";
import {
  FileText,
  DollarSign,
  Clock,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  UserCheck,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useAuthStore } from "../../../stores/auth.store";
import { Role } from "@nbfc/shared-types";

interface KPICardItem {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  badge?: string;
}

export const LunoKPIGrid: React.FC = () => {
  const { role } = useAuthStore();
  const currentRole = role || Role.SUPER_ADMIN;

  const getKPIs = (): KPICardItem[] => {
    switch (currentRole) {
      case Role.STAFF:
        return [
          {
            id: "1",
            title: "Assigned Underwriting Queue",
            value: "18 Files",
            change: "+3 Today",
            isPositive: true,
            icon: FileText,
          },
          {
            id: "2",
            title: "Pending KYC Biometrics",
            value: "6 Files",
            change: "Action Required",
            isPositive: false,
            icon: Clock,
          },
          {
            id: "3",
            title: "Bank Statement Analysis",
            value: "5 Files",
            change: "2 In Review",
            isPositive: true,
            icon: DollarSign,
          },
          {
            id: "4",
            title: "Property Valuation Checks",
            value: "4 Files",
            change: "Valuer Assigned",
            isPositive: true,
            icon: CheckCircle2,
          },
          {
            id: "5",
            title: "SLA Due Today (< 4h)",
            value: "3 Files",
            change: "High Priority",
            isPositive: false,
            icon: ShieldAlert,
          },
          {
            id: "6",
            title: "Avg Decision TAT",
            value: "4.2 Hours",
            change: "-18% Faster",
            isPositive: true,
            icon: Zap,
          },
        ];

      case Role.CONNECTOR:
        return [
          {
            id: "1",
            title: "Total Referred Leads",
            value: "42 Leads",
            change: "+6 this month",
            isPositive: true,
            icon: Target,
          },
          {
            id: "2",
            title: "Converted into Loans",
            value: "31 Files",
            change: "+73.8% Rate",
            isPositive: true,
            icon: CheckCircle2,
          },
          {
            id: "3",
            title: "Total Disbursed Volume",
            value: "₹ 1.68 Cr",
            change: "+15.2%",
            isPositive: true,
            icon: DollarSign,
          },
          {
            id: "4",
            title: "Commission Paid",
            value: "₹ 1,14,000",
            change: "Settled",
            isPositive: true,
            icon: TrendingUp,
          },
          {
            id: "5",
            title: "Pending Commission",
            value: "₹ 32,000",
            change: "Under Verification",
            isPositive: false,
            icon: Clock,
          },
          {
            id: "6",
            title: "Partner Rating",
            value: "4.9 / 5.0",
            change: "Top 5% Connector",
            isPositive: true,
            icon: Zap,
          },
        ];

      case Role.DSA:
        return [
          {
            id: "1",
            title: "Sourced Applications",
            value: "45 Files",
            change: "+8 this month",
            isPositive: true,
            icon: FileText,
          },
          {
            id: "2",
            title: "Disbursed Volume (YTD)",
            value: "₹ 1.84 Cr",
            change: "+18.5%",
            isPositive: true,
            icon: DollarSign,
          },
          {
            id: "3",
            title: "Total Commission Accrued",
            value: "₹ 2,76,000",
            change: "+12.4%",
            isPositive: true,
            icon: TrendingUp,
          },
          {
            id: "4",
            title: "Pending Payout",
            value: "₹ 42,500",
            change: "Next Batch: 25th",
            isPositive: true,
            icon: Clock,
          },
          {
            id: "5",
            title: "Attached Connectors",
            value: "12 Partners",
            change: "+2 New",
            isPositive: true,
            icon: UserCheck,
          },
          {
            id: "6",
            title: "Lead Conversion Rate",
            value: "76.8%",
            change: "+4.2%",
            isPositive: true,
            icon: CheckCircle2,
          },
        ];

      case Role.BRANCH_MANAGER:
        return [
          {
            id: "1",
            title: "Branch Applications (BR-KOL)",
            value: "54 Files",
            change: "+11.2%",
            isPositive: true,
            icon: FileText,
          },
          {
            id: "2",
            title: "Disbursed This Month",
            value: "₹ 64.5 Lakhs",
            change: "86% of Target",
            isPositive: true,
            icon: DollarSign,
          },
          {
            id: "3",
            title: "Underwriting Queue",
            value: "9 Pending",
            change: "-3 today",
            isPositive: true,
            icon: Clock,
          },
          {
            id: "4",
            title: "Active Branch DSAs",
            value: "18 Partners",
            change: "4 Active today",
            isPositive: true,
            icon: Users,
          },
          {
            id: "5",
            title: "Branch Sanction Limit",
            value: "₹ 25 Lakhs / file",
            change: "Auto-Sanction: ON",
            isPositive: true,
            icon: Zap,
          },
          {
            id: "6",
            title: "Branch Approval Rate",
            value: "89.5%",
            change: "+2.1%",
            isPositive: true,
            icon: CheckCircle2,
          },
        ];

      case Role.AREA_MANAGER:
        return [
          {
            id: "1",
            title: "Area Applications (WB-E)",
            value: "148 Files",
            change: "+8.4%",
            isPositive: true,
            icon: FileText,
          },
          {
            id: "2",
            title: "Area Disbursed Volume",
            value: "₹ 1.42 Cr",
            change: "+12.1%",
            isPositive: true,
            icon: DollarSign,
          },
          {
            id: "3",
            title: "Pending Verifications",
            value: "14 Files",
            change: "Across 8 Branches",
            isPositive: false,
            icon: Clock,
          },
          {
            id: "4",
            title: "Regional DSAs & Connectors",
            value: "42 Partners",
            change: "+5 this quarter",
            isPositive: true,
            icon: Users,
          },
          {
            id: "5",
            title: "Target Achievement",
            value: "108%",
            change: "Target: ₹ 1.30 Cr",
            isPositive: true,
            icon: TrendingUp,
          },
          {
            id: "6",
            title: "Regional Approval Rate",
            value: "87.2%",
            change: "+1.9%",
            isPositive: true,
            icon: CheckCircle2,
          },
        ];

      case Role.COMPANY_ADMIN:
      case Role.SUPER_ADMIN:
      default:
        return [
          {
            id: "1",
            title: "New Applications",
            value: "542 Files",
            change: "+14.2%",
            isPositive: true,
            icon: FileText,
          },
          {
            id: "2",
            title: "Disbursed This Month",
            value: "₹ 4.85 Cr",
            change: "+18.4%",
            isPositive: true,
            icon: DollarSign,
          },
          {
            id: "3",
            title: "Pending Verification",
            value: "38 Files",
            change: "-4.2%",
            isPositive: true,
            icon: Clock,
          },
          {
            id: "4",
            title: "Active DSAs & Connectors",
            value: "184 Partners",
            change: "+12.0%",
            isPositive: true,
            icon: Users,
          },
          {
            id: "5",
            title: "Total Disbursed Value",
            value: "₹ 68.4 Cr",
            change: "+24.1%",
            isPositive: true,
            icon: TrendingUp,
          },
          {
            id: "6",
            title: "Approval Rate",
            value: "84.6%",
            change: "+2.8%",
            isPositive: true,
            icon: CheckCircle2,
          },
        ];
    }
  };

  const kpis = getKPIs();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
      {kpis.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-[#171922] hover:bg-slate-50 dark:hover:bg-[#1b1e29] border border-slate-200/80 dark:border-[#252836] hover:border-slate-300 dark:hover:border-[#2f3346] rounded-2xl p-4 flex flex-col justify-between transition-all shadow-sm group min-h-[120px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block truncate">
                {card.title}
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight block truncate">
                {card.value}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={`text-[11px] font-bold flex items-center shrink-0 ${
                    card.isPositive ? "text-teal-600 dark:text-[#00d2b4]" : "text-rose-500"
                  }`}
                >
                  {card.isPositive ? (
                    <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
                  )}
                  {card.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LunoKPIGrid;
