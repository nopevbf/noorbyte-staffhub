import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Clock,
  Wallet,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface NavChild {
  label: string;
  to: string;
}

interface NavGroup {
  icon: React.ReactNode;
  label: string;
  basePath: string;
  children: NavChild[];
}

const navGroups: NavGroup[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    basePath: "/dashboard",
    children: [
      { label: "Overview", to: "/dashboard" },
      { label: "Notifications", to: "/notifications" },
    ],
  },
  {
    icon: <Users size={20} />,
    label: "Employees",
    basePath: "/employees",
    children: [
      { label: "All Employees", to: "/employees" },
      { label: "Add Employee", to: "/employees/new" },
      { label: "Org Structure", to: "/employees/structure" },
      { label: "Contracts", to: "/employees/contracts" },
      { label: "Bulk Import", to: "/employees/bulk-import" },
    ],
  },
  {
    icon: <Clock size={20} />,
    label: "Attendance",
    basePath: "/attendance",
    children: [
      { label: "Live Monitor", to: "/attendance/live" },
      { label: "Summary", to: "/attendance/summary" },
      { label: "Manual Entry", to: "/attendance/manual" },
      { label: "Overtime", to: "/attendance/overtime" },
      { label: "Leave", to: "/attendance/leave" },
      { label: "Work Calendar", to: "/attendance/calendar" },
      { label: "Shifts", to: "/attendance/shifts" },
    ],
  },
  {
    icon: <Wallet size={20} />,
    label: "Payroll",
    basePath: "/payroll",
    children: [
      { label: "Process Payroll", to: "/payroll/process" },
      { label: "History", to: "/payroll/history" },
      { label: "Master Salary", to: "/payroll/master-salary" },
      { label: "Master Overtime", to: "/payroll/master-overtime" },
      { label: "Master Deduction", to: "/payroll/master-deduction" },
      { label: "Payslips", to: "/payroll/payslips" },
      { label: "Tax Report", to: "/payroll/tax" },
    ],
  },
  {
    icon: <TrendingUp size={20} />,
    label: "Finance",
    basePath: "/finance",
    children: [
      { label: "Dashboard", to: "/finance" },
      { label: "Income", to: "/finance/income" },
      { label: "Expenses", to: "/finance/expense" },
      { label: "Categories", to: "/finance/categories" },
      { label: "Budgeting", to: "/finance/budget" },
      { label: "Reports", to: "/finance/reports" },
    ],
  },
  {
    icon: <MessageSquare size={20} />,
    label: "WhatsApp Bot",
    basePath: "/bot",
    children: [
      { label: "Status", to: "/bot/status" },
      { label: "Message Logs", to: "/bot/logs" },
      { label: "Broadcast", to: "/bot/broadcast" },
      { label: "Auto-Reply", to: "/bot/auto-reply" },
      { label: "Templates", to: "/bot/templates" },
      { label: "Contact Sync", to: "/bot/contacts" },
    ],
  },
  {
    icon: <BarChart3 size={20} />,
    label: "Reports",
    basePath: "/reports",
    children: [
      { label: "Report Center", to: "/reports" },
      { label: "Attendance", to: "/reports/attendance" },
      { label: "Payroll", to: "/reports/payroll" },
      { label: "Finance", to: "/reports/finance" },
      { label: "Employees", to: "/reports/employees" },
      { label: "Builder", to: "/reports/builder" },
      { label: "Scheduled", to: "/reports/scheduled" },
    ],
  },
  {
    icon: <Settings size={20} />,
    label: "Settings",
    basePath: "/settings",
    children: [
      { label: "Company Profile", to: "/settings/company" },
      { label: "Work Hours", to: "/settings/work-hours" },
      { label: "Locations", to: "/settings/locations" },
      { label: "Users & Roles", to: "/settings/users" },
      { label: "Permissions", to: "/settings/roles" },
      { label: "Notifications", to: "/settings/notifications" },
      { label: "Integrations", to: "/settings/integrations" },
      { label: "Backup", to: "/settings/backup" },
      { label: "Audit Log", to: "/settings/audit-log" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navGroups.forEach((g) => {
      if (
        location.pathname.startsWith(g.basePath) ||
        (g.basePath === "/dashboard" && location.pathname === "/")
      ) {
        initial[g.label] = true;
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isGroupActive = (group: NavGroup) => {
    return (
      location.pathname.startsWith(group.basePath) ||
      (group.basePath === "/dashboard" &&
        (location.pathname === "/" || location.pathname === "/dashboard"))
    );
  };

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.name ?? "User";
  const displayRole = user?.role?.name ?? "No Role";
  const avatarInitials = displayName
    .split(" ")
    .filter((word) => word.length > 0)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-icon">N</div>
        {!collapsed && (
          <div className="logo-text">
            Noor<span>Byte</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div className="nav-section" key={group.label}>
            <div
              className={`nav-group-header ${isGroupActive(group) ? "active" : ""}`}
              onClick={() => toggleGroup(group.label)}
            >
              <span className="nav-icon">{group.icon}</span>
              {!collapsed && (
                <>
                  {group.label}
                  <ChevronRight
                    size={14}
                    className={`chevron ${openGroups[group.label] ? "open" : ""}`}
                  />
                </>
              )}
            </div>

            {!collapsed && openGroups[group.label] && (
              <div className="nav-group-children">
                {group.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                    end={
                      child.to === "/dashboard" ||
                      child.to === "/employees" ||
                      child.to === "/reports"
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{avatarInitials || "U"}</div>
          {!collapsed && (
            <div className="user-details">
              <div className="user-name">{displayName}</div>
              <div className="user-role">{displayRole}</div>
            </div>
          )}
          {!collapsed && (
            <NavLink
              to="/login"
              onClick={handleLogout}
              style={{ marginLeft: "auto", color: "var(--surface-500)" }}
            >
              <LogOut size={18} />
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
}
