import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { FileText, Download, Upload, Calculator } from "lucide-react";

export default function TaxReport() {
  return (
    <PageShell
      title="Laporan Pajak (PPh21)"
      subtitle="Buat formulir 1721-A1 dan persiapan e-Filing"
      breadcrumbs={[{ label: "Penggajian" }, { label: "Laporan Pajak" }]}
      actions={
        <button className="btn btn-primary">
          <Download size={16} /> Buat Laporan
        </button>
      }
    >
      <div className="grid grid-3" style={{ marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-icon primary">
            <Calculator size={22} />
          </div>
          <div className="stat-content">
            <h3>Total Pajak</h3>
            <div className="stat-value" style={{ fontSize: "1.2rem" }}>
              Rp 156M
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <FileText size={22} />
          </div>
          <div className="stat-content">
            <h3>Formulir Dibuat</h3>
            <div className="stat-value">248</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info">
            <Upload size={22} />
          </div>
          <div className="stat-content">
            <h3>Status e-Filing</h3>
            <div className="stat-value" style={{ fontSize: "1.2rem" }}>
              Siap
            </div>
          </div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard
          icon={FileText}
          title="Formulir 1721-A1"
          description="Buat formulir pajak tahunan otomatis"
        />
        <FeatureCard
          icon={Upload}
          title="Persiapan e-Filing"
          description="Ekspor data untuk unggah ke DJP Online"
        />
        <FeatureCard
          icon={Download}
          title="Unduh"
          description="Unduh formulir dalam PDF/Excel"
        />
      </div>
    </PageShell>
  );
}
