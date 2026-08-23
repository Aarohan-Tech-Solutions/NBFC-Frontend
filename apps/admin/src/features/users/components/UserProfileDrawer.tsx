import React from "react";
import { Drawer, Badge, Button } from "@nbfc/ui";
import { UserFormData } from "./UserModal";

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: (UserFormData & { employeeId?: string; lastLogin?: string; createdAt?: string }) | null;
  onEdit: () => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onEdit,
}) => {
  if (!user) return null;

  const loginHistory = [
    { timestamp: "16 Aug 2026, 10:45 AM", ip: "103.24.12.89", device: "Chrome 127 on Windows 11", status: "Success" },
    { timestamp: "15 Aug 2026, 09:12 AM", ip: "103.24.12.89", device: "Chrome 127 on Windows 11", status: "Success" },
    { timestamp: "14 Aug 2026, 06:30 PM", ip: "49.36.18.204", device: "Safari on iOS 17", status: "Success" },
    { timestamp: "13 Aug 2026, 11:20 AM", ip: "103.24.12.89", device: "Chrome 127 on Windows 11", status: "Success" },
  ];

  const activityLog = [
    { action: "Sanction Letter Approved", details: "Approved Home Loan #LA-9485 for ₹ 45,00,000", time: "2 hours ago" },
    { action: "KYC Verified", details: "Verified Aadhaar & PAN for Customer #CUST-4091", time: "5 hours ago" },
    { action: "Status Changed", details: "Moved Application #LA-9482 to Under Review", time: "Yesterday" },
    { action: "User Login", details: "Logged in via Multi-Factor Authentication", time: "Yesterday" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile & Security Audit"
      description={`User ID: ${user.id || "USR-1092"} • Employee Code: ${user.employeeId || "EMP-0842"}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="info" className="uppercase text-[10px]">
                  {user.role}
                </Badge>
                <Badge variant={user.status === "Active" ? "success" : "warning"} className="text-[10px]">
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit Profile
          </Button>
        </div>

        {/* Territory & Contact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Assigned Branch</span>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">{user.branch}</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Territory / Area</span>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">{user.area}</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Contact Phone</span>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">{user.phone || "+91 98765 43210"}</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Account Created</span>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">{user.createdAt || "10 Jan 2026"}</p>
          </div>
        </div>

        {/* Recent Activity Audit */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Recent Audit & Operational Actions
          </h4>
          <div className="space-y-2">
            {activityLog.map((act, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{act.action}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{act.details}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Login Security Log */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Authentication & Login History
          </h4>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                  <th className="py-2.5 px-3 font-semibold">IP Address</th>
                  <th className="py-2.5 px-3 font-semibold">Device / Browser</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loginHistory.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{log.ip}</td>
                    <td className="py-2.5 px-3 text-slate-500">{log.device}</td>
                    <td className="py-2.5 px-3 text-right">
                      <Badge variant="success" className="text-[10px]">
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
