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
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}

interface SubNavItem {
  label: string;
  to: string;
}

const mainNavItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <Users size={20} />,
    label: "Employees",
    to: "/employees",
  },
  {
    icon: <Clock size={20} />,
    label: "Attendance",
    to: "/attendance/live",
  },
  {
    icon: <Wallet size={20} />,
    label: "Payroll",
    to: "/payroll/process",
  },
  {
    icon: <TrendingUp size={20} />,
    label: "Finance",
    to: "/finance",
  },
  {
    icon: <MessageSquare size={20} />,
    label: "WhatsApp Bot",
    to: "/bot/status",
  },
  {
    icon: <BarChart3 size={20} />,
    label: "Reports",
    to: "/reports",
  },
];

const systemNavItem: NavItem = {
  icon: <Settings size={20} />,
  label: "Settings",
  to: "/settings/company",
};

const attendanceSubItems: SubNavItem[] = [
  { label: "Rekap", to: "/attendance/summary" },
  { label: "Live Monitor", to: "/attendance/live" },
  { label: "Manual Entry", to: "/attendance/manual" },
  { label: "Lembur", to: "/attendance/overtime" },
  { label: "Izin & Cuti", to: "/attendance/leave" },
  { label: "Kalender", to: "/attendance/calendar" },
  { label: "Shift", to: "/attendance/shifts" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const isItemActive = (item: NavItem) => {
    const basePath = item.to.replace(
      /\/(new|process|status|live|company)$/,
      "",
    );

    return (
      location.pathname.startsWith(basePath) ||
      (basePath === "/dashboard" &&
        (location.pathname === "/" || location.pathname === "/dashboard"))
    );
  };

  const isSubItemActive = (subItem: SubNavItem) => {
    return location.pathname === subItem.to;
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
        <div className="nav-main">
          {mainNavItems.map((item) => {
            const attendanceActive =
              item.label === "Attendance" && isItemActive(item);

            return (
              <div key={item.label} className="nav-item-group">
                <NavLink
                  to={item.to}
                  className={`nav-item ${isItemActive(item) ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>

                {!collapsed && item.label === "Attendance" && (
                  <div
                    className={`nav-submenu ${attendanceActive ? "expanded" : ""}`}
                  >
                    {attendanceSubItems.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        className={`nav-subitem ${isSubItemActive(subItem) ? "active" : ""}`}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="nav-system">
          {!collapsed && <p className="nav-system-label">System</p>}
          <NavLink
            to={systemNavItem.to}
            className={`nav-item ${isItemActive(systemNavItem) ? "active" : ""}`}
          >
            <span className="nav-icon">{systemNavItem.icon}</span>
            {!collapsed && <span>{systemNavItem.label}</span>}
          </NavLink>
        </div>
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
