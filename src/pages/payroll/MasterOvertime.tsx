import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { Clock, Plus, Percent, Calendar } from "lucide-react";

export default function MasterOvertime() {
  return (
    <PageShell
      title="Master Lembur"
      subtitle="Aturan tarif lembur, pengali, dan ambang batas"
      breadcrumbs={[{ label: "Penggajian" }, { label: "Master Lembur" }]}
      actions={
        <button className="btn btn-primary">
          <Plus size={16} /> Tambah Aturan
        </button>
      }
    >
      <div
        className="card"
        style={{ padding: 0, overflow: "hidden", marginBottom: "24px" }}
      >
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nama Aturan</th>
                <th>Jenis Hari</th>
                <th>Jam Pertama</th>
                <th>Jam Berikutnya</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  n: "Lembur Hari Kerja",
                  d: "Reguler",
                  f: "1.5x",
                  nh: "2.0x",
                  s: "Aktif",
                },
                {
                  n: "Lembur Akhir Pekan",
                  d: "Akhir Pekan",
                  f: "2.0x",
                  nh: "2.5x",
                  s: "Aktif",
                },
                {
                  n: "Lembur Hari Libur",
                  d: "Libur",
                  f: "3.0x",
                  nh: "4.0x",
                  s: "Aktif",
                },
              ].map((r) => (
                <tr key={r.n}>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {r.n}
                  </td>
                  <td>{r.d}</td>
                  <td>
                    <span className="badge badge-warning">{r.f}</span>
                  </td>
                  <td>
                    <span className="badge badge-danger">{r.nh}</span>
                  </td>
                  <td>
                    <span className="badge badge-success">{r.s}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard
          icon={Percent}
          title="Pengali"
          description="Tentukan pengali tarif per aturan"
        />
        <FeatureCard
          icon={Clock}
          title="Ambang Batas"
          description="Atur batas jam untuk perubahan tarif"
        />
        <FeatureCard
          icon={Calendar}
          title="Aturan Jenis Hari"
          description="Tarif berbeda untuk hari kerja, akhir pekan, dan libur"
        />
      </div>
    </PageShell>
  );
}
