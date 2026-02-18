import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Calendar, Upload, Repeat, Sun } from 'lucide-react';

export default function WorkCalendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <PageShell
      title="Work Calendar"
      subtitle="Manage holidays, shifts, and working schedules"
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Calendar' }]}
    >
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--surface-200)' }}>February 2026</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-ghost btn-sm">‹ Prev</button>
            <button className="btn btn-ghost btn-sm">Today</button>
            <button className="btn btn-ghost btn-sm">Next ›</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {days.map((d) => (
            <div key={d} style={{ textAlign: 'center', padding: '8px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--surface-400)', textTransform: 'uppercase' }}>{d}</div>
          ))}
          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
            <div key={day} style={{
              textAlign: 'center', padding: '10px', borderRadius: 'var(--radius-sm)',
              background: day === 18 ? 'rgba(99, 102, 241, 0.15)' : [7, 14, 21, 28].includes(day) ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
              color: [7, 14, 21, 28].includes(day) ? 'var(--danger)' : day === 18 ? 'var(--primary-400)' : 'var(--surface-300)',
              border: day === 18 ? '1px solid var(--primary-500)' : '1px solid transparent',
              fontSize: '0.85rem', cursor: 'pointer'
            }}>{day}</div>
          ))}
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Repeat} title="Recurring Patterns" description="Set weekly/monthly recurring schedules" />
        <FeatureCard icon={Upload} title="Holiday Import" description="Import national holidays from CSV" />
        <FeatureCard icon={Sun} title="Holiday Setup" description="Define company-specific holidays" />
        <FeatureCard icon={Calendar} title="Shift Templates" description="Assign shift patterns to calendar" />
      </div>
    </PageShell>
  );
}
