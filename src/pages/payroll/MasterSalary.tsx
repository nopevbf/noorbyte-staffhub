import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { DollarSign, Plus, Settings, Users } from "lucide-react";

export default function MasterSalary() {
  return (
    <PageShell
      title="Master Gaji"
      subtitle="Kelola template komponen gaji dan aturan penugasan"
      breadcrumbs={[{ label: "Penggajian" }, { label: "Master Gaji" }]}
      actions={
        <button className="btn btn-primary">
          <Plus size={16} /> Tambah Komponen
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
                <th>Komponen</th>
                <th>Jenis</th>
                <th>Nominal Default</th>
                <th>Kena Pajak</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  n: "Gaji Pokok",
                  t: "Penghasilan",
                  a: "Rp 8,000,000",
                  tax: "Ya",
                  s: "Aktif",
                },
                {
                  n: "Tunjangan Transport",
                  t: "Tunjangan",
                  a: "Rp 1,500,000",
                  tax: "Tidak",
                  s: "Aktif",
                },
                {
                  n: "Tunjangan Makan",
                  t: "Tunjangan",
                  a: "Rp 1,000,000",
                  tax: "Tidak",
                  s: "Aktif",
                },
                {
                  n: "Tunjangan Jabatan",
                  t: "Tunjangan",
                  a: "Rp 2,000,000",
                  tax: "Ya",
                  s: "Aktif",
                },
              ].map((r) => (
                <tr key={r.n}>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {r.n}
                  </td>
                  <td>
                    <span className="badge badge-primary">{r.t}</span>
                  </td>
                  <td>{r.a}</td>
                  <td>{r.tax}</td>
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
          icon={DollarSign}
          title="Template Komponen"
          description="Definisikan komponen gaji yang bisa dipakai ulang"
        />
        <FeatureCard
          icon={Settings}
          title="Aturan Penugasan"
          description="Tetapkan komponen otomatis berdasarkan role/level"
        />
        <FeatureCard
          icon={Users}
          title="Penugasan Grup"
          description="Terapkan template ke grup karyawan"
        />
      </div>
    </PageShell>
  );
}
