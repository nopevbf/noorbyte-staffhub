import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Clock, MapPin, Edit, History } from 'lucide-react';

export default function AttendanceDetail() {
  const { date, employeeId } = useParams();
  return (
    <PageShell
      title="Attendance Detail"
      subtitle={`Record for employee #${employeeId || 'E001'} on ${date || 'today'}`}
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Detail' }]}
    >
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><Clock size={22} /></div><div className="stat-content"><h3>Check In</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>08:02 AM</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><Clock size={22} /></div><div className="stat-content"><h3>Check Out</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>17:15 PM</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Clock} title="Timeline" description="Full daily timeline of check-in/out events" />
        <FeatureCard icon={MapPin} title="Location Proof" description="GPS coordinates and map snapshot" />
        <FeatureCard icon={Edit} title="Edit" description="Admin can override attendance records" />
        <FeatureCard icon={History} title="Edit History" description="Audit trail of any modifications" />
      </div>
    </PageShell>
  );
}
