import React from "react";
import { Button } from "@nbfc/ui";

export interface FormStepNavProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLastStep?: boolean;
}

export const FormStepNav: React.FC<FormStepNavProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800 mt-8">
      <Button variant="outline" size="sm" onClick={onPrev} disabled={currentStep === 1}>
        &larr; Previous Step
      </Button>
      <span className="text-xs text-slate-500 font-semibold">
        Step {currentStep} of {totalSteps}
      </span>
      <Button size="sm" onClick={onNext}>
        {isLastStep ? "Submit Application" : "Next Step \u2192"}
      </Button>
    </div>
  );
};
