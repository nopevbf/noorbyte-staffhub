import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { RefreshCw, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSync() {
  return (
    <PageShell title="Contact Sync" subtitle="Sync WhatsApp contacts with employee database" breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Contact Sync' }]} actions={<button className="btn btn-primary"><RefreshCw size={16} /> Sync Now</button>}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><CheckCircle size={22} /></div><div className="stat-content"><h3>Synced</h3><div className="stat-value">235</div></div></div>
        <div className="stat-card"><div className="stat-icon warning"><AlertCircle size={22} /></div><div className="stat-content"><h3>Unmatched</h3><div className="stat-value">13</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><Users size={22} /></div><div className="stat-content"><h3>Total Contacts</h3><div className="stat-value">248</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={RefreshCw} title="Auto Sync" description="Automatic periodic synchronization" />
        <FeatureCard icon={Users} title="Employee DB" description="Match contacts to employee records" />
        <FeatureCard icon={CheckCircle} title="Validation" description="Verify phone numbers and status" />
      </div>
    </PageShell>
  );
}
