import { useParams } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { Save, Eye, Sliders } from "lucide-react";

export default function MasterOvertimeForm() {
  const { id } = useParams();
  return (
    <PageShell
      title="Edit Aturan Lembur"
      subtitle={`Mengedit aturan lembur #${id}`}
      breadcrumbs={[
        { label: "Penggajian" },
        { label: "Master Lembur", to: "/payroll/master-overtime" },
        { label: "Ubah" },
      ]}
      actions={
        <button className="btn btn-primary">
          <Save size={16} /> Simpan
        </button>
      }
    >
      <div className="card" style={{ marginBottom: "24px" }}>
        <div className="grid grid-2" style={{ gap: "16px" }}>
          <div className="input-group">
            <label>Nama Aturan</label>
            <input className="input" defaultValue="Lembur Hari Kerja" />
          </div>
          <div className="input-group">
            <label>Jenis Hari</label>
            <select className="input">
              <option>Reguler</option>
              <option>Akhir Pekan</option>
              <option>Libur</option>
            </select>
          </div>
          <div className="input-group">
            <label>Pengali Jam Pertama</label>
            <input
              className="input"
              defaultValue="1.5"
              type="number"
              step="0.1"
            />
          </div>
          <div className="input-group">
            <label>Pengali Jam Berikutnya</label>
            <input
              className="input"
              defaultValue="2.0"
              type="number"
              step="0.1"
            />
          </div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard
          icon={Sliders}
          title="Penyusun Aturan Visual"
          description="Konfigurasi aturan dengan drag-and-drop"
        />
        <FeatureCard
          icon={Eye}
          title="Pratinjau Perhitungan"
          description="Lihat dampak aturan terhadap penggajian"
        />
      </div>
    </PageShell>
  );
}
