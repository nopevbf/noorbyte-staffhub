import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Calendar, BarChart3, Download, Filter } from 'lucide-react';

export default function AttendanceSummary() {
  return (
    <PageShell
      title="Attendance Summary"
      subtitle="Daily, weekly, and monthly attendance recap"
      breadcrumbs={[{ label: 'Attendance' }, { label: 'Summary' }]}
      actions={<button className="btn btn-secondary"><Download size={16} /> Export</button>}
    >
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><BarChart3 size={22} /></div><div className="stat-content"><h3>Avg Attendance</h3><div className="stat-value">94.2%</div></div></div>
        <div className="stat-card"><div className="stat-icon warning"><BarChart3 size={22} /></div><div className="stat-content"><h3>Late Rate</h3><div className="stat-value">3.8%</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><BarChart3 size={22} /></div><div className="stat-content"><h3>Leave Rate</h3><div className="stat-value">2.0%</div></div></div>
        <div className="stat-card"><div className="stat-icon danger"><BarChart3 size={22} /></div><div className="stat-content"><h3>Absent Rate</h3><div className="stat-value">1.5%</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Calendar} title="Calendar View" description="Month-view calendar with color-coded dates" />
        <FeatureCard icon={BarChart3} title="Statistics" description="Charts and trend analysis" />
        <FeatureCard icon={Download} title="Export" description="Download reports in Excel/PDF" />
        <FeatureCard icon={Filter} title="Filter" description="Filter by date range, department" />
      </div>
    </PageShell>
  );
}
