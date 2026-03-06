import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Clock,
  Wallet,
  ChevronRight,
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

const employeesSubItems: SubNavItem[] = [
  { label: "Daftar Karyawan", to: "/employees" },
  { label: "Tambah Karyawan", to: "/employees/new" },
  { label: "Struktur", to: "/employees/structure" },
  { label: "Kontrak", to: "/employees/contracts" },
  { label: "Impor Massal", to: "/employees/bulk-import" },
];

const payrollSubItems: SubNavItem[] = [
  { label: "Proses", to: "/payroll/process" },
  { label: "Riwayat", to: "/payroll/history" },
  { label: "Master Gaji", to: "/payroll/master-salary" },
  { label: "Master Lembur", to: "/payroll/master-overtime" },
  { label: "Master Potongan", to: "/payroll/master-deduction" },
  { label: "Slip Gaji", to: "/payroll/payslips" },
  { label: "Laporan Pajak", to: "/payroll/tax" },
];

const financeSubItems: SubNavItem[] = [
  { label: "Dasbor", to: "/finance" },
  { label: "Pemasukan", to: "/finance/income" },
  { label: "Pengeluaran", to: "/finance/expense" },
  { label: "Kategori", to: "/finance/categories" },
  { label: "Anggaran", to: "/finance/budget" },
  { label: "Laporan", to: "/finance/reports" },
];

const botSubItems: SubNavItem[] = [
  { label: "Status", to: "/bot/status" },
  { label: "Log Pesan", to: "/bot/logs" },
  { label: "Broadcast", to: "/bot/broadcast" },
  { label: "Auto Reply", to: "/bot/auto-reply" },
  { label: "Template", to: "/bot/templates" },
  { label: "Sinkron Kontak", to: "/bot/contacts" },
];

const reportsSubItems: SubNavItem[] = [
  { label: "Pusat Laporan", to: "/reports" },
  { label: "Absensi", to: "/reports/attendance" },
  { label: "Payroll", to: "/reports/payroll" },
  { label: "Keuangan", to: "/reports/finance" },
  { label: "Karyawan", to: "/reports/employees" },
  { label: "Builder", to: "/reports/builder" },
  { label: "Terjadwal", to: "/reports/scheduled" },
];

const settingsSubItems: SubNavItem[] = [
  { label: "Profil Perusahaan", to: "/settings/company" },
  { label: "Jam Kerja", to: "/settings/work-hours" },
  { label: "Lokasi", to: "/settings/locations" },
  { label: "Pengguna", to: "/settings/users" },
  { label: "Peran", to: "/settings/roles" },
  { label: "Notifikasi", to: "/settings/notifications" },
  { label: "Integrasi", to: "/settings/integrations" },
  { label: "Backup", to: "/settings/backup" },
  { label: "Audit Log", to: "/settings/audit-log" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );

  const subMenuByLabel: Partial<Record<NavItem["label"], SubNavItem[]>> = {
    Employees: employeesSubItems,
    Attendance: attendanceSubItems,
    Payroll: payrollSubItems,
    Finance: financeSubItems,
    "WhatsApp Bot": botSubItems,
    Reports: reportsSubItems,
  };

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
            const subItems = subMenuByLabel[item.label];
            const hasSubMenu = Boolean(subItems);
            const isMenuActive = isItemActive(item);
            const expandedState = expandedMenus[item.label];
            const isMenuExpanded = hasSubMenu
              ? (expandedState ?? isMenuActive)
              : false;

            return (
              <div key={item.label} className="nav-item-group">
                <NavLink
                  to={item.to}
                  onClick={(event) => {
                    if (hasSubMenu) {
                      event.preventDefault();
                      setExpandedMenus((prev) => ({
                        ...prev,
                        [item.label]: !isMenuExpanded,
                      }));
                    }
                  }}
                  className={`nav-item ${isMenuActive || isMenuExpanded ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && hasSubMenu && (
                    <span
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        transition: "transform var(--transition-fast)",
                        transform: isMenuExpanded
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <ChevronRight size={16} />
                    </span>
                  )}
                </NavLink>

                {!collapsed && hasSubMenu && (
                  <div
                    className={`nav-submenu ${isMenuExpanded ? "expanded" : ""}`}
                  >
                    {subItems?.map((subItem) => (
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
          {(() => {
            const hasSubMenu = settingsSubItems.length > 0;
            const isMenuActive = isItemActive(systemNavItem);
            const expandedState = expandedMenus[systemNavItem.label];
            const isMenuExpanded = hasSubMenu
              ? (expandedState ?? isMenuActive)
              : false;

            return (
              <div className="nav-item-group">
                <NavLink
                  to={systemNavItem.to}
                  onClick={(event) => {
                    if (hasSubMenu) {
                      event.preventDefault();
                      setExpandedMenus((prev) => ({
                        ...prev,
                        [systemNavItem.label]: !isMenuExpanded,
                      }));
                    }
                  }}
                  className={`nav-item ${isMenuActive || isMenuExpanded ? "active" : ""}`}
                >
                  <span className="nav-icon">{systemNavItem.icon}</span>
                  {!collapsed && <span>{systemNavItem.label}</span>}
                  {!collapsed && hasSubMenu && (
                    <span
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        transition: "transform var(--transition-fast)",
                        transform: isMenuExpanded
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <ChevronRight size={16} />
                    </span>
                  )}
                </NavLink>

                {!collapsed && hasSubMenu && (
                  <div
                    className={`nav-submenu ${isMenuExpanded ? "expanded" : ""}`}
                  >
                    {settingsSubItems.map((subItem) => (
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
          })()}
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
