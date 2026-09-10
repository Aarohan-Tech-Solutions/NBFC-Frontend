import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { BankOfficialShell } from "../components/layout/BankOfficialShell";
import { OfficialLoginPage } from "./Login";

const OfficialDashboard = lazy(() => import("../features/dashboard"));
const LoanQueueFeature = lazy(() => import("../features/loan-queue"));
const ApplicationDetailFeature = lazy(() => import("../features/application-detail"));
const OfficialVerificationFeature = lazy(() => import("../features/verification"));
const SanctionFeature = lazy(() => import("../features/sanction"));
const OfficialDisbursementFeature = lazy(() => import("../features/disbursement"));
const OfficialRejectionsFeature = lazy(() => import("../features/rejections"));
const OfficialReportsFeature = lazy(() => import("../features/reports"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <OfficialLoginPage />,
  },
  {
    path: "/",
    element: <BankOfficialShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <OfficialDashboard /> },
      { path: "queue", element: <LoanQueueFeature /> },
      { path: "queue/:id", element: <ApplicationDetailFeature /> },
      { path: "verification", element: <OfficialVerificationFeature /> },
      { path: "sanction", element: <SanctionFeature /> },
      { path: "disbursement", element: <OfficialDisbursementFeature /> },
      { path: "rejections", element: <OfficialRejectionsFeature /> },
      { path: "reports", element: <OfficialReportsFeature /> },
    ],
  },
]);
