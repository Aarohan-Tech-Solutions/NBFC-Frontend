import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ApplicationsSubFeature, initialLoanApplications } from "./applications";
import { LoanTypesSubFeature } from "./loan-types";
import { LoanDetailPanel, LoanApplicationItem } from "./components/LoanDetailPanel";
import { NewApplicationWizard } from "./components/NewApplicationWizard";
import { Tabs, Button } from "@nbfc/ui";

export const LoansFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<LoanApplicationItem[]>(initialLoanApplications);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedLoanForPreview, setSelectedLoanForPreview] = useState<LoanApplicationItem | null>(null);

  const tabs = [
    { id: "applications", label: "Loan Applications Pipeline" },
    { id: "loan-types", label: "Loan Products & Schemes" },
    { id: "preview", label: "Sanction & Underwriting Panel" },
  ];

  const handleAddNewApplication = (newApp: any) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Management Module"
        description="End-to-end loan origination lifecycle, multi-product scheme configuration, automated underwriting, and sanctioning."
        action={
          <Button size="sm" onClick={() => setIsWizardOpen(true)}>
            + Create New Loan Application
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div>
        {activeTab === "applications" && (
          <ApplicationsSubFeature
            applications={applications}
            onOpenDetail={(loan) => {
              setSelectedLoanForPreview(loan);
              setActiveTab("preview");
            }}
            onUpdateStatus={(id, status) => {
              setApplications((prev) =>
                prev.map((a) => (a.id === id ? { ...a, status } : a))
              );
            }}
          />
        )}
        {activeTab === "loan-types" && <LoanTypesSubFeature />}
        {activeTab === "preview" && (
          <LoanDetailPanel
            loan={selectedLoanForPreview || applications[0]}
            onUpdateStatus={(id, status) => {
              setApplications((prev) =>
                prev.map((a) => (a.id === id ? { ...a, status } : a))
              );
            }}
          />
        )}
      </div>

      {/* New Application Wizard */}
      <NewApplicationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleAddNewApplication}
      />
    </div>
  );
};

export default LoansFeature;
