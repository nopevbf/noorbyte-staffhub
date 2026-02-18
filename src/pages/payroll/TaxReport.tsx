import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { FileText, Download, Upload, Calculator } from 'lucide-react';

export default function TaxReport() {
  return (
    <PageShell title="Tax Report (PPh21)" subtitle="Generate 1721-A1 forms and e-Filing preparation" breadcrumbs={[{ label: 'Payroll' }, { label: 'Tax Report' }]} actions={<button className="btn btn-primary"><Download size={16} /> Generate Report</button>}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon primary"><Calculator size={22} /></div><div className="stat-content"><h3>Total Tax</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Rp 156M</div></div></div>
        <div className="stat-card"><div className="stat-icon success"><FileText size={22} /></div><div className="stat-content"><h3>Forms Generated</h3><div className="stat-value">248</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><Upload size={22} /></div><div className="stat-content"><h3>e-Filing Status</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Ready</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={FileText} title="1721-A1 Form" description="Auto-generate annual tax forms" />
        <FeatureCard icon={Upload} title="e-Filing Prep" description="Export data for DJP Online upload" />
        <FeatureCard icon={Download} title="Download" description="Download forms in PDF/Excel" />
      </div>
    </PageShell>
  );
}
