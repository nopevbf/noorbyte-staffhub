import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { MapPin, List, RefreshCw, Filter, Radio } from 'lucide-react';

export default function LiveMonitor() {
  return (
    <PageShell
      title="Live Attendance Monitor"
      subtitle="Track real-time employee attendance with location data"
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Live Monitor' }]}
      actions={<button className="btn btn-primary"><RefreshCw size={16} /> Refresh</button>}
    >
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><Radio size={22} /></div><div className="stat-content"><h3>Checked In</h3><div className="stat-value">231</div></div></div>
        <div className="stat-card"><div className="stat-icon warning"><Radio size={22} /></div><div className="stat-content"><h3>Late</h3><div className="stat-value">8</div></div></div>
        <div className="stat-card"><div className="stat-icon danger"><Radio size={22} /></div><div className="stat-content"><h3>Absent</h3><div className="stat-value">9</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><Radio size={22} /></div><div className="stat-content"><h3>On Leave</h3><div className="stat-value">5</div></div></div>
      </div>
      <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ textAlign: 'center', color: 'var(--surface-500)' }}>
          <MapPin size={48} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <p>Interactive map view — GPS tracking overlay</p>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={MapPin} title="Map View" description="See employee locations on interactive map" />
        <FeatureCard icon={List} title="List View" description="Tabular view of all attendance records" />
        <FeatureCard icon={RefreshCw} title="Auto-Refresh" description="Updates every 30 seconds automatically" />
        <FeatureCard icon={Filter} title="Filters" description="Filter by department, status, location" />
      </div>
    </PageShell>
  );
}
