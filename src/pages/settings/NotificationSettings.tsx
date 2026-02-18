import PageShell from '../../components/common/PageShell';
import { Save } from 'lucide-react';

export default function NotificationSettings() {
  const channels = [
    { n: 'New Leave Request', email: true, wa: true, push: false },
    { n: 'Overtime Request', email: true, wa: true, push: true },
    { n: 'Contract Expiring', email: true, wa: false, push: true },
    { n: 'Payroll Completed', email: true, wa: true, push: false },
    { n: 'Attendance Alert', email: false, wa: true, push: true },
  ];
  return (
    <PageShell title="Notification Settings" subtitle="Alert preferences, channels, and quiet hours" breadcrumbs={[{ label: 'Settings' }, { label: 'Notifications' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper"><table><thead><tr><th>Notification</th><th style={{ textAlign: 'center' }}>Email</th><th style={{ textAlign: 'center' }}>WhatsApp</th><th style={{ textAlign: 'center' }}>Push</th></tr></thead>
        <tbody>
          {channels.map((c) => (
            <tr key={c.n}><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{c.n}</td>
              {[c.email, c.wa, c.push].map((v, i) => (<td key={i} style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked={v} style={{ accentColor: 'var(--primary-500)', width: 16, height: 16 }} /></td>))}
            </tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="card">
        <h4 style={{ fontWeight: 600, color: 'var(--surface-200)', marginBottom: '12px' }}>Quiet Hours</h4>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Start</label><input className="input" type="time" defaultValue="22:00" /></div>
          <div className="input-group"><label>End</label><input className="input" type="time" defaultValue="07:00" /></div>
        </div>
      </div>
    </PageShell>
  );
}
