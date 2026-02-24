import PageShell from "../../components/common/PageShell";
import {
  ArrowUpRight,
  CalendarDays,
  CircleDot,
  Clock3,
  Download,
  FileText,
  Hourglass,
  Users,
  Wallet,
} from "lucide-react";

const quickActions = [
  {
    title: "Salary Master",
    icon: <Wallet size={20} />,
    tone: "var(--primary-400)",
  },
  { title: "Overtime", icon: <Clock3 size={20} />, tone: "var(--warning)" },
  { title: "Deductions", icon: <Hourglass size={20} />, tone: "var(--info)" },
  {
    title: "Tax Reports",
    icon: <FileText size={20} />,
    tone: "var(--success)",
  },
];

const costTrend = [
  { month: "Sep", value: "$0.9M", height: "60%" },
  { month: "Oct", value: "$1.0M", height: "65%" },
  { month: "Nov", value: "$0.8M", height: "55%" },
  { month: "Dec", value: "$1.2M", height: "80%" },
  { month: "Jan", value: "$1.24M", height: "85%" },
  { month: "Feb", value: "$1.25M", height: "90%", active: true },
];

const payrollHistory = [
  {
    period: "Jan 2026",
    payout: "$1,245,300.00",
    employees: 140,
    paymentDate: "25 Jan 2026",
  },
  {
    period: "Dec 2025",
    payout: "$1,210,500.00",
    employees: 138,
    paymentDate: "24 Dec 2025",
  },
  {
    period: "Nov 2025",
    payout: "$1,198,200.00",
    employees: 135,
    paymentDate: "25 Nov 2025",
  },
];

const processingSteps = [
  "1. Data Sync",
  "2. Validation",
  "3. Calculation",
  "4. Approval",
  "5. Disbursal",
];

export default function PayrollProcess() {
  return (
    <PageShell
      title="Payroll Dashboard"
      subtitle="Overview of current payroll status and historical data"
      breadcrumbs={[{ label: "Payroll" }, { label: "Process" }]}
      actions={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--glass-border)",
              background: "rgba(15, 23, 42, 0.45)",
              color: "var(--surface-300)",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            Feb 2026 Cycle
          </span>
          <button className="btn btn-secondary btn-sm">
            <Download size={15} /> Export
          </button>
        </div>
      }
    >
      <div className="grid grid-4" style={{ marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-icon success">
            <ArrowUpRight size={22} />
          </div>
          <div className="stat-content">
            <h3>Total Payroll (Current)</h3>
            <div className="stat-value">$1,250,000</div>
            <div className="stat-change up">+2.4%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon primary">
            <Users size={22} />
          </div>
          <div className="stat-content">
            <h3>Headcount Paid</h3>
            <div className="stat-value">142 / 145</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <Hourglass size={22} />
          </div>
          <div className="stat-content">
            <h3>Pending Approvals</h3>
            <div className="stat-value">12</div>
            <div
              className="stat-change"
              style={{ color: "var(--surface-400)" }}
            >
              Overtime requests
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <CalendarDays size={22} />
          </div>
          <div className="stat-content">
            <h3>Next Payout Date</h3>
            <div className="stat-value" style={{ fontSize: "1.25rem" }}>
              25 Feb 2026
            </div>
            <div
              className="stat-change"
              style={{ color: "var(--surface-400)" }}
            >
              4 days remaining
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ gap: "24px" }}>
        <div
          style={{
            gridColumn: "span 2",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid var(--glass-border)",
                background: "rgba(15, 23, 42, 0.35)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <CircleDot size={12} style={{ color: "var(--warning)" }} />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--surface-200)",
                  }}
                >
                  Active Cycle: February 2026
                </h3>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--surface-400)" }}>
                Processing Step 3 of 5
              </span>
            </div>

            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--surface-100)",
                      fontWeight: 600,
                    }}
                  >
                    Calculation in progress
                  </p>
                  <p
                    style={{ fontSize: "0.85rem", color: "var(--surface-400)" }}
                  >
                    Analyzing attendance data and tax deductions.
                  </p>
                </div>
                <button className="btn btn-primary btn-sm">
                  Resume Processing
                </button>
              </div>

              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--surface-400)",
                    fontWeight: 600,
                  }}
                >
                  Completion
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--primary-400)",
                    fontWeight: 700,
                  }}
                >
                  60%
                </span>
              </div>
              <div
                style={{
                  height: "10px",
                  borderRadius: "999px",
                  background: "var(--surface-800)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, var(--primary-600), var(--primary-400))",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginTop: "14px",
                  flexWrap: "wrap",
                }}
              >
                {processingSteps.map((step, index) => (
                  <span
                    key={step}
                    style={{
                      fontSize: "0.75rem",
                      color:
                        index === 2
                          ? "var(--primary-400)"
                          : "var(--surface-500)",
                      fontWeight: index <= 2 ? 600 : 500,
                    }}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid var(--glass-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "1rem", color: "var(--surface-100)" }}>
                Payroll History
              </h3>
              <a
                href="/payroll/history"
                style={{ fontSize: "0.85rem", fontWeight: 600 }}
              >
                View All History
              </a>
            </div>

            <div
              className="table-wrapper"
              style={{ border: "none", borderRadius: 0 }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Period</th>
                    <th style={{ textAlign: "right" }}>Total Payout</th>
                    <th style={{ textAlign: "center" }}>Employees</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollHistory.map((row) => (
                    <tr key={row.period}>
                      <td
                        style={{ fontWeight: 600, color: "var(--surface-200)" }}
                      >
                        {row.period}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {row.payout}
                      </td>
                      <td style={{ textAlign: "center" }}>{row.employees}</td>
                      <td>{row.paymentDate}</td>
                      <td>
                        <span className="badge badge-success">Paid</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button className="btn btn-ghost btn-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h3 style={{ marginBottom: "12px", color: "var(--surface-200)" }}>
              Quick Actions
            </h3>
            <div className="grid grid-2" style={{ gap: "12px" }}>
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  className="card card-sm"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                    borderColor: "var(--glass-border)",
                    background: "rgba(15, 23, 42, 0.45)",
                  }}
                >
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "999px",
                      color: action.tone,
                      background: "rgba(148, 163, 184, 0.08)",
                    }}
                  >
                    {action.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--surface-300)",
                      fontWeight: 500,
                    }}
                  >
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ color: "var(--surface-100)", fontSize: "1rem" }}>
                Cost Trend
              </h3>
              <select
                className="input"
                style={{
                  padding: "6px 10px",
                  fontSize: "0.75rem",
                  width: "110px",
                }}
              >
                <option>6 Months</option>
                <option>1 Year</option>
              </select>
            </div>

            <div
              style={{
                height: "220px",
                display: "flex",
                gap: "8px",
                alignItems: "flex-end",
              }}
            >
              {costTrend.map((item) => (
                <div
                  key={item.month}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    title={item.value}
                    style={{
                      width: "100%",
                      height: item.height,
                      borderRadius: "10px 10px 0 0",
                      background: item.active
                        ? "linear-gradient(180deg, var(--primary-500), var(--primary-700))"
                        : "rgba(99, 102, 241, 0.25)",
                      boxShadow: item.active ? "var(--shadow-glow)" : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: item.active
                        ? "var(--primary-400)"
                        : "var(--surface-500)",
                      fontWeight: item.active ? 700 : 500,
                    }}
                  >
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
