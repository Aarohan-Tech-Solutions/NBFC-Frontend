import React, { useState } from "react";
import { Drawer, Badge, Button, Tabs } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";

export interface DSAItem {
  id: string;
  code: string;
  agencyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  area: string;
  branch: string;
  tier: "Platinum" | "Gold" | "Silver";
  kycStatus: "Verified" | "Pending" | "Rejected";
  activeLoans: number;
  totalDisbursed: number;
  commissionRate: number;
  portalAccess: boolean;
  pan: string;
  gstin: string;
  bankAccount: string;
  bankIfsc: string;
}

interface DSADetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dsa: DSAItem | null;
  onEdit: () => void;
  onUpdateStatus: (id: string, updates: Partial<DSAItem>) => void;
}

export const DSADetailDrawer: React.FC<DSADetailDrawerProps> = ({
  isOpen,
  onClose,
  dsa,
  onEdit,
  onUpdateStatus,
}) => {
  const [subTab, setSubTab] = useState("profile");

  if (!dsa) return null;

  const kycDocs = [
    { name: "Owner PAN Card", docNo: dsa.pan, status: dsa.kycStatus, date: "12 May 2026" },
    { name: "Agency GSTIN Registration", docNo: dsa.gstin, status: dsa.kycStatus, date: "12 May 2026" },
    { name: "Cancelled Cheque / Bank Proof", docNo: `${dsa.bankIfsc} / ${dsa.bankAccount}`, status: dsa.kycStatus, date: "12 May 2026" },
    { name: "Owner Aadhaar & Biometric Match", docNo: "XXXX-XXXX-8921", status: "Verified", date: "12 May 2026" },
  ];

  const dsaDocuments = [
    { name: "Master DSA Channel Partner Agreement", version: "v2.1", date: "14 May 2026", validTill: "13 May 2027", status: "Signed & Executed" },
    { name: "Commission Structure Addendum", version: "v1.0", date: "14 May 2026", validTill: "13 May 2027", status: "Approved" },
    { name: "Code of Conduct & Compliance Undertaking", version: "v1.0", date: "14 May 2026", validTill: "Active", status: "Verified" },
  ];

  const recentPayouts = [
    { id: "PAY-901", period: "July 2026", amount: 142500, tds: 7125, netPaid: 135375, status: "Paid", utr: "HDFC98492019" },
    { id: "PAY-842", period: "June 2026", amount: 118000, tds: 5900, netPaid: 112100, status: "Paid", utr: "HDFC88492011" },
    { id: "PAY-790", period: "May 2026", amount: 96000, tds: 4800, netPaid: 91200, status: "Paid", utr: "HDFC77281920" },
  ];

  const tabs = [
    { id: "profile", label: "DSA Profile" },
    { id: "kyc", label: "DSA KYC" },
    { id: "documents", label: "DSA Documents" },
    { id: "performance", label: "Performance" },
    { id: "commission", label: "Commission" },
    { id: "access", label: "Login Access" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${dsa.agencyName} (${dsa.code})`}
      description={`Partner Tier: ${dsa.tier} • Branch: ${dsa.branch}`}
      size="lg"
    >
      <div className="space-y-5">
        <Tabs tabs={tabs} activeTab={subTab} onChange={setSubTab} />

        {/* Profile */}
        {subTab === "profile" && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{dsa.agencyName}</h3>
                  <p className="text-xs text-slate-500">Contact: {dsa.contactPerson} • {dsa.email}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={dsa.tier === "Platinum" ? "danger" : dsa.tier === "Gold" ? "warning" : "info"}>
                    {dsa.tier} Tier
                  </Badge>
                  <Button size="sm" variant="outline" onClick={onEdit}>
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div>
                  <span className="text-slate-400">PAN</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{dsa.pan}</p>
                </div>
                <div>
                  <span className="text-slate-400">GSTIN</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{dsa.gstin}</p>
                </div>
                <div>
                  <span className="text-slate-400">Bank Account</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{dsa.bankAccount}</p>
                </div>
                <div>
                  <span className="text-slate-400">Bank IFSC</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{dsa.bankIfsc}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Sourced Disbursals</span>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{formatCurrency(dsa.totalDisbursed)}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Active Files</span>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{dsa.activeLoans} Applications</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Commission Rate</span>
                <p className="text-base font-bold text-blue-600 dark:text-blue-400 mt-1">{dsa.commissionRate}% Payout</p>
              </div>
            </div>
          </div>
        )}

        {/* KYC */}
        {subTab === "kyc" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  DSA Identity & Business KYC Verification
                </h4>
                <p className="text-xs text-slate-500">Current Status: {dsa.kycStatus}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-rose-600 hover:bg-rose-50"
                  onClick={() => onUpdateStatus(dsa.id, { kycStatus: "Rejected" })}
                >
                  Reject KYC
                </Button>
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(dsa.id, { kycStatus: "Verified" })}
                >
                  Approve KYC
                </Button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {kycDocs.map((doc, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Value: <span className="font-mono font-semibold">{doc.docNo}</span> • Verified on: {doc.date}
                    </div>
                  </div>
                  <Badge variant={doc.status === "Verified" ? "success" : "warning"} className="text-[10px]">
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {subTab === "documents" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Executed Partner Agreements
              </h4>
              <Button size="sm" variant="outline">+ Upload Agreement</Button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {dsaDocuments.map((doc, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{doc.name}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Version: {doc.version} • Date: {doc.date} • Valid: {doc.validTill}
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px]">{doc.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance */}
        {subTab === "performance" && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Quarterly Sourcing Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Total Leads Submitted</span>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">86 Leads</p>
                </div>
                <div>
                  <span className="text-slate-400">Files Converted</span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">62 Disbursed</p>
                </div>
                <div>
                  <span className="text-slate-400">Conversion Rate</span>
                  <p className="text-base font-bold text-blue-600 mt-0.5">72.1%</p>
                </div>
                <div>
                  <span className="text-slate-400">Avg File Sourcing TAT</span>
                  <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">1.8 Days</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Commission */}
        {subTab === "commission" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <div>
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">Pending Accrued Commission</span>
                <p className="text-lg font-black text-blue-900 dark:text-blue-100 mt-0.5">{formatCurrency(184200)}</p>
              </div>
              <Button size="sm">Initiate Payout</Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Payout History
              </h4>
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Period</th>
                      <th className="py-2.5 px-3 font-semibold">Gross Commission</th>
                      <th className="py-2.5 px-3 font-semibold">TDS (5%)</th>
                      <th className="py-2.5 px-3 font-semibold">Net Paid</th>
                      <th className="py-2.5 px-3 font-semibold">UTR</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recentPayouts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">{p.period}</td>
                        <td className="py-2.5 px-3">{formatCurrency(p.amount)}</td>
                        <td className="py-2.5 px-3 text-rose-500">-{formatCurrency(p.tds)}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-600">{formatCurrency(p.netPaid)}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{p.utr}</td>
                        <td className="py-2.5 px-3 text-right">
                          <Badge variant="success" className="text-[10px]">{p.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Access */}
        {subTab === "access" && (
          <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              DSA Partner Portal Access Controls
            </h4>

            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700/50">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Portal Login Status</span>
                <p className="text-[11px] text-slate-500">Enable or suspend DSA partner portal login privileges</p>
              </div>
              <Button
                size="sm"
                variant={dsa.portalAccess ? "outline" : "primary"}
                onClick={() => onUpdateStatus(dsa.id, { portalAccess: !dsa.portalAccess })}
              >
                {dsa.portalAccess ? "Suspend Access" : "Activate Access"}
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700/50">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Reset Credentials</span>
                <p className="text-[11px] text-slate-500">Send password reset link to {dsa.email}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => alert("Password reset link sent to DSA email.")}>
                Send Reset Link
              </Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Two-Factor Authentication</span>
                <p className="text-[11px] text-slate-500">Enforced SMS OTP authentication for partner portal</p>
              </div>
              <Badge variant="success" className="text-[10px]">2FA Enforced</Badge>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
