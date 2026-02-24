import PageShell from "../../components/common/PageShell";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Fingerprint,
  Info,
  RefreshCw,
} from "lucide-react";

const processSteps = [
  "Sinkronisasi Data",
  "Validasi",
  "Perhitungan",
  "Persetujuan",
  "Pencairan",
];

const anomalyItems = [
  "3 Data clock-out belum lengkap",
  "2 Ketidaksesuaian shift",
];

export default function PayrollProcessContinue() {
  const completion = 75;

  return (
    <PageShell
      title="Payroll Februari 2026"
      subtitle="Konfigurasi dan lanjutkan proses payroll untuk periode aktif."
      breadcrumbs={[
        { label: "Penggajian", to: "/payroll/process" },
        { label: "Lanjutkan Proses" },
      ]}
      actions={
        <span
          className="badge badge-success"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <RefreshCw size={14} /> Sinkronisasi Aktif
        </span>
      }
    >
      <div className="card" style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          {processSteps.map((step, index) => {
            const isCurrent = index === 0;
            return (
              <div
                key={step}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "999px",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    background: isCurrent
                      ? "var(--primary-600)"
                      : "var(--surface-700)",
                    color: isCurrent ? "white" : "var(--surface-300)",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    color: isCurrent
                      ? "var(--primary-400)"
                      : "var(--surface-400)",
                    fontWeight: isCurrent ? 600 : 500,
                  }}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="grid grid-3"
        style={{ gap: "24px", marginBottom: "24px" }}
      >
        <div className="card" style={{ gridColumn: "span 2" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.05rem",
                  color: "var(--surface-100)",
                  marginBottom: "4px",
                }}
              >
                Sinkronisasi Data Kehadiran
              </h3>
              <p style={{ color: "var(--surface-400)", fontSize: "0.85rem" }}>
                Mengambil log terbaru dari mesin biometrik dan modul izin.
              </p>
            </div>
            <span
              className="badge badge-success"
              style={{ alignSelf: "flex-start" }}
            >
              Live Sync
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "999px",
                display: "grid",
                placeItems: "center",
                background: `conic-gradient(var(--primary-500) ${completion * 3.6}deg, var(--surface-700) 0deg)`,
              }}
            >
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "999px",
                  background: "var(--surface-900)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "var(--surface-100)",
                    }}
                  >
                    {completion}%
                  </div>
                  <div
                    style={{ fontSize: "0.75rem", color: "var(--surface-400)" }}
                  >
                    Selesai
                  </div>
                </div>
              </div>
            </div>

            <div
              className="grid grid-3"
              style={{ gap: "10px", flex: 1, minWidth: "260px" }}
            >
              <div className="stat-card" style={{ margin: 0 }}>
                <div className="stat-icon primary">
                  <Fingerprint size={18} />
                </div>
                <div className="stat-content">
                  <h3>Log Kehadiran</h3>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    3.450
                  </div>
                </div>
              </div>
              <div className="stat-card" style={{ margin: 0 }}>
                <div className="stat-icon warning">
                  <Clock3 size={18} />
                </div>
                <div className="stat-content">
                  <h3>Jam Lembur</h3>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    120
                  </div>
                </div>
              </div>
              <div className="stat-card" style={{ margin: 0 }}>
                <div className="stat-icon success">
                  <CheckCircle2 size={18} />
                </div>
                <div className="stat-content">
                  <h3>Hari Izin</h3>
                  <div className="stat-value" style={{ fontSize: "1rem" }}>
                    15
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            className="card"
            style={{ borderColor: "var(--danger-border, var(--glass-border))" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="stat-icon danger">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h3
                  style={{ fontSize: "0.95rem", color: "var(--surface-100)" }}
                >
                  5 Anomali Ditemukan
                </h3>
                <p
                  style={{
                    color: "var(--surface-400)",
                    fontSize: "0.82rem",
                    marginTop: "4px",
                  }}
                >
                  Beberapa data perlu ditinjau sebelum lanjut validasi.
                </p>
                <ul
                  style={{
                    marginTop: "10px",
                    paddingLeft: "18px",
                    color: "var(--surface-300)",
                    fontSize: "0.82rem",
                  }}
                >
                  {anomalyItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "12px" }}
                >
                  Lihat & Perbaiki
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3
              style={{
                fontSize: "0.95rem",
                color: "var(--surface-100)",
                marginBottom: "10px",
              }}
            >
              Info Sinkronisasi
            </h3>
            <div style={{ display: "grid", gap: "8px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--surface-400)" }}>
                  Sinkronisasi sukses terakhir
                </span>
                <span>Hari ini, 09:45</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--surface-400)" }}>Sumber</span>
                <span>Biometrik Server 1</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--surface-400)" }}>
                  Total karyawan
                </span>
                <span>142</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginTop: "14px",
                color: "var(--surface-400)",
                fontSize: "0.8rem",
              }}
            >
              <Info size={15} /> Data tersinkron otomatis setiap 30 menit.
            </div>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <button className="btn btn-ghost">Batalkan Proses</button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "var(--surface-500)", fontSize: "0.8rem" }}>
            Terakhir disimpan: Baru saja
          </span>
          <button className="btn btn-primary">
            Berikutnya: Validasi <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </PageShell>
  );
}
