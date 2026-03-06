import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { Send, Mail, MessageSquare, CheckCircle } from "lucide-react";

export default function PayslipDistribution() {
  return (
    <PageShell
      title="Distribusi Slip Gaji"
      subtitle="Kirim slip gaji ke karyawan via WhatsApp atau Email"
      breadcrumbs={[{ label: "Penggajian" }, { label: "Slip Gaji" }]}
      actions={
        <button className="btn btn-primary">
          <Send size={16} /> Kirim Semua
        </button>
      }
    >
      <div className="grid grid-3" style={{ marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-icon success">
            <CheckCircle size={22} />
          </div>
          <div className="stat-content">
            <h3>Terkirim</h3>
            <div className="stat-value">198</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <Send size={22} />
          </div>
          <div className="stat-content">
            <h3>Tertunda</h3>
            <div className="stat-value">50</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger">
            <Mail size={22} />
          </div>
          <div className="stat-content">
            <h3>Gagal</h3>
            <div className="stat-value">0</div>
          </div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard
          icon={MessageSquare}
          title="WA Massal"
          description="Kirim slip gaji via WhatsApp"
        />
        <FeatureCard
          icon={Mail}
          title="Email Massal"
          description="Kirim slip gaji via email"
        />
        <FeatureCard
          icon={CheckCircle}
          title="Pelacakan Pengiriman"
          description="Lacak status pengiriman per karyawan"
        />
      </div>
    </PageShell>
  );
}
