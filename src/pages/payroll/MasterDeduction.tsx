import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { Plus, Shield, Calculator, CreditCard } from "lucide-react";

export default function MasterDeduction() {
  return (
    <PageShell
      title="Master Potongan"
      subtitle="Kelola jenis potongan: BPJS, PPh21, pinjaman, dan potongan kustom"
      breadcrumbs={[{ label: "Penggajian" }, { label: "Master Potongan" }]}
      actions={
        <button className="btn btn-primary">
          <Plus size={16} /> Tambah Potongan
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
                <th>Potongan</th>
                <th>Jenis</th>
                <th>Tarif/Nominal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: "BPJS Kesehatan", t: "Wajib", a: "1%", s: "Aktif" },
                { n: "BPJS Ketenagakerjaan", t: "Wajib", a: "2%", s: "Aktif" },
                { n: "PPh 21", t: "Pajak", a: "Progresif", s: "Aktif" },
                {
                  n: "Cicilan Pinjaman",
                  t: "Kustom",
                  a: "Rp 500,000",
                  s: "Aktif",
                },
              ].map((r) => (
                <tr key={r.n}>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {r.n}
                  </td>
                  <td>
                    <span className="badge badge-info">{r.t}</span>
                  </td>
                  <td>{r.a}</td>
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
          icon={Shield}
          title="BPJS"
          description="BPJS Kesehatan & Ketenagakerjaan"
        />
        <FeatureCard
          icon={Calculator}
          title="PPh21"
          description="Perhitungan pajak progresif"
        />
        <FeatureCard
          icon={CreditCard}
          title="Pinjaman"
          description="Potongan pinjaman karyawan"
        />
      </div>
    </PageShell>
  );
}
