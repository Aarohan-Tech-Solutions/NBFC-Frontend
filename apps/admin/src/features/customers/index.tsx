import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Button, Badge, Modal, Input, Select } from "@nbfc/ui";
import { formatCurrency } from "../../lib/formatters";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";
import { Customer360Drawer, CustomerItem } from "./components/Customer360Drawer";

const initialCustomers: CustomerItem[] = [
  { id: "1", customerCode: "CUST-4091", name: "Rahul Kapoor", phone: "+91 99887 76655", email: "rahul.kapoor@gmail.com", city: "Kolkata", employmentType: "Salaried", employer: "Tata Consultancy Services", monthlyIncome: 145000, cibilScore: 782, kycStatus: "Verified", pan: "ABCDE1234F", aadhaar: "XXXX-XXXX-9012", address: "Flat 4B, South City Towers, Prince Anwar Shah Road, Kolkata, WB 700068", activeLoans: 1, totalBorrowed: 4500000, createdAt: "12 Jul 2026" },
  { id: "2", customerCode: "CUST-4092", name: "Priya Sundaram", phone: "+91 97766 55443", email: "priya.sundaram@outlook.com", city: "Bengaluru", employmentType: "Salaried", employer: "Infosys Limited", monthlyIncome: 110000, cibilScore: 745, kycStatus: "Verified", pan: "PQRSK5678L", aadhaar: "XXXX-XXXX-8821", address: "Villa 12, Palm Meadows, Whitefield, Bengaluru, KA 560066", activeLoans: 1, totalBorrowed: 1800000, createdAt: "18 Jul 2026" },
  { id: "3", customerCode: "CUST-4093", name: "Rajeshwar Patel", phone: "+91 98250 11223", email: "rajeshwar.patel@pateltech.com", city: "Ahmedabad", employmentType: "Business Owner", employer: "Patel Precision Engineering", monthlyIncome: 350000, cibilScore: 810, kycStatus: "Verified", pan: "LKJHG9876M", aadhaar: "XXXX-XXXX-7744", address: "B-402, Titanium City Centre, Prahlad Nagar, Ahmedabad, GJ 380015", activeLoans: 2, totalBorrowed: 8500000, createdAt: "24 Jul 2026" },
  { id: "4", customerCode: "CUST-4094", name: "Meenakshi Sen", phone: "+91 98301 44556", email: "meenakshi.sen@gmail.com", city: "Kolkata", employmentType: "Self-Employed Professional", employer: "Sen & Associates (Lawyer)", monthlyIncome: 95000, cibilScore: 720, kycStatus: "Verified", pan: "MNBVC4321Q", aadhaar: "XXXX-XXXX-3321", address: "14/2 Gariahat Road, Kolkata, WB 700019", activeLoans: 1, totalBorrowed: 600000, createdAt: "02 Aug 2026" },
  { id: "5", customerCode: "CUST-4095", name: "Arun Nair", phone: "+91 98490 66778", email: "arun.nair@gmail.com", city: "Hyderabad", employmentType: "Salaried", employer: "Microsoft IDC", monthlyIncome: 220000, cibilScore: 680, kycStatus: "Pending", pan: "ZXCVB8765P", aadhaar: "XXXX-XXXX-5511", address: "Plot 88, Jubilee Hills Road No. 36, Hyderabad, TS 500033", activeLoans: 0, totalBorrowed: 0, createdAt: "10 Aug 2026" },
];

export const CustomersFeature: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");

  // Modal and Drawer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerItem | null>(null);
  const [selectedCustomerForDrawer, setSelectedCustomerForDrawer] = useState<CustomerItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Kolkata",
    employmentType: "Salaried" as CustomerItem["employmentType"],
    employer: "",
    monthlyIncome: 100000,
    cibilScore: 750,
    pan: "",
    aadhaar: "",
    address: "",
  });

  const handleOpenModal = (customer?: CustomerItem) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        city: customer.city,
        employmentType: customer.employmentType,
        employer: customer.employer,
        monthlyIncome: customer.monthlyIncome,
        cibilScore: customer.cibilScore,
        pan: customer.pan,
        aadhaar: customer.aadhaar,
        address: customer.address,
      });
    } else {
      setEditingCustomer(null);
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "Kolkata",
        employmentType: "Salaried",
        employer: "",
        monthlyIncome: 100000,
        cibilScore: 750,
        pan: "",
        aadhaar: "",
        address: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingCustomer.id ? { ...c, ...formData } : c))
      );
    } else {
      const newCustomer: CustomerItem = {
        id: String(Date.now()),
        customerCode: `CUST-${Math.floor(4000 + Math.random() * 900)}`,
        ...formData,
        kycStatus: "Pending",
        activeLoans: 0,
        totalBorrowed: 0,
        createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = customers.map((c) => ({
      "Customer ID": c.customerCode,
      Name: c.name,
      Phone: c.phone,
      Email: c.email,
      City: c.city,
      "Employment Type": c.employmentType,
      Employer: c.employer,
      "Monthly Income": c.monthlyIncome,
      "CIBIL Score": c.cibilScore,
      "KYC Status": c.kycStatus,
      "Active Loans": c.activeLoans,
      "Total Borrowed": c.totalBorrowed,
      "Created Date": c.createdAt,
    }));

    if (format === "excel") {
      exportToExcel("Customers_Directory", "Customers", exportData);
    } else {
      exportToCSV("Customers_Directory", exportData);
    }
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.employer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEmp = employmentFilter === "all" || c.employmentType === employmentFilter;
    const matchesKyc = kycFilter === "all" || c.kycStatus === kycFilter;

    return matchesSearch && matchesEmp && matchesKyc;
  });

  const columns = [
    {
      header: "Customer & ID",
      accessorKey: (row: CustomerItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedCustomerForDrawer(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.name}
          </div>
          <div className="text-[11px] text-slate-400">
            ID: <span className="font-mono font-semibold">{row.customerCode}</span> • {row.city}
          </div>
        </div>
      ),
    },
    {
      header: "Employment & Income",
      accessorKey: (row: CustomerItem) => (
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{row.employer}</div>
          <div className="text-[11px] text-slate-400">
            {row.employmentType} • {formatCurrency(row.monthlyIncome)}/mo
          </div>
        </div>
      ),
    },
    {
      header: "CIBIL Score",
      accessorKey: (row: CustomerItem) => (
        <Badge
          variant={row.cibilScore >= 750 ? "success" : row.cibilScore >= 700 ? "info" : "warning"}
          className="text-[10px]"
        >
          {row.cibilScore} Score
        </Badge>
      ),
    },
    {
      header: "KYC Status",
      accessorKey: (row: CustomerItem) => (
        <Badge
          variant={row.kycStatus === "Verified" ? "success" : "warning"}
          className="text-[10px]"
        >
          {row.kycStatus}
        </Badge>
      ),
    },
    {
      header: "Active Borrowings",
      accessorKey: (row: CustomerItem) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(row.totalBorrowed)}
          </div>
          <div className="text-[11px] text-slate-400">{row.activeLoans} Active Loans</div>
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: CustomerItem) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600"
            onClick={() => setSelectedCustomerForDrawer(row)}
          >
            360 Profile
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
        title="Customer Management"
        description="Comprehensive 360-degree customer directory, KYC compliance, employment records, and loan histories."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button size="sm" onClick={() => handleOpenModal()}>
              + Add New Customer
            </Button>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <Select
          label="Filter by Employment"
          value={employmentFilter}
          onChange={(e) => setEmploymentFilter(e.target.value)}
          options={[
            { label: "All Employment Types", value: "all" },
            { label: "Salaried", value: "Salaried" },
            { label: "Self-Employed Professional", value: "Self-Employed Professional" },
            { label: "Business Owner", value: "Business Owner" },
          ]}
        />
        <Select
          label="Filter by KYC Status"
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Verified", value: "Verified" },
            { label: "Pending", value: "Pending" },
          ]}
        />
        <div className="flex items-end">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-slate-500"
            onClick={() => {
              setEmploymentFilter("all");
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

      {/* Add / Edit Customer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? "Edit Customer Profile" : "Create New Customer Profile"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Rahul Kapoor"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Contact Phone"
              placeholder="+91 99887 76655"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="customer@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="City / Location"
              placeholder="e.g. Kolkata"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Employment Type"
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as CustomerItem["employmentType"] })}
              options={[
                { label: "Salaried", value: "Salaried" },
                { label: "Self-Employed Professional", value: "Self-Employed Professional" },
                { label: "Business Owner", value: "Business Owner" },
              ]}
            />
            <Input
              label="Employer / Business Name"
              placeholder="e.g. Tata Consultancy Services"
              value={formData.employer}
              onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
              required
            />
            <Input
              label="Monthly Net Income (₹)"
              type="number"
              value={String(formData.monthlyIncome)}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="CIBIL Score"
              type="number"
              value={String(formData.cibilScore)}
              onChange={(e) => setFormData({ ...formData, cibilScore: Number(e.target.value) })}
              required
            />
            <Input
              label="PAN Card No."
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
              required
            />
            <Input
              label="Aadhaar No."
              placeholder="XXXX-XXXX-9012"
              value={formData.aadhaar}
              onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Residential Address
            </label>
            <textarea
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingCustomer ? "Update Customer Profile" : "Create Customer"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Customer 360 Drawer */}
      <Customer360Drawer
        isOpen={!!selectedCustomerForDrawer}
        onClose={() => setSelectedCustomerForDrawer(null)}
        customer={selectedCustomerForDrawer}
        onEdit={() => {
          setEditingCustomer(selectedCustomerForDrawer);
          setSelectedCustomerForDrawer(null);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default CustomersFeature;
