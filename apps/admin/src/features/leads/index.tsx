import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Modal, Input, Select } from "@nbfc/ui";
import { LeadStatus } from "@nbfc/shared-types";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";
import { LeadDetailDrawer, LeadItem } from "./components/LeadDetailDrawer";

const initialLeads: LeadItem[] = [
  { id: "1", leadCode: "LD-8901", customerName: "Manish Joshi", phone: "+91 98200 44556", email: "manish.joshi@gmail.com", source: "Website", sourcedBy: "Website Instant Eligibility Form", branch: "Mumbai Nariman Point", assignedOfficer: "Subhashis Roy", loanProduct: "Home Loan", amount: 4500000, status: LeadStatus.CONTACTED, notes: "Customer requested weekend call back", createdAt: "15 Aug 2026", lastFollowup: "16 Aug 2026", nextFollowup: "18 Aug 2026" },
  { id: "2", leadCode: "LD-8902", customerName: "Alok Kumar", phone: "+91 98110 55667", email: "alok.k@rediffmail.com", source: "DSA", sourcedBy: "Apex Financial Solutions (DSA-1042)", branch: "Delhi Connaught Place", assignedOfficer: "Ananya Mukherjee", loanProduct: "Business Loan", amount: 2000000, status: LeadStatus.NEW, notes: "Looking for working capital line", createdAt: "16 Aug 2026", lastFollowup: "Never", nextFollowup: "17 Aug 2026" },
  { id: "3", leadCode: "LD-8903", customerName: "Swati Sengupta", phone: "+91 98301 66778", email: "swati.s@yahoo.com", source: "Connector", sourcedBy: "Sunil Sen (CON-312)", branch: "Kolkata Central", assignedOfficer: "Tanmoy Ghosh", loanProduct: "Mortgage Loan", amount: 3000000, status: LeadStatus.QUALIFIED, notes: "Property documents ready for review", createdAt: "14 Aug 2026", lastFollowup: "15 Aug 2026", nextFollowup: "17 Aug 2026" },
  { id: "4", leadCode: "LD-8904", customerName: "Deepak Rao", phone: "+91 98450 77889", email: "deepak.rao@gmail.com", source: "Manual", sourcedBy: "Branch Walk-in", branch: "Bengaluru Koramangala", assignedOfficer: "Anand Murthy", loanProduct: "Personal Loan", amount: 500000, status: LeadStatus.IN_PROGRESS, notes: "Salary slips collected", createdAt: "13 Aug 2026", lastFollowup: "15 Aug 2026", nextFollowup: "16 Aug 2026" },
  { id: "5", leadCode: "LD-8905", customerName: "Kavita Reddy", phone: "+91 98490 88990", email: "kavita.r@gmail.com", source: "Website", sourcedBy: "Google Ad Campaign", branch: "Hyderabad Hitech City", assignedOfficer: "Suresh Reddy", loanProduct: "Gold Loan", amount: 350000, status: LeadStatus.CONVERTED, notes: "Converted to LA-9489", createdAt: "11 Aug 2026", lastFollowup: "14 Aug 2026", nextFollowup: "Completed" },
];

export const LeadsFeature: React.FC = () => {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSourceTab, setActiveSourceTab] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal and Drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState<LeadItem | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    source: "Website" as LeadItem["source"],
    sourcedBy: "Website Portal",
    branch: "Kolkata Central",
    assignedOfficer: "Ananya Mukherjee",
    loanProduct: "Home Loan",
    amount: 2500000,
    notes: "",
  });

  const sourceTabs = [
    { id: "all", label: "All Leads" },
    { id: "Website", label: "Website Leads" },
    { id: "DSA", label: "DSA Sourced Leads" },
    { id: "Connector", label: "Connector Leads" },
    { id: "Manual", label: "Manual / Walk-in Leads" },
  ];

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: LeadItem = {
      id: String(Date.now()),
      leadCode: `LD-${Math.floor(8900 + Math.random() * 100)}`,
      ...formData,
      status: LeadStatus.NEW,
      createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      lastFollowup: "Never",
      nextFollowup: "Tomorrow",
    };
    setLeads((prev) => [newLead, ...prev]);
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLeadForDrawer && selectedLeadForDrawer.id === id) {
      setSelectedLeadForDrawer((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleAssignOfficer = (id: string, officer: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, assignedOfficer: officer } : l))
    );
    if (selectedLeadForDrawer && selectedLeadForDrawer.id === id) {
      setSelectedLeadForDrawer((prev) => (prev ? { ...prev, assignedOfficer: officer } : null));
    }
  };

  const handleConvertToLoan = (lead: LeadItem) => {
    handleUpdateStatus(lead.id, LeadStatus.CONVERTED);
    alert(`Lead ${lead.leadCode} converted into formal application! Redirecting to Loan Creator...`);
    window.location.href = "/loans";
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = leads.map((l) => ({
      "Lead Code": l.leadCode,
      "Customer Name": l.customerName,
      Phone: l.phone,
      Email: l.email,
      Source: l.source,
      "Sourced By": l.sourcedBy,
      Branch: l.branch,
      "Assigned Officer": l.assignedOfficer,
      "Loan Product": l.loanProduct,
      "Requested Amount": l.amount,
      Status: l.status,
      "Next Follow-up": l.nextFollowup,
      "Created Date": l.createdAt,
    }));

    if (format === "excel") {
      exportToExcel("Leads_Directory", "Leads", exportData);
    } else {
      exportToCSV("Leads_Directory", exportData);
    }
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.leadCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.loanProduct.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource = activeSourceTab === "all" || l.source === activeSourceTab;
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;

    return matchesSearch && matchesSource && matchesStatus;
  });

  const columns = [
    {
      header: "Lead Code & Customer",
      accessorKey: (row: LeadItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedLeadForDrawer(row)}
        >
          <div className="font-mono font-bold text-blue-600 text-xs">{row.leadCode}</div>
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.customerName}
          </div>
          <div className="text-[11px] text-slate-400">{row.phone}</div>
        </div>
      ),
    },
    {
      header: "Source Channel",
      accessorKey: (row: LeadItem) => (
        <div>
          <Badge variant="info" className="text-[10px]">
            {row.source}
          </Badge>
          <div className="text-[11px] text-slate-400 truncate max-w-[130px] mt-0.5">
            {row.sourcedBy}
          </div>
        </div>
      ),
    },
    {
      header: "Product & Amount",
      accessorKey: (row: LeadItem) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(row.amount)}
          </div>
          <div className="text-[11px] text-slate-400">{row.loanProduct}</div>
        </div>
      ),
    },
    {
      header: "Branch & Officer",
      accessorKey: (row: LeadItem) => (
        <div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">{row.assignedOfficer}</div>
          <div className="text-[11px] text-slate-400">{row.branch}</div>
        </div>
      ),
    },
    {
      header: "Pipeline Status",
      accessorKey: (row: LeadItem) => {
        const variant =
          row.status === LeadStatus.CONVERTED
            ? "success"
            : row.status === LeadStatus.LOST
            ? "danger"
            : row.status === LeadStatus.QUALIFIED || row.status === LeadStatus.IN_PROGRESS
            ? "info"
            : "warning";

        return (
          <Badge variant={variant} className="uppercase text-[10px]">
            {row.status.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      header: "Next Follow-up",
      accessorKey: (row: LeadItem) => (
        <span className="text-xs text-slate-500">{row.nextFollowup}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: LeadItem) => (
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          onClick={() => setSelectedLeadForDrawer(row)}
        >
          Follow-up
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lead Management"
        description="Ingestion, automated assignment, funnel progression, and conversion to formal loan applications."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Leads
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              + Ingest New Lead
            </Button>
          </div>
        }
      />

      <Tabs tabs={sourceTabs} activeTab={activeSourceTab} onChange={setActiveSourceTab} />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-full sm:w-64">
          <Select
            label="Filter by Pipeline Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: "All Statuses", value: "all" },
              { label: "New Lead", value: LeadStatus.NEW },
              { label: "Contacted", value: LeadStatus.CONTACTED },
              { label: "Qualified", value: LeadStatus.QUALIFIED },
              { label: "In Progress", value: LeadStatus.IN_PROGRESS },
              { label: "Converted", value: LeadStatus.CONVERTED },
              { label: "Lost / Dropped", value: LeadStatus.LOST },
            ]}
          />
        </div>

        <span className="text-xs text-slate-500">
          Showing {filtered.length} of {leads.length} leads
        </span>
      </div>

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Add Lead Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ingest New Prospect Lead"
        className="max-w-xl"
      >
        <form onSubmit={handleSaveLead} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Customer Full Name"
              placeholder="e.g. Manish Joshi"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
            <Input
              label="Contact Mobile"
              placeholder="+91 98200 44556"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="manish@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Select
              label="Sourcing Channel"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadItem["source"] })}
              options={[
                { label: "Website Digital Lead", value: "Website" },
                { label: "DSA Sourced", value: "DSA" },
                { label: "Connector Referral", value: "Connector" },
                { label: "Manual Walk-in", value: "Manual" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Loan Product of Interest"
              value={formData.loanProduct}
              onChange={(e) => setFormData({ ...formData, loanProduct: e.target.value })}
              options={[
                { label: "Personal Loan", value: "Personal Loan" },
                { label: "Mortgage Loan (LAP)", value: "Mortgage Loan" },
                { label: "Home Loan", value: "Home Loan" },
                { label: "Business Loan", value: "Business Loan" },
                { label: "Car Loan", value: "Car Loan" },
                { label: "Gold Loan", value: "Gold Loan" },
              ]}
            />
            <Input
              label="Estimated Amount (₹)"
              type="number"
              value={String(formData.amount)}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Assign Branch"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              options={[
                { label: "Kolkata Central", value: "Kolkata Central" },
                { label: "Mumbai Nariman Point", value: "Mumbai Nariman Point" },
                { label: "Delhi Connaught Place", value: "Delhi Connaught Place" },
                { label: "Bengaluru Koramangala", value: "Bengaluru Koramangala" },
              ]}
            />
            <Select
              label="Assign Loan Officer"
              value={formData.assignedOfficer}
              onChange={(e) => setFormData({ ...formData, assignedOfficer: e.target.value })}
              options={[
                { label: "Ananya Mukherjee", value: "Ananya Mukherjee" },
                { label: "Subhashis Roy", value: "Subhashis Roy" },
                { label: "Tanmoy Ghosh", value: "Tanmoy Ghosh" },
              ]}
            />
          </div>

          <Input
            label="Initial Contact Notes / Discussion"
            placeholder="e.g. Looking for purchase of residential property in 2 weeks"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Ingest Lead</Button>
          </div>
        </form>
      </Modal>

      {/* Lead Detail Drawer */}
      <LeadDetailDrawer
        isOpen={!!selectedLeadForDrawer}
        onClose={() => setSelectedLeadForDrawer(null)}
        lead={selectedLeadForDrawer}
        onUpdateStatus={handleUpdateStatus}
        onAssignOfficer={handleAssignOfficer}
        onConvertToLoan={handleConvertToLoan}
      />
    </div>
  );
};

export default LeadsFeature;
