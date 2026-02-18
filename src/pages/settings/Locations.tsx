import PageShell from '../../components/common/PageShell';
import { Plus, MapPin } from 'lucide-react';

export default function Locations() {
  return (
    <PageShell title="Office Locations" subtitle="Manage office locations and geofencing" breadcrumbs={[{ label: 'Settings' }, { label: 'Locations' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Location</button>}>
      <div className="grid grid-2">
        {[{ n: 'Head Office', a: 'Jl. Sudirman No. 123', r: '150m', emp: 180 },{ n: 'Branch Bandung', a: 'Jl. Braga No. 45', r: '100m', emp: 45 },{ n: 'Branch Surabaya', a: 'Jl. Tunjungan No. 78', r: '120m', emp: 23 }].map((l) => (
          <div key={l.n} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div className="stat-icon primary"><MapPin size={20} /></div>
              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--surface-200)', marginBottom: '2px' }}>{l.n}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)', marginBottom: '8px' }}>{l.a}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="badge badge-primary">Radius: {l.r}</span>
                  <span className="badge badge-info">{l.emp} employees</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
