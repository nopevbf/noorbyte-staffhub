import PageShell from '../../components/common/PageShell';
import { Search, Filter, Download } from 'lucide-react';

export default function AuditLog() {
  return (
    <PageShell title="Audit Log" subtitle="System activity, user actions, and data changes" breadcrumbs={[{ label: 'Settings' }, { label: 'Audit Log' }]} actions={<button className="btn btn-secondary"><Download size={16} /> Export</button>}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button><button className="btn btn-ghost btn-sm"><Search size={14} /> Search</button></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper"><table><thead><tr><th>Time</th><th>User</th><th>Action</th><th>Resource</th><th>Details</th></tr></thead>
        <tbody>
          {[{ t: '10:32 AM', u: 'Admin User', a: 'UPDATE', r: 'Employee', d: 'Updated salary for E001' },{ t: '10:15 AM', u: 'HR Manager', a: 'CREATE', r: 'Leave', d: 'Approved leave LV045' },{ t: '09:45 AM', u: 'Admin User', a: 'DELETE', r: 'Document', d: 'Removed expired contract DOC-123' },{ t: '09:30 AM', u: 'System', a: 'BACKUP', r: 'Database', d: 'Automated daily backup completed' }].map((r, i) => (
            <tr key={i}><td style={{ whiteSpace: 'nowrap' }}>{r.t}</td><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.u}</td><td><span className={`badge ${r.a === 'CREATE' ? 'badge-success' : r.a === 'UPDATE' ? 'badge-warning' : r.a === 'DELETE' ? 'badge-danger' : 'badge-info'}`}>{r.a}</span></td><td>{r.r}</td><td style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{r.d}</td></tr>
          ))}
        </tbody></table></div>
      </div>
    </PageShell>
  );
}
