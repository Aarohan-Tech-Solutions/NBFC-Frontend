import React, { useState } from "react";
import { Drawer, Badge, Button, Tabs } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";

export interface ConnectorItem {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  branch: string;
  profession: string;
  kycStatus: "Verified" | "Pending" | "Rejected";
  referredLeads: number;
  convertedLoans: number;
  totalDisbursed: number;
  pendingCommission: number;
  paidCommission: number;
  pan: string;
  aadhaar: string;
  bankAccount: string;
  bankIfsc: string;
  status: "Active" | "Inactive";
}

interface ConnectorDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  connector: ConnectorItem | null;
  onEdit: () => void;
  onUpdateStatus: (id: string, updates: Partial<ConnectorItem>) => void;
}

export const ConnectorDetailDrawer: React.FC<ConnectorDetailDrawerProps> = ({
  isOpen,
  onClose,
  connector,
  onEdit,
  onUpdateStatus,
}) => {
  const [subTab, setSubTab] = useState("profile");

  if (!connector) return null;

  const kycDocs = [
    { name: "Individual PAN Card", docNo: connector.pan, status: connector.kycStatus, date: "10 Jun 2026" },
    { name: "Aadhaar Card Copy", docNo: connector.aadhaar, status: connector.kycStatus, date: "10 Jun 2026" },
    { name: "Bank Passbook / Cheque Copy", docNo: `${connector.bankIfsc} / ${connector.bankAccount}`, status: connector.kycStatus, date: "10 Jun 2026" },
  ];

  const referralLeads = [
    { id: "LD-8901", customerName: "Rajesh Sharma", product: "Home Loan", amount: 4500000, status: "Disbursed", commissionEarned: 22500 },
    { id: "LD-8924", customerName: "Meenakshi Sen", product: "Personal Loan", amount: 600000, status: "Disbursed", commissionEarned: 6000 },
    { id: "LD-8955", customerName: "Arun Nair", product: "Business Loan", amount: 1500000, status: "Under Review", commissionEarned: 0 },
    { id: "LD-8970", customerName: "Kavita Rao", product: "Gold Loan", amount: 350000, status: "New Lead", commissionEarned: 0 },
  ];

  const tabs = [
    { id: "profile", label: "Connector Profile" },
    { id: "kyc", label: "KYC Verification" },
    { id: "commission", label: "Commission Payouts" },
    { id: "performance", label: "Referral Leads" },
  ];

  const conversionRate = Math.round((connector.convertedLoans / connector.referredLeads) * 100);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${connector.name} (${connector.code})`}
      description={`Profession: ${connector.profession} • Branch: ${connector.branch}`}
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
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{connector.name}</h3>
                  <p className="text-xs text-slate-500">{connector.email} • {connector.phone}</p>
                </div>
                <Button size="sm" variant="outline" onClick={onEdit}>
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div>
                  <span className="text-slate-400">PAN</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{connector.pan}</p>
                </div>
                <div>
                  <span className="text-slate-400">Aadhaar</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{connector.aadhaar}</p>
                </div>
                <div>
                  <span className="text-slate-400">Bank Account</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{connector.bankAccount}</p>
                </div>
                <div>
                  <span className="text-slate-400">Bank IFSC</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{connector.bankIfsc}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Total Leads</span>
                <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">{connector.referredLeads} Leads</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Disbursed Volume</span>
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(connector.totalDisbursed)}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Conversion Rate</span>
                <p className="text-base font-bold text-blue-600 mt-1">{conversionRate}%</p>
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
                  Connector Identity Verification
                </h4>
                <p className="text-xs text-slate-500">Current KYC: {connector.kycStatus}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-rose-600 hover:bg-rose-50"
                  onClick={() => onUpdateStatus(connector.id, { kycStatus: "Rejected" })}
                >
                  Reject KYC
                </Button>
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(connector.id, { kycStatus: "Verified" })}
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
                      No: <span className="font-mono font-semibold">{doc.docNo}</span> • Verified: {doc.date}
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

        {/* Commission */}
        {subTab === "commission" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">Pending Commission</span>
                <p className="text-lg font-black text-amber-900 dark:text-amber-100 mt-0.5">{formatCurrency(connector.pendingCommission)}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Total Paid Out</span>
                <p className="text-lg font-black text-emerald-900 dark:text-emerald-100 mt-0.5">{formatCurrency(connector.paidCommission)}</p>
              </div>
            </div>

            <Button size="sm" className="w-full">
              Process Connector Payout Batch
            </Button>
          </div>
        )}

        {/* Performance */}
        {subTab === "performance" && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Referred Leads Log
            </h4>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Lead ID</th>
                    <th className="py-2.5 px-3 font-semibold">Customer</th>
                    <th className="py-2.5 px-3 font-semibold">Product</th>
                    <th className="py-2.5 px-3 font-semibold">Amount</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {referralLeads.map((ld) => (
                    <tr key={ld.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-600">{ld.id}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">{ld.customerName}</td>
                      <td className="py-2.5 px-3 text-slate-500">{ld.product}</td>
                      <td className="py-2.5 px-3 font-semibold">{formatCurrency(ld.amount)}</td>
                      <td className="py-2.5 px-3">
                        <Badge variant={ld.status === "Disbursed" ? "success" : "info"} className="text-[10px]">
                          {ld.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                        {ld.commissionEarned > 0 ? formatCurrency(ld.commissionEarned) : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
