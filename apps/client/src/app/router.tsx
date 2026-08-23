import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet as ReactOutlet } from "react-router-dom";
import { DashboardShell } from "../components/layout/DashboardShell";

const AuthFeature = lazy(() => import("../features/auth"));
const ClientDashboardFeature = lazy(() => import("../features/dashboard"));
const LoanApplicationFeature = lazy(() => import("../features/loan-application"));
const DocumentUploadFeature = lazy(() => import("../features/document-upload"));
const ApplicationStatusFeature = lazy(() => import("../features/application-status"));
const ProfileFeature = lazy(() => import("../features/profile"));

function ClientShell() {
  return (
    <DashboardShell>
      <Suspense
        fallback={
          <div className="p-8 text-center text-slate-400 font-medium">
            Loading portal page...
          </div>
        }
      >
        <ReactOutlet />
      </Suspense>
    </DashboardShell>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <ClientDashboardFeature /> },
      { path: "auth", element: <AuthFeature /> },
      { path: "apply/:type", element: <LoanApplicationFeature /> },
      { path: "document-upload", element: <DocumentUploadFeature /> },
      { path: "application-status", element: <ApplicationStatusFeature /> },
      { path: "profile", element: <ProfileFeature /> },
    ],
  },
]);
