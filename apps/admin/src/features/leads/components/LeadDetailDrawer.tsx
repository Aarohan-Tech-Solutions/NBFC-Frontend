import React, { useState } from "react";
import { Drawer, Badge, Button, Tabs, Select } from "@nbfc/ui";
import { formatCurrency } from "../../../lib/formatters";
import { LeadStatus } from "@nbfc/shared-types";

export interface LeadItem {
  id: string;
  leadCode: string;
  customerName: string;
  phone: string;
  email: string;
  source: "Website" | "DSA" | "Connector" | "Manual";
  sourcedBy: string;
  branch: string;
  assignedOfficer: string;
  loanProduct: string;
  amount: number;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  lastFollowup: string;
  nextFollowup: string;
}

interface LeadDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadItem | null;
  onUpdateStatus: (id: string, newStatus: LeadStatus) => void;
  onAssignOfficer: (id: string, officer: string) => void;
  onConvertToLoan: (lead: LeadItem) => void;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  isOpen,
  onClose,
  lead,
  onUpdateStatus,
  onAssignOfficer,
  onConvertToLoan,
}) => {
  const [subTab, setSubTab] = useState("details");

  if (!lead) return null;

  const leadTimeline = [
    { title: "Tele-calling Follow-up Completed", desc: "Customer requested meeting on Monday for document collection", time: "Today, 11:30 AM", agent: lead.assignedOfficer },
    { title: "Lead Assigned to Branch Officer", desc: `Assigned to ${lead.assignedOfficer} at ${lead.branch}`, time: "Yesterday, 03:00 PM", agent: "Auto-Routing Engine" },
    { title: "Lead Ingested into System", desc: `Captured via ${lead.source} by ${lead.sourcedBy}`, time: lead.createdAt, agent: "System" },
  ];

  const tabs = [
    { id: "details", label: "Lead Details & Assignment" },
    { id: "timeline", label: "Follow-up Timeline" },
    { id: "convert", label: "Application Conversion" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${lead.customerName} (${lead.leadCode})`}
      description={`Source: ${lead.source} (${lead.sourcedBy}) • Branch: ${lead.branch}`}
      size="lg"
    >
      <div className="space-y-5">
        <Tabs tabs={tabs} activeTab={subTab} onChange={setSubTab} />

        {/* Details */}
        {subTab === "details" && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{lead.customerName}</h3>
                  <p className="text-xs text-slate-500">{lead.email} • {lead.phone}</p>
                </div>
                <Badge
                  variant={
                    lead.status === LeadStatus.CONVERTED
                      ? "success"
                      : lead.status === LeadStatus.LOST
                      ? "danger"
                      : "warning"
                  }
                  className="uppercase text-[10px]"
                >
                  {lead.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div>
                  <span className="text-slate-400">Loan Product</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{lead.loanProduct}</p>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Amount</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(lead.amount)}</p>
                </div>
                <div>
                  <span className="text-slate-400">Sourcing Channel</span>
                  <p className="font-bold text-blue-600">{lead.source}</p>
                </div>
                <div>
                  <span className="text-slate-400">Assigned Officer</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{lead.assignedOfficer}</p>
                </div>
              </div>
            </div>

            {/* Quick Status & Officer Assignment */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Pipeline Status & Lead Routing
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Update Pipeline Funnel Status"
                  value={lead.status}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                  options={[
                    { label: "New Lead", value: LeadStatus.NEW },
                    { label: "Contacted", value: LeadStatus.CONTACTED },
                    { label: "Qualified", value: LeadStatus.QUALIFIED },
                    { label: "In Progress", value: LeadStatus.IN_PROGRESS },
                    { label: "Converted to Application", value: LeadStatus.CONVERTED },
                    { label: "Lost / Dropped", value: LeadStatus.LOST },
                  ]}
                />

                <Select
                  label="Re-assign to Loan Officer"
                  value={lead.assignedOfficer}
                  onChange={(e) => onAssignOfficer(lead.id, e.target.value)}
                  options={[
                    { label: "Ananya Mukherjee (Senior Credit)", value: "Ananya Mukherjee" },
                    { label: "Subhashis Roy (Branch Manager)", value: "Subhashis Roy" },
                    { label: "Tanmoy Ghosh (Front Staff)", value: "Tanmoy Ghosh" },
                    { label: "Debabrata Sen (Field Officer)", value: "Debabrata Sen" },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {subTab === "timeline" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Lead Activity & Engagement History
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900">
              {leadTimeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" />
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h5>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">{item.desc}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">Agent: {item.agent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Convert */}
        {subTab === "convert" && (
          <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Convert Lead into Formal Loan Application
            </h4>
            <p className="text-xs text-slate-500">
              Automatically creates a new customer profile and pre-populates loan application with requested terms.
            </p>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-xs space-y-1">
              <div className="font-bold text-blue-900 dark:text-blue-200">
                {lead.customerName} &bull; {lead.loanProduct} ({formatCurrency(lead.amount)})
              </div>
              <div className="text-blue-700 dark:text-blue-300">
                Channel: {lead.source} &bull; Originating Branch: {lead.branch}
              </div>
            </div>

            <Button
              size="md"
              className="w-full"
              onClick={() => {
                onConvertToLoan(lead);
                onClose();
              }}
            >
              + Launch Full Loan Application Wizard
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
