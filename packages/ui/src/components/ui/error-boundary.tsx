import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[360px] flex items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/40 shadow-sm text-center">
          <div className="max-w-md space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl font-black">
              !
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Something went wrong
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {this.state.error?.message || "An unexpected error occurred while rendering this module."}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="sm" variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button size="sm" onClick={this.handleReset}>
                Reload Module
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
