import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookText,
  Building2,
  CalendarClock,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Coins,
  HandCoins,
  PlaneTakeoff,
  PlusCircle,
  Search,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function DashboardHome() {
  const navigate = useNavigate();

  const summaryCards = [
    {
      title: "Present Today",
      value: "42",
      suffix: "/ 50",
      trend: "+2%",
      trendType: "up",
      progress: 84,
      meta: "Attendance rate",
    },
    {
      title: "Late Arrivals",
      value: "3",
      suffix: "",
      trend: "+5%",
      trendType: "down",
      progress: 0,
      meta: "Avg delay: 12 mins",
    },
    {
      title: "On Leave",
      value: "5",
      suffix: "",
      trend: "-1%",
      trendType: "up",
      progress: 0,
      meta: "Approved leave requests",
    },
    {
      title: "Pending Overtime",
      value: "2",
      suffix: "",
      trend: "0%",
      trendType: "flat",
      progress: 0,
      meta: "Requests needing approval",
    },
  ] as const;

  const timeline = [
    {
      name: "Michael Foster",
      detail: "Clocked in at Headquarters",
      status: "On Time",
      statusClass: "success",
      time: "08:58",
    },
    {
      name: "Lindsay Walton",
      detail: "Clocked in remotely (Jakarta)",
      status: "Late 15m",
      statusClass: "warning",
      time: "09:15",
    },
    {
      name: "Tom Cook",
      detail: "Requesting Sick Leave",
      status: "Pending",
      statusClass: "info",
      time: "07:45",
    },
  ] as const;

  return (
    <div className="dashboard-v2">
      <section className="dh-header-row">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Ringkasan operasional HR, kehadiran, dan finansial hari ini.</p>
        </div>
        <div className="dh-header-actions">
          <label className="dh-search" htmlFor="dashboard-search">
            <Search size={16} />
            <input
              id="dashboard-search"
              type="text"
              placeholder="Search employees..."
            />
          </label>
          <button
            type="button"
            className="dh-icon-btn"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="dot" />
          </button>
          <button type="button" className="dh-icon-btn" aria-label="Help">
            <CircleHelp size={18} />
          </button>
        </div>
      </section>

      <section className="dh-summary-grid">
        {summaryCards.map((card) => (
          <article className="dh-card dh-summary-card" key={card.title}>
            <div className="dh-summary-head">
              <p>{card.title}</p>
              <span className={`badge ${card.trendType}`}>
                {card.trendType === "up" && <TrendingUp size={14} />}
                {card.trendType === "down" && <TrendingDown size={14} />}
                {card.trend}
              </span>
            </div>
            <div className="dh-summary-value">
              <strong>{card.value}</strong>
              {card.suffix && <span>{card.suffix}</span>}
            </div>
            {card.progress > 0 && (
              <div className="dh-progress">
                <div style={{ width: `${card.progress}%` }} />
              </div>
            )}
            <small>{card.meta}</small>
          </article>
        ))}
      </section>

      <section className="dh-main-grid">
        <article className="dh-card dh-map-card">
          <div className="dh-card-title">
            <div>
              <span className="live-dot" />
              <h3>Live Attendance Board</h3>
            </div>
            <small>Last updated: just now</small>
          </div>
          <div className="dh-map-surface">
            <div className="dh-map-gradient" />
            <span className="dh-pin pin-1">A</span>
            <span className="dh-pin pin-2">L</span>
            <span className="dh-pin pin-3">T</span>
            <div className="dh-map-legend">
              <p>
                <span className="status onsite" /> On Site (24)
              </p>
              <p>
                <span className="status remote" /> Remote (15)
              </p>
              <p>
                <span className="status offline" /> Offline (3)
              </p>
            </div>
          </div>
        </article>

        <article className="dh-card dh-actions-card">
          <h3>Quick Actions</h3>
          <div className="dh-actions-grid">
            <button
              type="button"
              onClick={() => navigate("/attendance/manual")}
            >
              <PlusCircle size={18} />
              <span>Manual Attendance</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/attendance/overtime")}
            >
              <Timer size={18} />
              <span>Input Overtime</span>
            </button>
            <button type="button" onClick={() => navigate("/attendance/leave")}>
              <PlaneTakeoff size={18} />
              <span>Input Leave</span>
            </button>
            <button type="button" onClick={() => navigate("/bot/broadcast")}>
              <CalendarClock size={18} />
              <span>WA Broadcast</span>
            </button>
          </div>
          <button
            type="button"
            className="dh-primary-action"
            onClick={() => navigate("/finance/expense/new")}
          >
            <HandCoins size={16} />
            New Finance Transaction
          </button>
        </article>
      </section>

      <section className="dh-bottom-grid">
        <article className="dh-card dh-timeline-card">
          <div className="dh-card-title">
            <h3>Today&apos;s Timeline</h3>
            <button
              type="button"
              onClick={() => navigate("/attendance/summary")}
            >
              View All
            </button>
          </div>
          <div className="dh-timeline-list">
            {timeline.map((item) => (
              <div
                className="dh-timeline-item"
                key={`${item.name}-${item.time}`}
              >
                <div className="avatar">{item.name.charAt(0)}</div>
                <div className="content">
                  <div>
                    <p>{item.name}</p>
                    <small>{item.detail}</small>
                  </div>
                  <div className="meta">
                    <span className={`pill ${item.statusClass}`}>
                      {item.status}
                    </span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dh-card dh-finance-card">
          <h3>Financial Snapshot</h3>
          <p className="label">Current Company Balance</p>
          <div className="dh-balance-row">
            <strong>Rp 48.250.000</strong>
            <span className="up-icon">
              <TrendingUp size={14} />
            </span>
          </div>

          <div className="dh-meter-group">
            <div>
              <p>
                <span>Payroll Budget</span>
                <strong>75%</strong>
              </p>
              <div className="meter">
                <div style={{ width: "75%" }} />
              </div>
              <small>Rp 12.000.000 / Rp 16.000.000 utilized</small>
            </div>
            <div>
              <p>
                <span>Operational Expenses</span>
                <strong>40%</strong>
              </p>
              <div className="meter success">
                <div style={{ width: "40%" }} />
              </div>
              <small>Rp 3.200.000 / Rp 8.000.000 utilized</small>
            </div>
          </div>
          <button type="button" onClick={() => navigate("/finance/reports")}>
            View Finance Report
          </button>
        </article>
      </section>

      <section className="dh-insight-grid">
        <article className="dh-card">
          <h4>
            <Building2 size={16} /> Workforce
          </h4>
          <p>
            Distribusi kerja hari ini stabil, mayoritas tim onsite dan
            produktivitas meningkat.
          </p>
        </article>
        <article className="dh-card">
          <h4>
            <Clock3 size={16} /> Attendance
          </h4>
          <p>
            Persentase keterlambatan turun dibanding minggu lalu dengan antrian
            approval minimum.
          </p>
        </article>
        <article className="dh-card">
          <h4>
            <Coins size={16} /> Finance
          </h4>
          <p>
            Biaya operasional terkendali dan ruang budget payroll masih aman
            untuk periode ini.
          </p>
        </article>
        <article className="dh-card">
          <h4>
            <BookText size={16} /> Reports
          </h4>
          <p>
            Data harian siap diekspor untuk payroll, attendance review, dan
            audit mingguan.
          </p>
        </article>
      </section>

      <section className="dh-footer-note">
        <CheckCircle2 size={16} />
        Semua metrik tersinkronisasi dari modul Attendance, Payroll, Finance,
        dan Bot.
      </section>
    </div>
  );
}
