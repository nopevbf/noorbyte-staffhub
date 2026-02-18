import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Bell, Filter, Archive, CheckCircle } from 'lucide-react';

export default function Notifications() {
  const mockNotifications = [
    { id: 1, type: 'warning', title: 'Overtime Request', desc: 'Ahmad Fauzi requested 3 hours overtime', time: '5 min ago', read: false },
    { id: 2, type: 'info', title: 'Leave Approved', desc: 'Siti Nurbaya leave request has been approved', time: '1 hour ago', read: false },
    { id: 3, type: 'success', title: 'Payroll Completed', desc: 'January 2026 payroll has been processed', time: '2 hours ago', read: true },
    { id: 4, type: 'danger', title: 'Contract Expiring', desc: '3 employee contracts expire this week', time: '3 hours ago', read: false },
    { id: 5, type: 'info', title: 'New Employee Added', desc: 'Budi Santoso has been onboarded', time: '5 hours ago', read: true },
  ];

  return (
    <PageShell
      title="Notifications"
      subtitle="All alerts and messages in one place"
      breadcrumbs={[{ label: 'Notifications' }]}
      actions={
        <>
          <button className="btn btn-ghost btn-sm"><CheckCircle size={14} /> Mark all read</button>
          <button className="btn btn-ghost btn-sm"><Archive size={14} /> Archive</button>
        </>
      }
    >
      <div className="feature-list" style={{ marginTop: '8px' }}>
        <FeatureCard icon={Bell} title="Mark as Read" description="Bulk mark notifications as read" />
        <FeatureCard icon={Filter} title="Filter by Type" description="Filter by warning, info, success, danger" />
        <FeatureCard icon={Archive} title="Archive" description="Archive old notifications" />
      </div>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {mockNotifications.map((n) => (
          <div key={n.id} className="card-sm" style={{
            background: n.read ? 'rgba(15, 23, 42, 0.3)' : 'var(--glass-bg)',
            border: `1px solid ${n.read ? 'var(--glass-border)' : 'rgba(99, 102, 241, 0.15)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-400)', display: 'inline-block' }} />}
                <span className={`badge badge-${n.type}`}>{n.type}</span>
                <strong style={{ color: 'var(--surface-200)', fontSize: '0.9rem' }}>{n.title}</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{n.desc}</p>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--surface-500)', whiteSpace: 'nowrap' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
