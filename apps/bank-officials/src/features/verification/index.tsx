import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { verificationApi } from "@nbfc/api-client";
import { exportToCSV } from "../../lib/exportUtils";
import { Badge, Button, Tabs, Modal } from "@nbfc/ui";
import { Search, Download } from "lucide-react";

export const OfficialVerificationFeature: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [reviewRemarks, setReviewRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verificationApi.getVerificationTasks().then((data) => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  const tabs = [
    { id: "all", label: "All Verification Queues" },
    { id: "KYC", label: "KYC & Identity" },
    { id: "Bank", label: "Bank & Income Inflow" },
    { id: "Property", label: "Property Legal & Valuation" },
    { id: "Guarantor", label: "Guarantor Checks" },
    { id: "Document", label: "Document Authenticity" },
  ];

  const handleOpenReview = (task: any) => {
    setSelectedTask(task);
    setReviewRemarks(task.remarks || "");
  };

  const handleDecision = async (status: string) => {
    if (!selectedTask) return;
    await verificationApi.updateTaskStatus(selectedTask.id, status as any, reviewRemarks);
    setTasks((prev) =>
      prev.map((t) => (t.id === selectedTask.id ? { ...t, status, remarks: reviewRemarks } : t))
    );
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesTab = activeTab === "all" || t.category === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      t.appNo.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      t.taskTitle.toLowerCase().includes(q) ||
      t.assignedOfficer.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const handleExport = () => {
    const exportData = filteredTasks.map((t) => ({
      "App No": t.appNo,
      Borrower: t.customerName,
      Product: t.loanProduct,
      Category: t.category,
      Task: t.taskTitle,
      Officer: t.assignedOfficer,
      Priority: t.priority,
      Status: t.status,
      "Due Date": t.dueDate,
      Remarks: t.remarks,
    }));
    exportToCSV("Official_Verification_Queue", exportData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification & Field Inspection Desk"
        description="Verify KYC identity, on-ground property valuation, income tax returns, and guarantor creditworthiness with official audit signoff."
        action={
          <Button size="sm" variant="outline" onClick={handleExport} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Queue CSV
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="flex items-center justify-between bg-white dark:bg-[#151722] p-4 rounded-2xl border border-slate-200 dark:border-[#242736]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, app #, borrower..."
            className="w-full bg-slate-50 dark:bg-[#1a1d29] border border-slate-200 dark:border-[#282c3c] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          {filteredTasks.length} active verification items
        </span>
      </div>

      <div className="bg-white dark:bg-[#151722] rounded-2xl border border-slate-200 dark:border-[#242736] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a1d29] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-[#252838]">
              <tr>
                <th className="py-3.5 px-4">Task & Application</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Assigned Officer</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-[#181a24] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{t.taskTitle}</div>
                    <div className="text-[11px] text-slate-400">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{t.appNo}</span> &bull; {t.customerName} ({t.loanProduct})
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="info">{t.category}</Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{t.assignedOfficer}</td>
                  <td className="py-3 px-4">
                    <Badge variant={t.priority === "High" ? "danger" : "warning"}>{t.priority}</Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{t.dueDate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={t.status === "Verified" ? "success" : t.status === "Rejected" ? "danger" : "warning"}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button size="sm" variant="outline" onClick={() => handleOpenReview(t)} className="text-xs">
                      Review & Clear
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={`Verification Review - ${selectedTask.taskTitle}`}
          className="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191b26] border border-slate-200 dark:border-[#262a3a] space-y-1">
              <div className="flex justify-between font-bold">
                <span>{selectedTask.customerName} ({selectedTask.appNo})</span>
                <Badge variant={selectedTask.status === "Verified" ? "success" : "warning"}>{selectedTask.status}</Badge>
              </div>
              <div className="text-slate-500">{selectedTask.loanProduct} &bull; Category: {selectedTask.category} &bull; Officer: {selectedTask.assignedOfficer}</div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Official Verification Findings & Remarks:
              </label>
              <textarea
                rows={3}
                value={reviewRemarks}
                onChange={(e) => setReviewRemarks(e.target.value)}
                placeholder="Enter field inspection findings or title verification notes..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                size="sm"
                variant="outline"
                className="text-rose-600 hover:bg-rose-50"
                onClick={() => handleDecision("Rejected")}
              >
                Reject Task
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-amber-600 hover:bg-amber-50"
                  onClick={() => handleDecision("Action Required")}
                >
                  Request Info
                </Button>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleDecision("Verified")}
                >
                  Clear & Approve
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OfficialVerificationFeature;
