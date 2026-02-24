import { useParams } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import { Save } from "lucide-react";

export default function MasterSalaryForm() {
  const { id } = useParams();
  return (
    <PageShell
      title="Edit Struktur Gaji"
      subtitle={`Mengedit struktur gaji #${id}`}
      breadcrumbs={[
        { label: "Penggajian" },
        { label: "Master Gaji", to: "/payroll/master-salary" },
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
            <label>Nama Komponen</label>
            <input className="input" defaultValue="Gaji Pokok" />
          </div>
          <div className="input-group">
            <label>Jenis</label>
            <select className="input">
              <option>Penghasilan</option>
              <option>Tunjangan</option>
              <option>Potongan</option>
            </select>
          </div>
          <div className="input-group">
            <label>Nominal Default</label>
            <input className="input" defaultValue="8000000" type="number" />
          </div>
          <div className="input-group">
            <label>Kena Pajak</label>
            <select className="input">
              <option>Ya</option>
              <option>Tidak</option>
            </select>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
