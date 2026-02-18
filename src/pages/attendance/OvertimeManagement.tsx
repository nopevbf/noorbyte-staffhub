import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Clock, CheckCircle, XCircle, History } from 'lucide-react';

export default function OvertimeManagement() {
  const requests = [
    { id: 'OT001', name: 'Ahmad Fauzi', dept: 'Engineering', hours: 3, date: '2026-02-15', status: 'Pending' },
    { id: 'OT002', name: 'Rizki Pratama', dept: 'Engineering', hours: 2, date: '2026-02-14', status: 'Approved' },
    { id: 'OT003', name: 'Dewi Lestari', dept: 'Marketing', hours: 4, date: '2026-02-13', status: 'Rejected' },
  ];

  return (
    <PageShell
      title="Overtime Management"
      subtitle="Manage overtime requests and approvals"
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Overtime' }]}
    >
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon warning"><Clock size={22} /></div><div className="stat-content"><h3>Pending</h3><div className="stat-value">5</div></div></div>
        <div className="stat-card"><div className="stat-icon success"><CheckCircle size={22} /></div><div className="stat-content"><h3>Approved</h3><div className="stat-value">23</div></div></div>
        <div className="stat-card"><div className="stat-icon danger"><XCircle size={22} /></div><div className="stat-content"><h3>Rejected</h3><div className="stat-value">3</div></div></div>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>ID</th><th>Employee</th><th>Department</th><th>Hours</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--surface-500)' }}>{r.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.name}</td>
                  <td>{r.dept}</td>
                  <td>{r.hours}h</td>
                  <td>{r.date}</td>
                  <td><span className={`badge ${r.status === 'Approved' ? 'badge-success' : r.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>{r.status}</span></td>
                  <td style={{ display: 'flex', gap: '4px' }}>
                    {r.status === 'Pending' && <>
                      <button className="btn btn-sm btn-primary">Approve</button>
                      <button className="btn btn-sm btn-danger">Reject</button>
                    </>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Clock} title="Pending List" description="Quick approve/reject pending requests" />
        <FeatureCard icon={CheckCircle} title="Approval Buttons" description="One-click approval with notes" />
        <FeatureCard icon={History} title="History" description="Full overtime approval history" />
      </div>
    </PageShell>
  );
}
