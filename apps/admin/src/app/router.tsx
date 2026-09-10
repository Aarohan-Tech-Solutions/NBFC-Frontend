import { lazy, Suspense, useState, useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { LunoSidebar } from "../components/layout/LunoSidebar";
import { LunoHeader } from "../components/layout/LunoHeader";
import { LoginPage } from "./Login";
import { useAuthStore } from "../stores/auth.store";
import { Role } from "@nbfc/shared-types";

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

// Role-Guard wrapper component for routes
function RoleGuardedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: React.ReactNode;
}) {
  const { role } = useAuthStore();
  const currentRole = role || Role.SUPER_ADMIN;

  if (!allowedRoles.includes(currentRole)) {
    return (
      <div className="bg-white dark:bg-[#171922] p-8 rounded-2xl border border-slate-200 dark:border-[#252836] text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-xl font-black">
          !
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Access Restricted for {currentRole.replace("_", " ").toUpperCase()}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your current active role does not have operational permissions to access this administrative module.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
        >
          &larr; Go Back to Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

function NBFCAdminShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route navigation
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
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

      {/* Mini / Expanded Left Sidebar */}
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
                <span>Loading NBFC Module...</span>
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

const ALL_ROLES = [
  Role.SUPER_ADMIN,
  Role.COMPANY_ADMIN,
  Role.AREA_MANAGER,
  Role.BRANCH_MANAGER,
  Role.DSA,
  Role.CONNECTOR,
  Role.STAFF,
];

const MGMT_ROLES = [
  Role.SUPER_ADMIN,
  Role.COMPANY_ADMIN,
  Role.AREA_MANAGER,
  Role.BRANCH_MANAGER,
];

const HQ_ROLES = [Role.SUPER_ADMIN, Role.COMPANY_ADMIN];

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <NBFCAdminShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardFeature /> },
      
      {
        path: "loans",
        element: (
          <RoleGuardedRoute allowedRoles={ALL_ROLES}>
            <LoansFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "verification",
        element: (
          <RoleGuardedRoute
            allowedRoles={[
              Role.SUPER_ADMIN,
              Role.COMPANY_ADMIN,
              Role.AREA_MANAGER,
              Role.BRANCH_MANAGER,
              Role.STAFF,
            ]}
          >
            <VerificationFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "areas",
        element: (
          <RoleGuardedRoute allowedRoles={HQ_ROLES}>
            <AreasFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "branches",
        element: (
          <RoleGuardedRoute allowedRoles={[Role.SUPER_ADMIN, Role.COMPANY_ADMIN, Role.AREA_MANAGER]}>
            <BranchesFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "dsa",
        element: (
          <RoleGuardedRoute allowedRoles={MGMT_ROLES}>
            <DSAFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "connectors",
        element: (
          <RoleGuardedRoute allowedRoles={[...MGMT_ROLES, Role.DSA]}>
            <ConnectorsFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "leads",
        element: (
          <RoleGuardedRoute allowedRoles={[...MGMT_ROLES, Role.DSA, Role.CONNECTOR]}>
            <LeadsFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "customers",
        element: (
          <RoleGuardedRoute allowedRoles={MGMT_ROLES}>
            <CustomersFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "disbursement",
        element: (
          <RoleGuardedRoute allowedRoles={MGMT_ROLES}>
            <DisbursementFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "commissions",
        element: (
          <RoleGuardedRoute allowedRoles={[...MGMT_ROLES, Role.DSA, Role.CONNECTOR]}>
            <CommissionsFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <RoleGuardedRoute allowedRoles={MGMT_ROLES}>
            <ReportsFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "company",
        element: (
          <RoleGuardedRoute allowedRoles={HQ_ROLES}>
            <CompanyFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <RoleGuardedRoute allowedRoles={HQ_ROLES}>
            <UsersFeature />
          </RoleGuardedRoute>
        ),
      },
      {
        path: "roles-permissions",
        element: (
          <RoleGuardedRoute allowedRoles={HQ_ROLES}>
            <RolesPermissionsFeature />
          </RoleGuardedRoute>
        ),
      },
      { path: "documents", element: <DocumentsFeature /> },
      { path: "crm", element: <CRMFeature /> },
      { path: "cms", element: <CMSFeature /> },
      { path: "settings", element: <SettingsFeature /> },
      { path: "security", element: <SecurityFeature /> },
    ],
  },
]);
