import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { FileText, AlertTriangle, RefreshCw, Download } from 'lucide-react';

export default function Contracts() {
  return (
    <PageShell
      title="Contracts Management"
      subtitle="Track employee contracts, renewals, and expirations"
      breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: 'Contracts' }]}
    >
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><FileText size={22} /></div><div className="stat-content"><h3>Active</h3><div className="stat-value">198</div></div></div>
        <div className="stat-card"><div className="stat-icon warning"><AlertTriangle size={22} /></div><div className="stat-content"><h3>Expiring Soon</h3><div className="stat-value">12</div></div></div>
        <div className="stat-card"><div className="stat-icon danger"><FileText size={22} /></div><div className="stat-content"><h3>Expired</h3><div className="stat-value">5</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={AlertTriangle} title="Expiry Alerts" description="Get notified before contracts expire" />
        <FeatureCard icon={RefreshCw} title="Renewal Workflow" description="Streamlined renewal and approval process" />
        <FeatureCard icon={Download} title="Document Storage" description="Store and access contract documents" />
        <FeatureCard icon={FileText} title="Templates" description="Pre-made contract templates" />
      </div>
    </PageShell>
  );
}
