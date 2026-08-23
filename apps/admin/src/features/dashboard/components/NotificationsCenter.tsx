import React, { useState } from "react";
import { Badge, Button } from "@nbfc/ui";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const initialNotifications: NotificationItem[] = [
  { id: "1", title: "High-Value Sanction Awaiting Super Admin", message: "Application LA-9490 (₹ 1.5 Cr Mortgage Loan) has passed branch review and requires executive sanction approval.", priority: "high", timestamp: "5 mins ago", read: false },
  { id: "2", title: "Document Verification Flag", message: "Bank statement mismatch detected for applicant Rajesh Patel (LA-9488) - potential salary discrepancy.", priority: "high", timestamp: "30 mins ago", read: false },
  { id: "3", title: "Monthly Payout Batch Ready", message: "August 2026 DSA Commission payout batch of ₹ 38,40,000 is compiled and ready for bank transfer authorization.", priority: "medium", timestamp: "1 hour ago", read: false },
  { id: "4", title: "New Connector Registration", message: "Rahul Roy registered as Freelance Connector in Kolkata Central Branch. KYC review pending.", priority: "low", timestamp: "3 hours ago", read: true },
  { id: "5", title: "Automated Daily Backup Completed", message: "Database snapshot & audit vault backup completed successfully at 04:00 AM IST.", priority: "low", timestamp: "8 hours ago", read: true },
];

export const NotificationsCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "high">("all");

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "high") return n.priority === "high";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            System Notifications & Alerts
          </h3>
          {unreadCount > 0 && (
            <Badge variant="danger" className="text-xs">
              {unreadCount} Unread
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filter === "all" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm" : "text-slate-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filter === "unread" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm" : "text-slate-500"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("high")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filter === "high" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-sm" : "text-slate-500"
              }`}
            >
              High Priority
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              item.read
                ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75"
                : "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/60 shadow-sm"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    item.priority === "high" ? "danger" : item.priority === "medium" ? "warning" : "neutral"
                  }
                  className="uppercase text-[10px]"
                >
                  {item.priority}
                </Badge>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                <span className="text-[10px] text-slate-400">• {item.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{item.message}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => toggleRead(item.id)}
              >
                {item.read ? "Mark Unread" : "Dismiss"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
