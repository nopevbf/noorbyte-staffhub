import { useParams } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { FileText, Download, DollarSign, Minus } from "lucide-react";

export default function PayrollDetail() {
  const { period, employeeId } = useParams();
  return (
    <PageShell
      title="Detail Slip Gaji"
      subtitle={`${period || "Jan 2026"} — Karyawan #${employeeId || "E001"}`}
      breadcrumbs={[
        { label: "Penggajian", to: "/payroll/history" },
        { label: "Detail" },
      ]}
      actions={
        <button className="btn btn-primary">
          <Download size={16} /> Unduh PDF
        </button>
      }
    >
      <div className="grid grid-3" style={{ marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-icon success">
            <DollarSign size={22} />
          </div>
          <div className="stat-content">
            <h3>Gaji Kotor</h3>
            <div className="stat-value" style={{ fontSize: "1.2rem" }}>
              Rp 12,500,000
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <Minus size={22} />
          </div>
          <div className="stat-content">
            <h3>Potongan</h3>
            <div className="stat-value" style={{ fontSize: "1.2rem" }}>
              Rp 2,150,000
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon primary">
            <DollarSign size={22} />
          </div>
          <div className="stat-content">
            <h3>Gaji Bersih</h3>
            <div className="stat-value" style={{ fontSize: "1.2rem" }}>
              Rp 10,350,000
            </div>
          </div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard
          icon={FileText}
          title="Rincian"
          description="Rincian detail komponen gaji"
        />
        <FeatureCard
          icon={Minus}
          title="Potongan"
          description="BPJS, PPh21, cicilan pinjaman"
        />
        <FeatureCard
          icon={Download}
          title="Unduh PDF"
          description="Buat dan unduh slip gaji"
        />
      </div>
    </PageShell>
  );
}
