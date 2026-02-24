import { useParams } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import { Save } from "lucide-react";

export default function MasterDeductionForm() {
  const { id } = useParams();
  return (
    <PageShell
      title="Edit Aturan Potongan"
      subtitle={`Mengedit aturan potongan #${id}`}
      breadcrumbs={[
        { label: "Penggajian" },
        { label: "Master Potongan", to: "/payroll/master-deduction" },
        { label: "Ubah" },
      ]}
      actions={
        <button className="btn btn-primary">
          <Save size={16} /> Simpan
        </button>
      }
    >
      <div className="card">
        <div className="grid grid-2" style={{ gap: "16px" }}>
          <div className="input-group">
            <label>Nama Potongan</label>
            <input className="input" defaultValue="BPJS Kesehatan" />
          </div>
          <div className="input-group">
            <label>Jenis</label>
            <select className="input">
              <option>Wajib</option>
              <option>Pajak</option>
              <option>Kustom</option>
            </select>
          </div>
          <div className="input-group">
            <label>Metode Perhitungan</label>
            <select className="input">
              <option>Persentase</option>
              <option>Nominal Tetap</option>
              <option>Formula</option>
            </select>
          </div>
          <div className="input-group">
            <label>Tarif / Nominal</label>
            <input className="input" defaultValue="1" />
          </div>
          <div className="input-group" style={{ gridColumn: "span 2" }}>
            <label>Kondisi (opsional)</label>
            <input className="input" placeholder="mis. gaji > 5000000" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
