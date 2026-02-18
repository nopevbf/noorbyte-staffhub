import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Clock, Plus, RefreshCw, Users } from 'lucide-react';

export default function ShiftManagement() {
  return (
    <PageShell
      title="Shift Management"
      subtitle="Create, assign, and manage shift schedules"
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Shifts' }]}
      actions={<button className="btn btn-primary"><Plus size={16} /> New Shift</button>}
    >
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        {[
          { name: 'Morning Shift', time: '06:00 - 14:00', count: 85, color: 'var(--warning)' },
          { name: 'Day Shift', time: '08:00 - 17:00', count: 120, color: 'var(--success)' },
          { name: 'Night Shift', time: '22:00 - 06:00', count: 43, color: 'var(--primary-400)' },
        ].map((s) => (
          <div key={s.name} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, marginTop: '4px' }} />
              <span className="badge badge-primary">{s.count} staff</span>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--surface-200)', marginBottom: '4px' }}>{s.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{s.time}</p>
          </div>
        ))}
      </div>
      <div className="feature-list">
        <FeatureCard icon={Plus} title="Create Templates" description="Define reusable shift templates" />
        <FeatureCard icon={Users} title="Assign Shifts" description="Assign shifts to employees or groups" />
        <FeatureCard icon={RefreshCw} title="Swap Requests" description="Handle shift swap requests" />
        <FeatureCard icon={Clock} title="Scheduling" description="Auto-generate weekly shift schedules" />
      </div>
    </PageShell>
  );
}
