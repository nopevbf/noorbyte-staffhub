import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./components/layout/AppLayout";
import { fetchCurrentUser } from "./auth/api";

async function requireAuth() {
  const user = await fetchCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return null;
}

async function requireGuest() {
  const user = await fetchCurrentUser();

  if (user) {
    return redirect("/dashboard");
  }

  return null;
}

/* ---------- Lazy-load helper ---------- */
function lazyPage(factory: () => Promise<{ default: React.ComponentType }>) {
  const Comp = lazy(factory);
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "var(--surface-400)",
          }}
        >
          Loading…
        </div>
      }
    >
      <Comp />
    </Suspense>
  );
}

const router = createBrowserRouter([
  /* ======================== PUBLIC ======================== */
  {
    path: "/login",
    loader: requireGuest,
    element: lazyPage(() => import("./pages/auth/Login")),
  },
  {
    path: "/forgot-password",
    loader: requireGuest,
    element: lazyPage(() => import("./pages/auth/ForgotPassword")),
  },
  {
    path: "/reset-password",
    loader: requireGuest,
    element: lazyPage(() => import("./pages/auth/ResetPassword")),
  },

  /* ======================== APP SHELL (Authenticated) ======================== */
  {
    path: "/",
    loader: requireAuth,
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      /* ---------- Dashboard ---------- */
      {
        path: "dashboard",
        element: lazyPage(() => import("./pages/dashboard/DashboardHome")),
      },
      {
        path: "notifications",
        element: lazyPage(() => import("./pages/dashboard/Notifications")),
      },
      {
        path: "search",
        element: lazyPage(() => import("./pages/dashboard/SearchResults")),
      },

      /* ---------- Employees ---------- */
      {
        path: "employees",
        element: lazyPage(() => import("./pages/employees/EmployeeList")),
      },
      {
        path: "employees/new",
        element: lazyPage(() => import("./pages/employees/AddEmployee")),
      },
      {
        path: "employees/:id",
        element: lazyPage(() => import("./pages/employees/EmployeeDetail")),
      },
      {
        path: "employees/:id/edit",
        element: lazyPage(() => import("./pages/employees/EditEmployee")),
      },
      {
        path: "employees/structure",
        element: lazyPage(() => import("./pages/employees/EmployeeStructure")),
      },
      {
        path: "employees/contracts",
        element: lazyPage(() => import("./pages/employees/Contracts")),
      },
      {
        path: "employees/bulk-import",
        element: lazyPage(() => import("./pages/employees/BulkImport")),
      },

      /* ---------- Attendance ---------- */
      {
        path: "attendance/live",
        element: lazyPage(() => import("./pages/attendance/LiveMonitor")),
      },
      {
        path: "attendance/summary",
        element: lazyPage(() => import("./pages/attendance/AttendanceSummary")),
      },
      {
        path: "attendance/:id",
        element: lazyPage(() => import("./pages/attendance/AttendanceDetail")),
      },
      {
        path: "attendance/manual",
        element: lazyPage(() => import("./pages/attendance/ManualEntry")),
      },
      {
        path: "attendance/overtime",
        element: lazyPage(
          () => import("./pages/attendance/OvertimeManagement"),
        ),
      },
      {
        path: "attendance/overtime/:id",
        element: lazyPage(() => import("./pages/attendance/OvertimeDetail")),
      },
      {
        path: "attendance/leave",
        element: lazyPage(() => import("./pages/attendance/LeaveManagement")),
      },
      {
        path: "attendance/leave/:id",
        element: lazyPage(() => import("./pages/attendance/LeaveDetail")),
      },
      {
        path: "attendance/calendar",
        element: lazyPage(() => import("./pages/attendance/WorkCalendar")),
      },
      {
        path: "attendance/shifts",
        element: lazyPage(() => import("./pages/attendance/ShiftManagement")),
      },

      /* ---------- Payroll ---------- */
      {
        path: "payroll/process",
        element: lazyPage(() => import("./pages/payroll/PayrollProcess")),
      },
      {
        path: "payroll/process/continue",
        element: lazyPage(
          () => import("./pages/payroll/PayrollProcessContinue"),
        ),
      },
      {
        path: "payroll/history",
        element: lazyPage(() => import("./pages/payroll/PayrollHistory")),
      },
      {
        path: "payroll/:period/:employeeId",
        element: lazyPage(() => import("./pages/payroll/PayrollDetail")),
      },
      {
        path: "payroll/master-salary",
        element: lazyPage(() => import("./pages/payroll/MasterSalary")),
      },
      {
        path: "payroll/master-salary/:id",
        element: lazyPage(() => import("./pages/payroll/MasterSalaryForm")),
      },
      {
        path: "payroll/master-overtime",
        element: lazyPage(() => import("./pages/payroll/MasterOvertime")),
      },
      {
        path: "payroll/master-overtime/:id",
        element: lazyPage(() => import("./pages/payroll/MasterOvertimeForm")),
      },
      {
        path: "payroll/master-deduction",
        element: lazyPage(() => import("./pages/payroll/MasterDeduction")),
      },
      {
        path: "payroll/master-deduction/:id",
        element: lazyPage(() => import("./pages/payroll/MasterDeductionForm")),
      },
      {
        path: "payroll/payslips",
        element: lazyPage(() => import("./pages/payroll/PayslipDistribution")),
      },
      {
        path: "payroll/tax",
        element: lazyPage(() => import("./pages/payroll/TaxReport")),
      },

      /* ---------- Finance ---------- */
      {
        path: "finance",
        element: lazyPage(() => import("./pages/finance/FinanceDashboard")),
      },
      {
        path: "finance/income",
        element: lazyPage(() => import("./pages/finance/IncomeList")),
      },
      {
        path: "finance/income/new",
        element: lazyPage(() => import("./pages/finance/AddIncome")),
      },
      {
        path: "finance/income/:id",
        element: lazyPage(() => import("./pages/finance/IncomeDetail")),
      },
      {
        path: "finance/expense",
        element: lazyPage(() => import("./pages/finance/ExpenseList")),
      },
      {
        path: "finance/expense/new",
        element: lazyPage(() => import("./pages/finance/AddExpense")),
      },
      {
        path: "finance/expense/:id",
        element: lazyPage(() => import("./pages/finance/ExpenseDetail")),
      },
      {
        path: "finance/categories",
        element: lazyPage(() => import("./pages/finance/Categories")),
      },
      {
        path: "finance/categories/:id",
        element: lazyPage(() => import("./pages/finance/CategoryForm")),
      },
      {
        path: "finance/budget",
        element: lazyPage(() => import("./pages/finance/Budgeting")),
      },
      {
        path: "finance/reports",
        element: lazyPage(() => import("./pages/finance/FinanceReports")),
      },
      {
        path: "finance/reports/:type",
        element: lazyPage(() => import("./pages/finance/ReportViewer")),
      },

      /* ---------- WhatsApp Bot ---------- */
      {
        path: "bot/status",
        element: lazyPage(() => import("./pages/bot/BotStatus")),
      },
      {
        path: "bot/logs",
        element: lazyPage(() => import("./pages/bot/MessageLogs")),
      },
      {
        path: "bot/logs/:sessionId",
        element: lazyPage(() => import("./pages/bot/ConversationDetail")),
      },
      {
        path: "bot/broadcast",
        element: lazyPage(() => import("./pages/bot/Broadcast")),
      },
      {
        path: "bot/broadcast/history",
        element: lazyPage(() => import("./pages/bot/BroadcastHistory")),
      },
      {
        path: "bot/auto-reply",
        element: lazyPage(() => import("./pages/bot/AutoReply")),
      },
      {
        path: "bot/templates",
        element: lazyPage(() => import("./pages/bot/Templates")),
      },
      {
        path: "bot/contacts",
        element: lazyPage(() => import("./pages/bot/ContactSync")),
      },

      /* ---------- Reports ---------- */
      {
        path: "reports",
        element: lazyPage(() => import("./pages/reports/ReportCenter")),
      },
      {
        path: "reports/attendance",
        element: lazyPage(() => import("./pages/reports/AttendanceReport")),
      },
      {
        path: "reports/payroll",
        element: lazyPage(() => import("./pages/reports/PayrollReport")),
      },
      {
        path: "reports/finance",
        element: lazyPage(() => import("./pages/reports/FinancialReport")),
      },
      {
        path: "reports/employees",
        element: lazyPage(() => import("./pages/reports/EmployeeReport")),
      },
      {
        path: "reports/builder",
        element: lazyPage(() => import("./pages/reports/ReportBuilder")),
      },
      {
        path: "reports/scheduled",
        element: lazyPage(() => import("./pages/reports/ScheduledReports")),
      },

      /* ---------- Settings ---------- */
      {
        path: "settings/company",
        element: lazyPage(() => import("./pages/settings/CompanyProfile")),
      },
      {
        path: "settings/work-hours",
        element: lazyPage(() => import("./pages/settings/WorkHours")),
      },
      {
        path: "settings/locations",
        element: lazyPage(() => import("./pages/settings/Locations")),
      },
      {
        path: "settings/locations/:id",
        element: lazyPage(() => import("./pages/settings/LocationForm")),
      },
      {
        path: "settings/users",
        element: lazyPage(() => import("./pages/settings/UsersRoles")),
      },
      {
        path: "settings/users/:id",
        element: lazyPage(() => import("./pages/settings/UserForm")),
      },
      {
        path: "settings/roles",
        element: lazyPage(() => import("./pages/settings/RolesPermissions")),
      },
      {
        path: "settings/notifications",
        element: lazyPage(
          () => import("./pages/settings/NotificationSettings"),
        ),
      },
      {
        path: "settings/integrations",
        element: lazyPage(() => import("./pages/settings/Integrations")),
      },
      {
        path: "settings/backup",
        element: lazyPage(() => import("./pages/settings/BackupExport")),
      },
      {
        path: "settings/audit-log",
        element: lazyPage(() => import("./pages/settings/AuditLog")),
      },
      { path: "*", element: lazyPage(() => import("./pages/errors/NotFound")) },
    ],
  },

  /* ======================== ERROR / UTILITY ======================== */
  { path: "/403", element: lazyPage(() => import("./pages/errors/Forbidden")) },
  {
    path: "/500",
    element: lazyPage(() => import("./pages/errors/ServerError")),
  },
  {
    path: "/maintenance",
    element: lazyPage(() => import("./pages/errors/Maintenance")),
  },
  {
    path: "/offline",
    element: lazyPage(() => import("./pages/errors/Offline")),
  },
]);

export default router;
