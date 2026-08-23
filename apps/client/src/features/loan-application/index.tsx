import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StepWizard } from "./components/StepWizard";
import { FormStepNav } from "./components/FormStepNav";
import { ReviewSummary } from "./components/ReviewSummary";
import { PersonalLoanFlow } from "./personal-loan";
import { HomeLoanFlow } from "./home-loan";
import { BusinessLoanFlow } from "./business-loan";
import { MortgageLoanFlow } from "./mortgage-loan";
import { CarLoanFlow } from "./car-loan";
import { EducationLoanFlow } from "./education-loan";
import { GoldLoanFlow } from "./gold-loan";

export const LoanApplicationFeature: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Loan Details" },
    { id: 2, title: "Applicant Info" },
    { id: 3, title: "Review & Submit" },
  ];

  const loanTypeTitle = type ? type.replace("-", " ").toUpperCase() : "PERSONAL LOAN";

  const renderLoanTypeForm = () => {
    switch (type) {
      case "home-loan":
        return <HomeLoanFlow />;
      case "business-loan":
        return <BusinessLoanFlow />;
      case "mortgage-loan":
        return <MortgageLoanFlow />;
      case "car-loan":
        return <CarLoanFlow />;
      case "education-loan":
        return <EducationLoanFlow />;
      case "gold-loan":
        return <GoldLoanFlow />;
      default:
        return <PersonalLoanFlow />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
      <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-6">{loanTypeTitle} Application</h2>
      <StepWizard steps={steps} currentStep={currentStep} />

      {currentStep === 1 && renderLoanTypeForm()}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">Personal & KYC Details</h3>
          <p className="text-xs text-slate-500">Form fields auto-filled from your verified profile.</p>
        </div>
      )}
      {currentStep === 3 && (
        <ReviewSummary loanType={loanTypeTitle} amount="₹ 10,00,000" tenure="36 Months" />
      )}

      <FormStepNav
        currentStep={currentStep}
        totalSteps={3}
        onNext={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
        onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
        isLastStep={currentStep === 3}
      />
    </div>
  );
};

export default LoanApplicationFeature;
