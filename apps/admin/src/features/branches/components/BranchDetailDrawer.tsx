import React, { useState } from "react";
import { Drawer, Badge, Button, Tabs } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";

export interface BranchItem {
  id: string;
  code: string;
  name: string;
  area: string;
  manager: string;
  managerEmail: string;
  phone: string;
  address: string;
  activeLoans: number;
  totalDisbursed: number;
  target: number;
  staffCount: number;
  dsaCount: number;
  status: "Active" | "Inactive";
}

interface BranchDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  branch: BranchItem | null;
  onEdit: () => void;
}

export const BranchDetailDrawer: React.FC<BranchDetailDrawerProps> = ({
  isOpen,
  onClose,
  branch,
  onEdit,
}) => {
  const [subTab, setSubTab] = useState("overview");

  if (!branch) return null;

  const branchDocs = [
    { name: "Commercial Premises Lease Agreement", docNo: "LEASE-2024-49", status: "Verified", date: "15 Jan 2024" },
    { name: "Municipal Trade License", docNo: "TL-WB-884920", status: "Active", date: "01 Apr 2026" },
    { name: "Commercial Electricity Bill (Latest)", docNo: "CESC-8492019", status: "Verified", date: "05 Aug 2026" },
    { name: "Fire Safety NOC Certificate", docNo: "NOC-FIRE-2025-90", status: "Verified", date: "10 Nov 2025" },
  ];

  const branchUsers = [
    { name: branch.manager, role: "Branch Manager", email: branch.managerEmail, phone: branch.phone, status: "Active" },
    { name: "Ananya Mukherjee", role: "Senior Credit Analyst", email: "ananya.m@nbfc.com", phone: "+91 98327 89012", status: "Active" },
    { name: "Debabrata Sen", role: "Field Verification Officer", email: "debabrata.s@nbfc.com", phone: "+91 98319 44556", status: "Active" },
    { name: "Tanmoy Ghosh", role: "Customer Operations Staff", email: "tanmoy.g@nbfc.com", phone: "+91 98305 66778", status: "Active" },
  ];

  const tabs = [
    { id: "overview", label: "Branch Overview" },
    { id: "documents", label: "Branch Documents" },
    { id: "users", label: "Assigned Users & Staff" },
    { id: "performance", label: "Monthly Performance" },
  ];

  const achievementPct = Math.round((branch.totalDisbursed / branch.target) * 100);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${branch.name} (${branch.code})`}
      description={`Area: ${branch.area} • Status: ${branch.status}`}
      size="lg"
    >
      <div className="space-y-5">
        <Tabs tabs={tabs} activeTab={subTab} onChange={setSubTab} />

        {subTab === "overview" && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Branch Details</span>
                <Button size="sm" variant="outline" onClick={onEdit}>
                  Edit Branch
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Branch Code</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100 mt-0.5">{branch.code}</p>
                </div>
                <div>
                  <span className="text-slate-400">Branch Manager</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">{branch.manager}</p>
                </div>
                <div>
                  <span className="text-slate-400">Official Phone</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">{branch.phone}</p>
                </div>
              </div>

              <div className="text-xs pt-2">
                <span className="text-slate-400">Branch Office Address:</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{branch.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Disbursed Volume</span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{formatCurrency(branch.totalDisbursed)}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Active Loans</span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{branch.activeLoans} Loans</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Internal Staff</span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{branch.staffCount} Members</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium">Attached DSAs</span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{branch.dsaCount} Partners</p>
              </div>
            </div>
          </div>
        )}

        {subTab === "documents" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Branch Premises & Compliance Documents
              </h4>
              <Button size="sm" variant="outline">+ Upload Doc</Button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {branchDocs.map((doc, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Doc No: {doc.docNo} • Date: {doc.date}
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px]">{doc.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === "users" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Branch Staff Roster & Roles
              </h4>
              <Button size="sm" variant="outline">+ Assign User</Button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {branchUsers.map((u, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{u.name}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {u.role} • {u.email} • {u.phone}
                    </div>
                  </div>
                  <Badge variant="info" className="text-[10px]">{u.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === "performance" && (
          <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Achievement</span>
              <Badge variant={achievementPct >= 100 ? "success" : "info"}>{achievementPct}%</Badge>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${achievementPct >= 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                style={{ width: `${Math.min(achievementPct, 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <span className="text-slate-400">Monthly Target:</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{formatCurrency(branch.target)}</p>
              </div>
              <div>
                <span className="text-slate-400">Disbursed YTD:</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{formatCurrency(branch.totalDisbursed)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
