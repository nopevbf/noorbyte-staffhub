import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Send, Users, Calendar, FileText } from 'lucide-react';

export default function Broadcast() {
  return (
    <PageShell title="Broadcast" subtitle="Send mass messages to employee groups" breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Broadcast' }]}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Template</label><select className="input"><option>Select template…</option><option>Payslip Notification</option><option>Company Announcement</option></select></div>
          <div className="input-group"><label>Recipient Group</label><select className="input"><option>All Employees</option><option>Engineering</option><option>HR</option></select></div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Message Preview</label><textarea className="input" rows={4} placeholder="Message content from template…" style={{ resize: 'vertical' }} /></div>
          <div className="input-group"><label>Schedule</label><select className="input"><option>Send Now</option><option>Schedule for Later</option></select></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}><button className="btn btn-primary"><Send size={16} /> Send Broadcast</button></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={FileText} title="Templates" description="Pre-made message templates" />
        <FeatureCard icon={Users} title="Groups" description="Target specific employee groups" />
        <FeatureCard icon={Calendar} title="Scheduling" description="Schedule broadcasts for later" />
      </div>
    </PageShell>
  );
}
