import { lazy, Suspense, useState, useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { LunoSidebar } from "../components/layout/LunoSidebar";
import { LunoHeader } from "../components/layout/LunoHeader";

// Lazy-loaded feature entry points
const DashboardFeature = lazy(() => import("../features/dashboard"));
const UsersFeature = lazy(() => import("../features/users"));
const RolesPermissionsFeature = lazy(() => import("../features/roles-permissions"));
const CompanyFeature = lazy(() => import("../features/company"));
const AreasFeature = lazy(() => import("../features/areas"));
const BranchesFeature = lazy(() => import("../features/branches"));
const DSAFeature = lazy(() => import("../features/dsa"));
const ConnectorsFeature = lazy(() => import("../features/connectors"));
const CustomersFeature = lazy(() => import("../features/customers"));
const LoansFeature = lazy(() => import("../features/loans"));
const DocumentsFeature = lazy(() => import("../features/documents"));
const VerificationFeature = lazy(() => import("../features/verification"));
const LeadsFeature = lazy(() => import("../features/leads"));
const CRMFeature = lazy(() => import("../features/crm"));
const CommissionsFeature = lazy(() => import("../features/commissions"));
const DisbursementFeature = lazy(() => import("../features/disbursement"));
const ReportsFeature = lazy(() => import("../features/reports"));
const CMSFeature = lazy(() => import("../features/cms"));
const SettingsFeature = lazy(() => import("../features/settings"));
const SecurityFeature = lazy(() => import("../features/security"));

function NBFCAdminShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route navigation
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    // On mobile (< 1024px), toggle mobile overlay drawer
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      // On desktop (>= 1024px), toggle mini/expanded sidebar
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1015] text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-[#00d2b4]/30 selection:text-white relative overflow-x-hidden transition-colors duration-200">
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Mini / Expanded Fixed Left Sidebar */}
      <LunoSidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[margin-left] duration-300 ease-[cubic-bezier(0.2,0,0,1)] will-change-[margin-left] ${
          isSidebarCollapsed ? "lg:ml-[88px]" : "lg:ml-[300px]"
        }`}
      >
        {/* Sticky Top Header (76px) */}
        <LunoHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />

        {/* Dashboard Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-12 flex-1 min-h-[calc(100vh-76px)] max-w-[100vw] overflow-x-hidden">
          <Suspense
            fallback={
              <div className="p-16 text-center text-slate-400 font-semibold text-xs flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00d2b4] animate-ping" />
                <span>Loading NBFC CRM Module...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NBFCAdminShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardFeature /> },
      { path: "users", element: <UsersFeature /> },
      { path: "roles-permissions", element: <RolesPermissionsFeature /> },
      { path: "company", element: <CompanyFeature /> },
      { path: "areas", element: <AreasFeature /> },
      { path: "branches", element: <BranchesFeature /> },
      { path: "dsa", element: <DSAFeature /> },
      { path: "connectors", element: <ConnectorsFeature /> },
      { path: "customers", element: <CustomersFeature /> },
      { path: "loans", element: <LoansFeature /> },
      { path: "documents", element: <DocumentsFeature /> },
      { path: "verification", element: <VerificationFeature /> },
      { path: "leads", element: <LeadsFeature /> },
      { path: "crm", element: <CRMFeature /> },
      { path: "commissions", element: <CommissionsFeature /> },
      { path: "disbursement", element: <DisbursementFeature /> },
      { path: "reports", element: <ReportsFeature /> },
      { path: "cms", element: <CMSFeature /> },
      { path: "settings", element: <SettingsFeature /> },
      { path: "security", element: <SecurityFeature /> },
    ],
  },
]);
