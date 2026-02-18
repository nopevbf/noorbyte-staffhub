import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Download, Calendar, Users, BarChart3 } from 'lucide-react';

export default function AttendanceReport() {
  return (
    <PageShell title="Attendance Report" subtitle="Custom attendance query with flexible date ranges" breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Attendance' }]} actions={<button className="btn btn-primary"><Download size={16} /> Export</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-3" style={{ gap: '16px' }}>
          <div className="input-group"><label>Start Date</label><input className="input" type="date" /></div>
          <div className="input-group"><label>End Date</label><input className="input" type="date" /></div>
          <div className="input-group"><label>Group By</label><select className="input"><option>Department</option><option>Individual</option><option>Location</option></select></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '16px' }}><BarChart3 size={16} /> Generate Report</button>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Calendar} title="Date Range" description="Flexible date range selection" />
        <FeatureCard icon={Users} title="Grouping" description="Group by department, individual, location" />
        <FeatureCard icon={Download} title="Export" description="Excel, PDF, CSV export formats" />
      </div>
    </PageShell>
  );
}
