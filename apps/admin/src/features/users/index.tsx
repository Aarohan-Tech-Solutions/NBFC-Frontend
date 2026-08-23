import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Select } from "@nbfc/ui";
import { Role } from "@nbfc/shared-types";
import { UserModal, UserFormData } from "./components/UserModal";
import { UserProfileDrawer } from "./components/UserProfileDrawer";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

interface SystemUser extends UserFormData {
  id: string;
  employeeId: string;
  lastLogin: string;
  createdAt: string;
}

const initialUsers: SystemUser[] = [
  { id: "1", employeeId: "EMP-001", name: "Amit Roy", email: "amit.roy@nbfc.com", phone: "+91 98301 23456", role: Role.SUPER_ADMIN, branch: "Headquarters", area: "National", status: "Active", lastLogin: "16 Aug 2026, 11:20 AM", createdAt: "01 Jan 2026" },
  { id: "2", employeeId: "EMP-042", name: "Subhashis Roy", email: "subhashis@nbfc.com", phone: "+91 98302 34567", role: Role.BRANCH_MANAGER, branch: "Kolkata Central", area: "West Bengal East", status: "Active", lastLogin: "16 Aug 2026, 10:15 AM", createdAt: "15 Jan 2026" },
  { id: "3", employeeId: "EMP-088", name: "Priya Deshmukh", email: "priya.d@nbfc.com", phone: "+91 98203 45678", role: Role.AREA_MANAGER, branch: "Mumbai Nariman Point", area: "Maharashtra South", status: "Active", lastLogin: "16 Aug 2026, 09:30 AM", createdAt: "01 Feb 2026" },
  { id: "4", employeeId: "EMP-104", name: "Rakesh Verma", email: "rakesh.v@nbfc.com", phone: "+91 98114 56789", role: Role.BRANCH_MANAGER, branch: "Delhi Connaught Place", area: "Delhi NCR North", status: "Active", lastLogin: "15 Aug 2026, 05:40 PM", createdAt: "10 Feb 2026" },
  { id: "5", employeeId: "DSA-1042", name: "Vikas Sharma (Apex DSA)", email: "vikas@apexloans.in", phone: "+91 98455 67890", role: Role.DSA, branch: "Bengaluru Koramangala", area: "Karnataka Central", status: "Active", lastLogin: "16 Aug 2026, 08:45 AM", createdAt: "20 Feb 2026" },
  { id: "6", employeeId: "CON-201", name: "Sunil Sen (Connector)", email: "sunil.sen@connect.in", phone: "+91 98316 78901", role: Role.CONNECTOR, branch: "Kolkata Central", area: "West Bengal East", status: "Active", lastLogin: "14 Aug 2026, 04:10 PM", createdAt: "05 Mar 2026" },
  { id: "7", employeeId: "EMP-210", name: "Ananya Mukherjee", email: "ananya.m@nbfc.com", phone: "+91 98327 89012", role: Role.STAFF, branch: "Kolkata Central", area: "West Bengal East", status: "Active", lastLogin: "16 Aug 2026, 11:00 AM", createdAt: "12 Mar 2026" },
  { id: "8", employeeId: "EMP-215", name: "Vikram Malhotra", email: "vikram.m@nbfc.com", phone: "+91 98108 90123", role: Role.COMPANY_ADMIN, branch: "Headquarters", area: "National", status: "Active", lastLogin: "16 Aug 2026, 10:50 AM", createdAt: "01 Jan 2026" },
];

export const UsersFeature: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all-users");

  // Modal and Drawer States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<SystemUser | null>(null);

  const tabs = [
    { id: "all-users", label: "All Users Directory" },
    { id: "activity-log", label: "User Activity Log" },
    { id: "login-history", label: "Login & Security History" },
  ];

  const handleSaveUser = (data: UserFormData) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...data }
            : u
        )
      );
    } else {
      const newUser: SystemUser = {
        id: String(Date.now()),
        employeeId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        branch: data.branch,
        area: data.area,
        status: data.status,
        lastLogin: "Never",
        createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      };
      setUsers((prev) => [newUser, ...prev]);
    }
  };

  const handleExport = (format: "excel" | "csv") => {
    const dataToExport = users.map((u) => ({
      "Employee ID": u.employeeId,
      Name: u.name,
      Email: u.email,
      Phone: u.phone,
      Role: u.role,
      Branch: u.branch,
      Area: u.area,
      Status: u.status,
      "Last Login": u.lastLogin,
      "Created Date": u.createdAt,
    }));

    if (format === "excel") {
      exportToExcel("System_Users_List", "Users", dataToExport);
    } else {
      exportToCSV("System_Users_List", dataToExport);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.branch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      header: "User / Employee",
      accessorKey: (row: SystemUser) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedUserForProfile(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.name}
          </div>
          <div className="text-[11px] text-slate-400">
            {row.employeeId} • {row.email}
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: (row: SystemUser) => (
        <Badge
          variant={
            row.role === Role.SUPER_ADMIN
              ? "danger"
              : row.role === Role.COMPANY_ADMIN
              ? "warning"
              : row.role === Role.BRANCH_MANAGER || row.role === Role.AREA_MANAGER
              ? "info"
              : "neutral"
          }
          className="uppercase text-[10px]"
        >
          {row.role.replace("_", " ")}
        </Badge>
      ),
    },
    {
      header: "Branch & Area",
      accessorKey: (row: SystemUser) => (
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{row.branch}</div>
          <div className="text-[11px] text-slate-400">{row.area}</div>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone" as const,
    },
    {
      header: "Status",
      accessorKey: (row: SystemUser) => (
        <Badge variant={row.status === "Active" ? "success" : "warning"}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Last Active",
      accessorKey: (row: SystemUser) => (
        <span className="text-xs text-slate-500">{row.lastLogin}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: SystemUser) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600 hover:text-blue-700"
            onClick={() => setSelectedUserForProfile(row)}
          >
            Profile
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => {
              setEditingUser(row);
              setIsModalOpen(true);
            }}
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
        title="User Management"
        description="Directory, roles, territory assignments, user activity logs, and authentication history."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Excel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
            >
              + Add New User
            </Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "all-users" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Select
              label="Filter by Role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { label: "All Roles", value: "all" },
                { label: "Super Admin", value: Role.SUPER_ADMIN },
                { label: "Company Admin", value: Role.COMPANY_ADMIN },
                { label: "Area Manager", value: Role.AREA_MANAGER },
                { label: "Branch Manager", value: Role.BRANCH_MANAGER },
                { label: "DSA Partner", value: Role.DSA },
                { label: "Connector", value: Role.CONNECTOR },
                { label: "Staff", value: Role.STAFF },
              ]}
            />

            <Select
              label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: "All Statuses", value: "all" },
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Suspended", value: "Suspended" },
              ]}
            />

            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-slate-500"
                onClick={() => {
                  setRoleFilter("all");
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <DataTableWrapper
            data={filteredUsers}
            columns={columns}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onExport={() => handleExport("csv")}
          />
        </div>
      )}

      {activeTab === "activity-log" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              System-Wide User Activity Audit Log
            </h3>
            <span className="text-xs text-slate-400">Total 2,410 Events Tracked</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{u.name}</span>
                  <span className="text-slate-400 ml-2">({u.role})</span>
                  <p className="text-slate-500 mt-0.5">Updated application workflow status and logged customer notes</p>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <div>{u.lastLogin}</div>
                  <span className="text-blue-600 font-medium">Branch: {u.branch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "login-history" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Authentication & Security Log
            </h3>
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
              Export Audit Trail
            </Button>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                <tr>
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">IP Address</th>
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold text-right">Auth Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{u.name}</td>
                    <td className="py-3 px-4 text-slate-500 uppercase text-[10px]">{u.role}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      103.24.12.{10 + i * 4}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{u.lastLogin}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="success" className="text-[10px]">
                        Success (2FA)
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        initialData={editingUser}
      />

      {/* User Profile Drawer */}
      <UserProfileDrawer
        isOpen={!!selectedUserForProfile}
        onClose={() => setSelectedUserForProfile(null)}
        user={selectedUserForProfile}
        onEdit={() => {
          setEditingUser(selectedUserForProfile);
          setSelectedUserForProfile(null);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default UsersFeature;
