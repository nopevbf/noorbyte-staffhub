import PageShell from "../../components/common/PageShell";
import {
  CalendarDays,
  Download,
  FileSpreadsheet,
  FileText,
  Search,
} from "lucide-react";

export default function AttendanceSummary() {
  const summaryCards = [
    {
      label: "Total Hari Kerja",
      value: "20 Hari",
      note: "/ Bulan",
      tone: "neutral",
    },
    {
      label: "Rata-rata Kehadiran",
      value: "96.5%",
      note: "+1.2%",
      tone: "success",
    },
    {
      label: "Total Keterlambatan",
      value: "12",
      note: "Karyawan",
      tone: "warning",
    },
    {
      label: "Total Izin/Sakit",
      value: "45 Hari",
      note: "Kumulatif",
      tone: "info",
    },
  ] as const;

  const attendanceRows = [
    {
      employeeName: "Budi Santoso",
      role: "Marketing • Manager",
      totalPresent: 20,
      late: 0,
      overtimeHours: 5.5,
      leaveSick: "0",
      attendanceRate: 100,
      attendanceTone: "success",
    },
    {
      employeeName: "Siti Aminah",
      role: "Production • Supervisor",
      totalPresent: 19,
      late: 1,
      overtimeHours: 12,
      leaveSick: "0",
      attendanceRate: 95,
      attendanceTone: "info",
    },
    {
      employeeName: "Agus Pratama",
      role: "Sales • Associate",
      totalPresent: 18,
      late: 3,
      overtimeHours: 2,
      leaveSick: "0",
      attendanceRate: 90,
      attendanceTone: "warning",
    },
    {
      employeeName: "Dewi Wulandari",
      role: "Finance • Accountant",
      totalPresent: 15,
      late: 0,
      overtimeHours: 0,
      leaveSick: "5 (Sick)",
      attendanceRate: 75,
      attendanceTone: "neutral",
    },
    {
      employeeName: "Rina Sari",
      role: "HR • Recruiter",
      totalPresent: 20,
      late: 1,
      overtimeHours: 8,
      leaveSick: "0",
      attendanceRate: 98,
      attendanceTone: "success",
    },
    {
      employeeName: "Eko Prasetyo",
      role: "Production • Operator",
      totalPresent: 17,
      late: 4,
      overtimeHours: 15.5,
      leaveSick: "1 (Leave)",
      attendanceRate: 85,
      attendanceTone: "warning",
    },
  ] as const;

  return (
    <PageShell
      title="Rekap Absensi Bulanan"
      subtitle="Ringkasan kehadiran bulanan seluruh karyawan."
      breadcrumbs={[{ label: "Attendance" }, { label: "Rekap" }]}
      actions={
        <div className="attendance-recap__export-actions">
          <button className="btn btn-secondary btn-sm">
            <FileText size={15} /> Export PDF
          </button>
          <button className="btn btn-primary btn-sm">
            <FileSpreadsheet size={15} /> Export Excel
          </button>
        </div>
      }
    >
      <section className="attendance-recap">
        <div className="grid grid-4 attendance-recap__stats">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="stat-card attendance-recap__stat-card"
            >
              <div className="stat-content">
                <h3>{card.label}</h3>
                <div
                  className={`stat-value attendance-recap__stat-value attendance-recap__stat-value--${card.tone}`}
                >
                  {card.value}
                </div>
                <p
                  className={`attendance-recap__stat-note attendance-recap__stat-note--${card.tone}`}
                >
                  {card.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="card attendance-recap__table-card">
          <div className="attendance-recap__filters">
            <div className="attendance-recap__filter-grid">
              <label
                className="attendance-recap__input-wrap"
                aria-label="Filter month"
              >
                <CalendarDays
                  size={16}
                  className="attendance-recap__input-icon"
                />
                <input className="input" type="month" defaultValue="2026-02" />
              </label>

              <select
                className="input"
                defaultValue="all"
                aria-label="Filter department"
              >
                <option value="all">Semua Departemen</option>
                <option value="admin">Admin</option>
                <option value="production">Production</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
              </select>

              <label
                className="attendance-recap__input-wrap"
                aria-label="Search employee"
              >
                <Search size={16} className="attendance-recap__input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Cari karyawan..."
                />
              </label>
            </div>

            <button className="btn btn-secondary btn-sm">
              <Download size={15} /> Export Report
            </button>
          </div>

          <div className="table-wrapper attendance-recap__table-wrap">
            <table className="attendance-recap__table">
              <thead>
                <tr>
                  <th>Nama Karyawan</th>
                  <th className="attendance-recap__align-center">
                    Total Hadir
                  </th>
                  <th className="attendance-recap__align-center">Terlambat</th>
                  <th className="attendance-recap__align-center">
                    Lembur (Jam)
                  </th>
                  <th className="attendance-recap__align-center">
                    Izin / Sakit
                  </th>
                  <th className="attendance-recap__align-right">Kehadiran %</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRows.map((row) => (
                  <tr key={row.employeeName}>
                    <td>
                      <div className="attendance-recap__employee-cell">
                        <div className="attendance-recap__avatar">
                          {row.employeeName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="attendance-recap__employee-name">
                            {row.employeeName}
                          </p>
                          <p className="attendance-recap__employee-meta">
                            {row.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="attendance-recap__align-center">
                      {row.totalPresent}
                    </td>
                    <td className="attendance-recap__align-center">
                      {row.late}
                    </td>
                    <td className="attendance-recap__align-center">
                      {row.overtimeHours.toFixed(1)}
                    </td>
                    <td className="attendance-recap__align-center">
                      {row.leaveSick}
                    </td>
                    <td className="attendance-recap__align-right">
                      <div className="attendance-recap__rate-wrap">
                        <span
                          className={`attendance-recap__rate-text attendance-recap__rate-text--${row.attendanceTone}`}
                        >
                          {row.attendanceRate}%
                        </span>
                        <div className="attendance-recap__progress-track">
                          <div
                            className={`attendance-recap__progress-bar attendance-recap__progress-bar--${row.attendanceTone}`}
                            style={{ width: `${row.attendanceRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="attendance-recap__pagination">
            <p>
              Menampilkan <strong>1-6</strong> dari <strong>45</strong> data
            </p>
            <div className="attendance-recap__pagination-actions">
              <button className="btn btn-ghost btn-sm">Sebelumnya</button>
              <button className="btn btn-primary btn-sm">1</button>
              <button className="btn btn-secondary btn-sm">2</button>
              <button className="btn btn-secondary btn-sm">3</button>
              <button className="btn btn-ghost btn-sm">Berikutnya</button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
