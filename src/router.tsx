import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppLayout from './components/layout/AppLayout';

/* ---------- Lazy-load helper ---------- */
function L(factory: () => Promise<{ default: React.ComponentType }>) {
  const Comp = lazy(factory);
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--surface-400)' }}>Loading…</div>}>
      <Comp />
    </Suspense>
  );
}

const router = createBrowserRouter([
  /* ======================== PUBLIC ======================== */
  { path: '/login', element: L(() => import('./pages/auth/Login')) },
  { path: '/forgot-password', element: L(() => import('./pages/auth/ForgotPassword')) },
  { path: '/reset-password', element: L(() => import('./pages/auth/ResetPassword')) },

  /* ======================== APP SHELL (Authenticated) ======================== */
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      /* ---------- Dashboard ---------- */
      { path: 'dashboard', element: L(() => import('./pages/dashboard/DashboardHome')) },
      { path: 'notifications', element: L(() => import('./pages/dashboard/Notifications')) },
      { path: 'search', element: L(() => import('./pages/dashboard/SearchResults')) },

      /* ---------- Employees ---------- */
      { path: 'employees', element: L(() => import('./pages/employees/EmployeeList')) },
      { path: 'employees/new', element: L(() => import('./pages/employees/AddEmployee')) },
      { path: 'employees/:id', element: L(() => import('./pages/employees/EmployeeDetail')) },
      { path: 'employees/:id/edit', element: L(() => import('./pages/employees/EditEmployee')) },
      { path: 'employees/structure', element: L(() => import('./pages/employees/EmployeeStructure')) },
      { path: 'employees/contracts', element: L(() => import('./pages/employees/Contracts')) },
      { path: 'employees/bulk-import', element: L(() => import('./pages/employees/BulkImport')) },

      /* ---------- Attendance ---------- */
      { path: 'attendance/live', element: L(() => import('./pages/attendance/LiveMonitor')) },
      { path: 'attendance/summary', element: L(() => import('./pages/attendance/AttendanceSummary')) },
      { path: 'attendance/:id', element: L(() => import('./pages/attendance/AttendanceDetail')) },
      { path: 'attendance/manual', element: L(() => import('./pages/attendance/ManualEntry')) },
      { path: 'attendance/overtime', element: L(() => import('./pages/attendance/OvertimeManagement')) },
      { path: 'attendance/overtime/:id', element: L(() => import('./pages/attendance/OvertimeDetail')) },
      { path: 'attendance/leave', element: L(() => import('./pages/attendance/LeaveManagement')) },
      { path: 'attendance/leave/:id', element: L(() => import('./pages/attendance/LeaveDetail')) },
      { path: 'attendance/calendar', element: L(() => import('./pages/attendance/WorkCalendar')) },
      { path: 'attendance/shifts', element: L(() => import('./pages/attendance/ShiftManagement')) },

      /* ---------- Payroll ---------- */
      { path: 'payroll/process', element: L(() => import('./pages/payroll/PayrollProcess')) },
      { path: 'payroll/history', element: L(() => import('./pages/payroll/PayrollHistory')) },
      { path: 'payroll/:period/:employeeId', element: L(() => import('./pages/payroll/PayrollDetail')) },
      { path: 'payroll/master-salary', element: L(() => import('./pages/payroll/MasterSalary')) },
      { path: 'payroll/master-salary/:id', element: L(() => import('./pages/payroll/MasterSalaryForm')) },
      { path: 'payroll/master-overtime', element: L(() => import('./pages/payroll/MasterOvertime')) },
      { path: 'payroll/master-overtime/:id', element: L(() => import('./pages/payroll/MasterOvertimeForm')) },
      { path: 'payroll/master-deduction', element: L(() => import('./pages/payroll/MasterDeduction')) },
      { path: 'payroll/master-deduction/:id', element: L(() => import('./pages/payroll/MasterDeductionForm')) },
      { path: 'payroll/payslips', element: L(() => import('./pages/payroll/PayslipDistribution')) },
      { path: 'payroll/tax', element: L(() => import('./pages/payroll/TaxReport')) },

      /* ---------- Finance ---------- */
      { path: 'finance', element: L(() => import('./pages/finance/FinanceDashboard')) },
      { path: 'finance/income', element: L(() => import('./pages/finance/IncomeList')) },
      { path: 'finance/income/new', element: L(() => import('./pages/finance/AddIncome')) },
      { path: 'finance/income/:id', element: L(() => import('./pages/finance/IncomeDetail')) },
      { path: 'finance/expense', element: L(() => import('./pages/finance/ExpenseList')) },
      { path: 'finance/expense/new', element: L(() => import('./pages/finance/AddExpense')) },
      { path: 'finance/expense/:id', element: L(() => import('./pages/finance/ExpenseDetail')) },
      { path: 'finance/categories', element: L(() => import('./pages/finance/Categories')) },
      { path: 'finance/categories/:id', element: L(() => import('./pages/finance/CategoryForm')) },
      { path: 'finance/budget', element: L(() => import('./pages/finance/Budgeting')) },
      { path: 'finance/reports', element: L(() => import('./pages/finance/FinanceReports')) },
      { path: 'finance/reports/:type', element: L(() => import('./pages/finance/ReportViewer')) },

      /* ---------- WhatsApp Bot ---------- */
      { path: 'bot/status', element: L(() => import('./pages/bot/BotStatus')) },
      { path: 'bot/logs', element: L(() => import('./pages/bot/MessageLogs')) },
      { path: 'bot/logs/:sessionId', element: L(() => import('./pages/bot/ConversationDetail')) },
      { path: 'bot/broadcast', element: L(() => import('./pages/bot/Broadcast')) },
      { path: 'bot/broadcast/history', element: L(() => import('./pages/bot/BroadcastHistory')) },
      { path: 'bot/auto-reply', element: L(() => import('./pages/bot/AutoReply')) },
      { path: 'bot/templates', element: L(() => import('./pages/bot/Templates')) },
      { path: 'bot/contacts', element: L(() => import('./pages/bot/ContactSync')) },

      /* ---------- Reports ---------- */
      { path: 'reports', element: L(() => import('./pages/reports/ReportCenter')) },
      { path: 'reports/attendance', element: L(() => import('./pages/reports/AttendanceReport')) },
      { path: 'reports/payroll', element: L(() => import('./pages/reports/PayrollReport')) },
      { path: 'reports/finance', element: L(() => import('./pages/reports/FinancialReport')) },
      { path: 'reports/employees', element: L(() => import('./pages/reports/EmployeeReport')) },
      { path: 'reports/builder', element: L(() => import('./pages/reports/ReportBuilder')) },
      { path: 'reports/scheduled', element: L(() => import('./pages/reports/ScheduledReports')) },

      /* ---------- Settings ---------- */
      { path: 'settings/company', element: L(() => import('./pages/settings/CompanyProfile')) },
      { path: 'settings/work-hours', element: L(() => import('./pages/settings/WorkHours')) },
      { path: 'settings/locations', element: L(() => import('./pages/settings/Locations')) },
      { path: 'settings/locations/:id', element: L(() => import('./pages/settings/LocationForm')) },
      { path: 'settings/users', element: L(() => import('./pages/settings/UsersRoles')) },
      { path: 'settings/users/:id', element: L(() => import('./pages/settings/UserForm')) },
      { path: 'settings/roles', element: L(() => import('./pages/settings/RolesPermissions')) },
      { path: 'settings/notifications', element: L(() => import('./pages/settings/NotificationSettings')) },
      { path: 'settings/integrations', element: L(() => import('./pages/settings/Integrations')) },
      { path: 'settings/backup', element: L(() => import('./pages/settings/BackupExport')) },
      { path: 'settings/audit-log', element: L(() => import('./pages/settings/AuditLog')) },
      { path: '*', element: L(() => import('./pages/errors/NotFound')) },
    ],
  },

  /* ======================== ERROR / UTILITY ======================== */
  { path: '/403', element: L(() => import('./pages/errors/Forbidden')) },
  { path: '/500', element: L(() => import('./pages/errors/ServerError')) },
  { path: '/maintenance', element: L(() => import('./pages/errors/Maintenance')) },
  { path: '/offline', element: L(() => import('./pages/errors/Offline')) },
]);

export default router;
