import PageShell from '../../components/common/PageShell';
import { Save } from 'lucide-react';

export default function WorkHours() {
  return (
    <PageShell title="Work Hours" subtitle="Default schedule, grace period, and break time" breadcrumbs={[{ label: 'Settings' }, { label: 'Work Hours' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Work Start</label><input className="input" type="time" defaultValue="08:00" /></div>
          <div className="input-group"><label>Work End</label><input className="input" type="time" defaultValue="17:00" /></div>
          <div className="input-group"><label>Grace Period (minutes)</label><input className="input" type="number" defaultValue="15" /></div>
          <div className="input-group"><label>Break Duration (minutes)</label><input className="input" type="number" defaultValue="60" /></div>
          <div className="input-group"><label>Break Start</label><input className="input" type="time" defaultValue="12:00" /></div>
          <div className="input-group"><label>Working Days</label><select className="input"><option>Monday - Friday</option><option>Monday - Saturday</option></select></div>
        </div>
      </div>
    </PageShell>
  );
}
