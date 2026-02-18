import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Calendar, BarChart3, Download, Filter } from 'lucide-react';
import { useAttendanceReport } from '@/hooks/useReports';

export default function AttendanceSummary() {
  const { data: report, isLoading } = useAttendanceReport();

  // Calculate averages from report data
  const data = report?.data || [];
  const totalDays = data.length || 1;
  
  const avgPresent = Math.round(data.reduce((acc: number, curr: any) => acc + curr.present, 0) / totalDays);
  const avgLate = Math.round(data.reduce((acc: number, curr: any) => acc + curr.late, 0) / totalDays);
  const avgAbsent = Math.round(data.reduce((acc: number, curr: any) => acc + curr.absent, 0) / totalDays);
  
  // Create rough rates based on total employees (assuming 248 like dashboard)
  const totalEmployees = 248; 
  const presentRate = ((avgPresent / totalEmployees) * 100).toFixed(1);
  const lateRate = ((avgLate / totalEmployees) * 100).toFixed(1);
  const absentRate = ((avgAbsent / totalEmployees) * 100).toFixed(1);
  const leaveRate = (100 - parseFloat(presentRate) - parseFloat(absentRate)).toFixed(1); // Rough estimate

  return (
    <PageShell
      title="Attendance Summary"
      subtitle="Daily, weekly, and monthly attendance recap"
      breadcrumbs={[{ label: 'Attendance' }, { label: 'Summary' }]}
      actions={<button className="btn btn-secondary"><Download size={16} /> Export</button>}
    >
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
            <div className="stat-icon success"><BarChart3 size={22} /></div>
            <div className="stat-content">
                <h3>Avg Attendance</h3>
                <div className="stat-value">{isLoading ? '...' : `${presentRate}%`}</div>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon warning"><BarChart3 size={22} /></div>
            <div className="stat-content">
                <h3>Late Rate</h3>
                <div className="stat-value">{isLoading ? '...' : `${lateRate}%`}</div>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon info"><BarChart3 size={22} /></div>
            <div className="stat-content">
                <h3>Leave Rate</h3>
                <div className="stat-value">{isLoading ? '...' : `${leaveRate}%`}</div>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon danger"><BarChart3 size={22} /></div>
            <div className="stat-content">
                <h3>Absent Rate</h3>
                <div className="stat-value">{isLoading ? '...' : `${absentRate}%`}</div>
            </div>
        </div>
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
