import React from "react";
import { cn } from "@nbfc/ui";

export interface Step {
  id: number;
  title: string;
}

export interface StepWizardProps {
  steps: Step[];
  currentStep: number;
}

export const StepWizard: React.FC<StepWizardProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step) => {
        const isCurrent = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        return (
          <div key={step.id} className="flex-1 flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                  isCompleted && "bg-emerald-500 text-white",
                  isCurrent && "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900",
                  !isCompleted && !isCurrent && "bg-slate-200 dark:bg-slate-800 text-slate-500"
                )}
              >
                {isCompleted ? "✓" : step.id}
              </div>
              <span className={cn("text-xs font-semibold hidden sm:inline-block", isCurrent ? "text-slate-900 dark:text-slate-100" : "text-slate-400")}>
                {step.title}
              </span>
            </div>
            {step.id < steps.length && (
              <div className="flex-1 h-0.5 mx-3 bg-slate-200 dark:bg-slate-800" />
            )}
          </div>
        );
      })}
    </div>
  );
};
