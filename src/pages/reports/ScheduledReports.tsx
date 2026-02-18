import PageShell from '../../components/common/PageShell';
import { Plus, Mail, Clock, FileText } from 'lucide-react';

export default function ScheduledReports() {
  return (
    <PageShell title="Scheduled Reports" subtitle="Automated report delivery via email" breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Scheduled' }]} actions={<button className="btn btn-primary"><Plus size={16} /> New Schedule</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper"><table><thead><tr><th>Report</th><th>Frequency</th><th>Recipients</th><th>Format</th><th>Next Run</th><th>Status</th></tr></thead>
        <tbody>
          {[{ r: 'Monthly Attendance', f: 'Monthly', rec: 'hr@company.com', fmt: 'Excel', next: '2026-03-01', s: 'Active' },{ r: 'Weekly Payroll', f: 'Weekly', rec: 'finance@company.com', fmt: 'PDF', next: '2026-02-24', s: 'Active' },{ r: 'Daily Attendance', f: 'Daily', rec: 'manager@company.com', fmt: 'Excel', next: '2026-02-19', s: 'Paused' }].map((r, i) => (
            <tr key={i}><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.r}</td><td>{r.f}</td><td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{r.rec}</td><td><span className="badge badge-primary">{r.fmt}</span></td><td>{r.next}</td><td><span className={`badge ${r.s === 'Active' ? 'badge-success' : 'badge-warning'}`}>{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </PageShell>
  );
}
