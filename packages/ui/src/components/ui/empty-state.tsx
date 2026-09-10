import React from "react";
import { Button } from "./button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 my-4">
      {icon ? (
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
          {icon}
        </div>
      ) : (
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg mb-3">
          Ø
        </div>
      )}
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="text-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
