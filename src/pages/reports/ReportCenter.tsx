import PageShell from "../../components/common/PageShell";
import { Link } from "react-router-dom";
import {
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  Sliders,
  Calendar,
} from "lucide-react";

export default function ReportCenter() {
  const reports = [
    {
      n: "Attendance Report",
      d: "Custom attendance analysis",
      i: Clock,
      to: "/reports/attendance",
    },
    {
      n: "Payroll Report",
      d: "Compensation analysis",
      i: DollarSign,
      to: "/reports/payroll",
    },
    {
      n: "Finance Report",
      d: "Custom financial query",
      i: TrendingUp,
      to: "/reports/finance",
    },
    {
      n: "Employee Report",
      d: "HR analytics",
      i: Users,
      to: "/reports/employees",
    },
    {
      n: "Custom Builder",
      d: "Drag-drop report creator",
      i: Sliders,
      to: "/reports/builder",
    },
    {
      n: "Scheduled Reports",
      d: "Automated delivery",
      i: Calendar,
      to: "/reports/scheduled",
    },
  ];
  return (
    <PageShell
      title="Report Center"
      subtitle="All reports hub — browse, create, and schedule reports"
      breadcrumbs={[{ label: "Reports" }]}
    >
      <div className="grid grid-3">
        {reports.map((r) => (
          <Link
            key={r.n}
            to={r.to}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="stat-icon primary">
              <r.i size={22} />
            </div>
            <div>
              <h4
                style={{
                  fontWeight: 600,
                  color: "var(--surface-200)",
                  marginBottom: "2px",
                }}
              >
                {r.n}
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--surface-400)" }}>
                {r.d}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
