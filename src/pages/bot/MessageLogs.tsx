import PageShell from '../../components/common/PageShell';
import { Search, Filter, Download } from 'lucide-react';

export default function MessageLogs() {
  return (
    <PageShell title="Message Logs" subtitle="All bot conversations and analytics" breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Logs' }]} actions={<button className="btn btn-secondary"><Download size={16} /> Export</button>}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button><button className="btn btn-ghost btn-sm"><Search size={14} /> Search</button></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper"><table><thead><tr><th>Time</th><th>From</th><th>Message</th><th>Type</th><th>Status</th></tr></thead>
        <tbody>
          {[{ t: '10:32 AM', f: '+62 812 xxxx', m: 'Check in request', ty: 'Attendance', s: 'Processed' },{ t: '10:15 AM', f: '+62 821 xxxx', m: 'Leave request', ty: 'Leave', s: 'Pending' },{ t: '09:45 AM', f: '+62 857 xxxx', m: 'Payslip request', ty: 'Payroll', s: 'Sent' }].map((r, i) => (
            <tr key={i}><td>{r.t}</td><td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{r.f}</td><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.m}</td><td><span className="badge badge-primary">{r.ty}</span></td><td><span className={`badge ${r.s === 'Processed' ? 'badge-success' : r.s === 'Sent' ? 'badge-info' : 'badge-warning'}`}>{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </PageShell>
  );
}
