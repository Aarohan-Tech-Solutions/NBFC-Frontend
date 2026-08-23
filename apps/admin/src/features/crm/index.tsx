import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Badge, Button, Tabs, Modal, Input, Select } from "@nbfc/ui";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

export const CRMFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState("calls");
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Call Logs
  const [callLogs, setCallLogs] = useState([
    { id: "1", customer: "Rahul Kapoor", phone: "+91 99887 76655", direction: "Outgoing", duration: "4m 12s", outcome: "Sanction Letter Explained", officer: "Subhashis Roy", time: "16 Aug 2026, 10:45 AM", notes: "Customer agreed on 8.65% interest rate. Property documents collected." },
    { id: "2", customer: "Priya Sundaram", phone: "+91 97766 55443", direction: "Incoming", duration: "2m 30s", outcome: "Inquiry on Disbursement", officer: "Ananya Mukherjee", time: "16 Aug 2026, 09:20 AM", notes: "Explained RTGS transfer timeline once sanction letter is counter-signed." },
    { id: "3", customer: "Rajeshwar Patel", phone: "+91 98250 11223", direction: "Outgoing", duration: "6m 45s", outcome: "Valuation Inspection Date", officer: "Field Inspector B", time: "15 Aug 2026, 04:15 PM", notes: "Confirmed site visit on Friday 11 AM for manufacturing unit." },
    { id: "4", customer: "Meenakshi Sen", phone: "+91 98301 44556", direction: "Outgoing", duration: "1m 50s", outcome: "Followup - No Answer", officer: "Tanmoy Ghosh", time: "15 Aug 2026, 02:10 PM", notes: "Call went unanswered. Scheduled automated WhatsApp reminder." },
  ]);

  // WhatsApp Logs
  const [whatsappLogs] = useState([
    { id: "1", customer: "Rahul Kapoor", phone: "+91 99887 76655", template: "Sanction Letter Issued (WA-04)", preview: "Dear Rahul, Your Home Loan LA-9485 has been sanctioned for ₹ 45 Lakhs. Click link to download.", status: "Read (Blue Tick)", time: "16 Aug 2026, 10:50 AM" },
    { id: "2", customer: "Priya Sundaram", phone: "+91 97766 55443", template: "Document Missing (WA-02)", preview: "Dear Priya, kindly upload your latest 3-month salary slip to expedite sanction.", status: "Delivered", time: "15 Aug 2026, 11:30 AM" },
    { id: "3", customer: "Rajeshwar Patel", phone: "+91 98250 11223", template: "Field Visit Confirmation (WA-07)", preview: "Our field evaluator will visit your Ahmedabad premises on Friday 11:00 AM.", status: "Read (Blue Tick)", time: "15 Aug 2026, 04:30 PM" },
  ]);

  // Email Logs
  const [emailLogs] = useState([
    { id: "1", recipient: "rahul.kapoor@gmail.com", subject: "Formal Sanction Letter - Arohon Capital #LA-9485", template: "Sanction_Letter_V2", status: "Delivered & Opened", time: "16 Aug 2026, 10:55 AM" },
    { id: "2", recipient: "priya.sundaram@outlook.com", subject: "KYC Verification Successful - Application #LA-9486", template: "KYC_Approved", status: "Delivered", time: "15 Aug 2026, 12:00 PM" },
    { id: "3", recipient: "vikas@apexloans.in", subject: "Monthly DSA Commission Payout Advice - July 2026", template: "DSA_Payout_Advice", status: "Delivered", time: "10 Aug 2026, 05:00 PM" },
  ]);

  // Meeting Schedule
  const [meetings, setMeetings] = useState([
    { id: "1", title: "Property Legal Title Document Collection", customer: "Rahul Kapoor", location: "Kolkata Central Branch", dateTime: "18 Aug 2026, 11:30 AM", attendee: "Subhashis Roy", status: "Confirmed" },
    { id: "2", title: "Business Factory Site Valuation", customer: "Rajeshwar Patel", location: "Prahlad Nagar, Ahmedabad", dateTime: "19 Aug 2026, 02:00 PM", attendee: "Valuer M. Kulkarni", status: "Scheduled" },
    { id: "3", title: "DSA Performance Quarterly Review", customer: "Apex Financial (DSA-1042)", location: "Bengaluru Koramangala", dateTime: "20 Aug 2026, 04:00 PM", attendee: "Anand Murthy", status: "Scheduled" },
  ]);

  // Reminders
  const [reminders, setReminders] = useState([
    { id: "1", title: "Collect Signed Sanction Letter for LA-9485", customer: "Rahul Kapoor", dueDate: "Today, 05:00 PM", priority: "High", status: "Pending" },
    { id: "2", title: "Verify GST Return Filing for Business Loan LA-9487", customer: "Rajeshwar Patel", dueDate: "Tomorrow, 12:00 PM", priority: "High", status: "Pending" },
    { id: "3", title: "Follow-up Call for Dropped Website Lead LD-8904", customer: "Deepak Rao", dueDate: "18 Aug 2026", priority: "Medium", status: "Pending" },
  ]);

  // Notes
  const [notes, setNotes] = useState([
    { id: "1", author: "Subhashis Roy (Branch Manager)", customer: "Rahul Kapoor (LA-9485)", text: "Customer has clear 30-year property title. Fast track disbursement approved once original deed is deposited.", time: "16 Aug 2026, 11:00 AM" },
    { id: "2", author: "Ananya Mukherjee (Credit)", customer: "Priya Sundaram (LA-9486)", text: "Bank statement verified with Infosys payroll credit. CIBIL score is 745 with zero past delinquencies.", time: "15 Aug 2026, 03:30 PM" },
  ]);

  const [newLogData, setNewLogData] = useState({
    customer: "",
    phone: "",
    direction: "Outgoing",
    outcome: "Call Completed",
    notes: "",
  });

  const tabs = [
    { id: "calls", label: "Call Logs" },
    { id: "whatsapp", label: "WhatsApp Logs" },
    { id: "emails", label: "Email Logs" },
    { id: "meetings", label: "Meeting Schedule" },
    { id: "reminders", label: "Reminders & Alerts" },
    { id: "notes", label: "Internal Notes" },
  ];

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: String(Date.now()),
      customer: newLogData.customer,
      phone: newLogData.phone || "+91 98765 00000",
      direction: newLogData.direction,
      duration: "3m 15s",
      outcome: newLogData.outcome,
      officer: "Super Admin",
      time: "Just Now",
      notes: newLogData.notes,
    };
    setCallLogs((prev) => [newEntry, ...prev]);
    setIsLogModalOpen(false);
  };

  const handleExport = () => {
    exportToExcel("CRM_Communications_Ledger", "CRM", callLogs);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Follow-up CRM Hub"
        description="Unified multi-channel customer communications: Call logs, WhatsApp automation, email logs, meeting calendar, and reminders."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export CRM Logs
            </Button>
            <Button size="sm" onClick={() => setIsLogModalOpen(true)}>
              + Log New CRM Activity
            </Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab: Call Logs */}
      {activeTab === "calls" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Tele-Calling & Audio Interaction Logs
            </h3>
            <span className="text-xs text-slate-400">Total {callLogs.length} Calls Logged</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {callLogs.map((c) => (
              <div key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{c.customer}</span>
                    <Badge variant={c.direction === "Outgoing" ? "info" : "success"} className="text-[10px]">
                      {c.direction}
                    </Badge>
                    <span className="text-slate-400">• Duration: {c.duration}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{c.notes}</p>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Logged by <span className="font-semibold text-slate-500">{c.officer}</span> • {c.time}
                  </div>
                </div>

                <Badge variant="neutral" className="text-[10px] self-start sm:self-center">
                  {c.outcome}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: WhatsApp Logs */}
      {activeTab === "whatsapp" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              WhatsApp Business API Message History
            </h3>
            <span className="text-xs text-slate-400">Automated Bot & Template Triggers</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {whatsappLogs.map((w) => (
              <div key={w.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{w.customer}</span>
                    <span className="text-slate-400">({w.phone})</span>
                    <span className="font-mono text-blue-600 text-[11px]">[{w.template}]</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-[11px]">
                    "{w.preview}"
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1">{w.time}</div>
                </div>

                <Badge variant="success" className="text-[10px] self-start sm:self-center">
                  {w.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Email Logs */}
      {activeTab === "emails" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Dispatched Corporate Email Notifications
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                <tr>
                  <th className="py-3 px-4 font-semibold">Recipient</th>
                  <th className="py-3 px-4 font-semibold">Subject</th>
                  <th className="py-3 px-4 font-semibold">Template</th>
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold text-right">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {emailLogs.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{e.recipient}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{e.subject}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-blue-600">{e.template}</td>
                    <td className="py-3 px-4 text-slate-500">{e.time}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="success" className="text-[10px]">{e.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Meetings */}
      {activeTab === "meetings" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Scheduled Field Visits & Customer Meetings
            </h3>
            <Button size="sm" variant="outline">+ Schedule Meeting</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {meetings.map((m) => (
              <div key={m.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{m.title}</span>
                  <Badge variant="info" className="text-[10px]">{m.status}</Badge>
                </div>
                <div className="text-slate-500">With: <span className="font-semibold text-slate-800 dark:text-slate-200">{m.customer}</span></div>
                <div className="text-slate-500">Location: {m.location}</div>
                <div className="text-blue-600 font-semibold pt-1">Time: {m.dateTime}</div>
                <div className="text-[10px] text-slate-400">Assigned: {m.attendee}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Reminders */}
      {activeTab === "reminders" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Action Reminders & Pending Tasks
            </h3>
            <Button size="sm" variant="outline">+ Add Reminder</Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {reminders.map((r) => (
              <div key={r.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{r.title}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Customer: {r.customer} • Due: <span className="text-blue-600 font-semibold">{r.dueDate}</span>
                    </div>
                  </div>
                </div>

                <Badge variant={r.priority === "High" ? "danger" : "warning"} className="text-[10px]">
                  {r.priority} Priority
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Notes */}
      {activeTab === "notes" && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Internal Underwriting & Collaboration Notes
            </h3>
            <Button size="sm" variant="outline">+ Add Note</Button>
          </div>

          <div className="space-y-3">
            {notes.map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{n.author}</span>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <div className="text-blue-600 font-semibold text-[11px]">Re: {n.customer}</div>
                <p className="text-slate-600 dark:text-slate-300">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log Activity Modal */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        title="Log CRM Activity / Phone Call"
      >
        <form onSubmit={handleSaveLog} className="space-y-4">
          <Input
            label="Customer Name"
            placeholder="e.g. Rahul Kapoor"
            value={newLogData.customer}
            onChange={(e) => setNewLogData({ ...newLogData, customer: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            placeholder="+91 99887 76655"
            value={newLogData.phone}
            onChange={(e) => setNewLogData({ ...newLogData, phone: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Call Direction"
              value={newLogData.direction}
              onChange={(e) => setNewLogData({ ...newLogData, direction: e.target.value })}
              options={[
                { label: "Outgoing Call", value: "Outgoing" },
                { label: "Incoming Call", value: "Incoming" },
              ]}
            />
            <Select
              label="Interaction Outcome"
              value={newLogData.outcome}
              onChange={(e) => setNewLogData({ ...newLogData, outcome: e.target.value })}
              options={[
                { label: "Call Completed", value: "Call Completed" },
                { label: "Sanction Discussed", value: "Sanction Discussed" },
                { label: "Documents Requested", value: "Documents Requested" },
                { label: "No Answer / Busy", value: "No Answer" },
              ]}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Call Summary & Notes
            </label>
            <textarea
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
              value={newLogData.notes}
              onChange={(e) => setNewLogData({ ...newLogData, notes: e.target.value })}
              placeholder="Enter details of what was discussed with the customer..."
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsLogModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Activity</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CRMFeature;
