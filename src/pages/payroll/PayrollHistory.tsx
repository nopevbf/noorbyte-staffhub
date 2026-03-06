import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { History, Download, BarChart3, Eye } from "lucide-react";

export default function PayrollHistory() {
  return (
    <PageShell
      title="Riwayat Penggajian"
      subtitle="Arsip dan catatan payroll sebelumnya"
      breadcrumbs={[{ label: "Penggajian" }, { label: "Riwayat" }]}
    >
      <div
        className="card"
        style={{ padding: 0, overflow: "hidden", marginBottom: "24px" }}
      >
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Periode</th>
                <th>Karyawan</th>
                <th>Total Kotor</th>
                <th>Total Bersih</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  period: "Jan 2026",
                  emp: 248,
                  gross: "Rp 1.2B",
                  net: "Rp 980M",
                  status: "Selesai",
                },
                {
                  period: "Des 2025",
                  emp: 245,
                  gross: "Rp 1.15B",
                  net: "Rp 950M",
                  status: "Selesai",
                },
                {
                  period: "Nov 2025",
                  emp: 242,
                  gross: "Rp 1.1B",
                  net: "Rp 920M",
                  status: "Selesai",
                },
              ].map((r) => (
                <tr key={r.period}>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {r.period}
                  </td>
                  <td>{r.emp}</td>
                  <td>{r.gross}</td>
                  <td>{r.net}</td>
                  <td>
                    <span className="badge badge-success">{r.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard
          icon={History}
          title="Arsip"
          description="Arsip lengkap riwayat payroll"
        />
        <FeatureCard
          icon={BarChart3}
          title="Perbandingan"
          description="Bandingkan periode secara berdampingan"
        />
        <FeatureCard
          icon={Download}
          title="Unduh Ulang"
          description="Unduh kembali laporan payroll"
        />
        <FeatureCard
          icon={Eye}
          title="Tampilan Detail"
          description="Masuk ke detail untuk setiap periode"
        />
      </div>
    </PageShell>
  );
}
