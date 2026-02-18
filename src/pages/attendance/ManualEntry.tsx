import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Save, FileText, CheckCircle, ClipboardList } from 'lucide-react';

export default function ManualEntry() {
  return (
    <PageShell
      title="Manual Attendance Entry"
      subtitle="Admin override for attendance records"
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Manual Entry' }]}
    >
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--surface-200)', marginBottom: '20px' }}>Manual Entry Form</h3>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Employee</label><select className="input"><option>Select employee…</option></select></div>
          <div className="input-group"><label>Date</label><input className="input" type="date" /></div>
          <div className="input-group"><label>Check In Time</label><input className="input" type="time" /></div>
          <div className="input-group"><label>Check Out Time</label><input className="input" type="time" /></div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}>
            <label>Justification</label>
            <textarea className="input" rows={3} placeholder="Reason for manual entry…" style={{ resize: 'vertical' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary"><Save size={16} /> Submit</button>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={FileText} title="Justification Required" description="Every manual entry must have a reason" />
        <FeatureCard icon={CheckCircle} title="Approval Workflow" description="Requires supervisor approval" />
        <FeatureCard icon={ClipboardList} title="Audit Trail" description="All manual entries are logged" />
      </div>
    </PageShell>
  );
}
