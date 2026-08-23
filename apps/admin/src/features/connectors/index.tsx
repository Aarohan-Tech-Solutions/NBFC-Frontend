import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Button, Badge, Modal, Input, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";
import { ConnectorDetailDrawer, ConnectorItem } from "./components/ConnectorDetailDrawer";

const initialConnectors: ConnectorItem[] = [
  { id: "1", code: "CON-301", name: "Anand Deshmukh", email: "anand.d@gmail.com", phone: "+91 98200 11223", city: "Pune", branch: "Mumbai Nariman Point", profession: "Chartered Accountant (CA)", kycStatus: "Verified", referredLeads: 38, convertedLoans: 28, totalDisbursed: 14500000, pendingCommission: 24000, paidCommission: 98000, pan: "BCDPD1234F", aadhaar: "XXXX-XXXX-9012", bankAccount: "000401928471", bankIfsc: "ICIC0000004", status: "Active" },
  { id: "2", code: "CON-304", name: "Sanjay Gupta", email: "sanjay.g@gmail.com", phone: "+91 98110 44556", city: "Noida", branch: "Delhi Connaught Place", profession: "Real Estate Broker", kycStatus: "Verified", referredLeads: 29, convertedLoans: 19, totalDisbursed: 9800000, pendingCommission: 18500, paidCommission: 64000, pan: "XYZPG5678K", aadhaar: "XXXX-XXXX-8491", bankAccount: "501000849201", bankIfsc: "HDFC0000060", status: "Active" },
  { id: "3", code: "CON-312", name: "Sunil Sen", email: "sunil.sen@connect.in", phone: "+91 98316 78901", city: "Kolkata", branch: "Kolkata Central", profession: "Tax Consultant", kycStatus: "Verified", referredLeads: 42, convertedLoans: 31, totalDisbursed: 16800000, pendingCommission: 32000, paidCommission: 114000, pan: "AAEPS1234H", aadhaar: "XXXX-XXXX-7721", bankAccount: "918020048192", bankIfsc: "UTIB0000142", status: "Active" },
  { id: "4", code: "CON-320", name: "Meera Krishnan", email: "meera.k@yahoo.com", phone: "+91 98450 66778", city: "Bengaluru", branch: "Bengaluru Koramangala", profession: "Insurance Agent", kycStatus: "Pending", referredLeads: 12, convertedLoans: 6, totalDisbursed: 3200000, pendingCommission: 8000, paidCommission: 12000, pan: "POIUY9876L", aadhaar: "XXXX-XXXX-4321", bankAccount: "112233445566", bankIfsc: "SBIN0000691", status: "Active" },
];

export const ConnectorsFeature: React.FC = () => {
  const [connectors, setConnectors] = useState<ConnectorItem[]>(initialConnectors);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");

  // Modal and Drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConnector, setEditingConnector] = useState<ConnectorItem | null>(null);
  const [selectedConnectorForDrawer, setSelectedConnectorForDrawer] = useState<ConnectorItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Kolkata",
    branch: "Kolkata Central",
    profession: "Tax Consultant",
    pan: "",
    aadhaar: "",
    bankAccount: "",
    bankIfsc: "",
  });

  const handleOpenModal = (connector?: ConnectorItem) => {
    if (connector) {
      setEditingConnector(connector);
      setFormData({
        name: connector.name,
        email: connector.email,
        phone: connector.phone,
        city: connector.city,
        branch: connector.branch,
        profession: connector.profession,
        pan: connector.pan,
        aadhaar: connector.aadhaar,
        bankAccount: connector.bankAccount,
        bankIfsc: connector.bankIfsc,
      });
    } else {
      setEditingConnector(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "Kolkata",
        branch: "Kolkata Central",
        profession: "Tax Consultant",
        pan: "",
        aadhaar: "",
        bankAccount: "",
        bankIfsc: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingConnector) {
      setConnectors((prev) =>
        prev.map((c) => (c.id === editingConnector.id ? { ...c, ...formData } : c))
      );
    } else {
      const newConnector: ConnectorItem = {
        id: String(Date.now()),
        code: `CON-${Math.floor(300 + Math.random() * 600)}`,
        ...formData,
        kycStatus: "Pending",
        referredLeads: 0,
        convertedLoans: 0,
        totalDisbursed: 0,
        pendingCommission: 0,
        paidCommission: 0,
        status: "Active",
      };
      setConnectors((prev) => [newConnector, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id: string, updates: Partial<ConnectorItem>) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    if (selectedConnectorForDrawer && selectedConnectorForDrawer.id === id) {
      setSelectedConnectorForDrawer((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = connectors.map((c) => ({
      "Connector Code": c.code,
      Name: c.name,
      Profession: c.profession,
      Email: c.email,
      Phone: c.phone,
      City: c.city,
      Branch: c.branch,
      "KYC Status": c.kycStatus,
      "Referred Leads": c.referredLeads,
      "Converted Loans": c.convertedLoans,
      "Disbursed Volume": c.totalDisbursed,
      "Pending Commission": c.pendingCommission,
      "Paid Commission": c.paidCommission,
      Status: c.status,
    }));

    if (format === "excel") {
      exportToExcel("Connectors_Directory", "Connectors", exportData);
    } else {
      exportToCSV("Connectors_Directory", exportData);
    }
  };

  const filtered = connectors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.profession.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch = branchFilter === "all" || c.branch === branchFilter;
    const matchesKyc = kycFilter === "all" || c.kycStatus === kycFilter;

    return matchesSearch && matchesBranch && matchesKyc;
  });

  const columns = [
    {
      header: "Connector & Code",
      accessorKey: (row: ConnectorItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedConnectorForDrawer(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.name}
          </div>
          <div className="text-[11px] text-slate-400">
            Code: <span className="font-mono font-semibold">{row.code}</span> • {row.profession}
          </div>
        </div>
      ),
    },
    {
      header: "Branch & City",
      accessorKey: (row: ConnectorItem) => (
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{row.branch}</div>
          <div className="text-[11px] text-slate-400">{row.city}</div>
        </div>
      ),
    },
    {
      header: "KYC Status",
      accessorKey: (row: ConnectorItem) => (
        <Badge
          variant={
            row.kycStatus === "Verified" ? "success" : row.kycStatus === "Pending" ? "warning" : "danger"
          }
          className="text-[10px]"
        >
          {row.kycStatus}
        </Badge>
      ),
    },
    {
      header: "Leads Sourced",
      accessorKey: (row: ConnectorItem) => (
        <div className="text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100">{row.referredLeads}</span> Leads •{" "}
          <span className="font-semibold text-emerald-600">{row.convertedLoans}</span> Converted
        </div>
      ),
    },
    {
      header: "Disbursed Volume",
      accessorKey: (row: ConnectorItem) => (
        <span className="font-bold text-slate-900 dark:text-slate-100">
          {formatCurrency(row.totalDisbursed)}
        </span>
      ),
    },
    {
      header: "Commission",
      accessorKey: (row: ConnectorItem) => (
        <div className="text-[11px]">
          <div className="text-emerald-600 font-semibold">Paid: {formatCurrency(row.paidCommission)}</div>
          <div className="text-amber-600">Pending: {formatCurrency(row.pendingCommission)}</div>
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: ConnectorItem) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600"
            onClick={() => setSelectedConnectorForDrawer(row)}
          >
            Profile
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleOpenModal(row)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Connector Network"
        description="Manage freelance referral agents, verify identity documents, track lead conversions, and calculate payouts."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button size="sm" onClick={() => handleOpenModal()}>
              + Add New Connector
            </Button>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <Select
          label="Filter by Branch"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          options={[
            { label: "All Branches", value: "all" },
            { label: "Kolkata Central", value: "Kolkata Central" },
            { label: "Mumbai Nariman Point", value: "Mumbai Nariman Point" },
            { label: "Delhi Connaught Place", value: "Delhi Connaught Place" },
            { label: "Bengaluru Koramangala", value: "Bengaluru Koramangala" },
          ]}
        />
        <Select
          label="Filter by KYC Status"
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Verified", value: "Verified" },
            { label: "Pending Verification", value: "Pending" },
            { label: "Rejected", value: "Rejected" },
          ]}
        />
        <div className="flex items-end">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-slate-500"
            onClick={() => {
              setBranchFilter("all");
              setKycFilter("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Add / Edit Connector Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingConnector ? "Edit Connector Profile" : "Register New Lead Connector"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Sunil Sen"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Profession / Background"
              placeholder="e.g. Tax Consultant / CA / Property Broker"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="sunil@connect.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Mobile Number"
              placeholder="+91 98316 78901"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Operating City"
              placeholder="e.g. Kolkata"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Select
              label="Assigned Branch"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              options={[
                { label: "Kolkata Central", value: "Kolkata Central" },
                { label: "Mumbai Nariman Point", value: "Mumbai Nariman Point" },
                { label: "Delhi Connaught Place", value: "Delhi Connaught Place" },
                { label: "Bengaluru Koramangala", value: "Bengaluru Koramangala" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Individual PAN"
              placeholder="e.g. ABCDE1234F"
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
              required
            />
            <Input
              label="Aadhaar Number"
              placeholder="e.g. 1234-5678-9012"
              value={formData.aadhaar}
              onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Bank Account No."
              placeholder="e.g. 918020048192"
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              required
            />
            <Input
              label="Bank IFSC Code"
              placeholder="e.g. UTIB0000142"
              value={formData.bankIfsc}
              onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingConnector ? "Update Connector" : "Register Connector"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Detail Drawer */}
      <ConnectorDetailDrawer
        isOpen={!!selectedConnectorForDrawer}
        onClose={() => setSelectedConnectorForDrawer(null)}
        connector={selectedConnectorForDrawer}
        onEdit={() => {
          setEditingConnector(selectedConnectorForDrawer);
          setSelectedConnectorForDrawer(null);
          setIsModalOpen(true);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default ConnectorsFeature;
