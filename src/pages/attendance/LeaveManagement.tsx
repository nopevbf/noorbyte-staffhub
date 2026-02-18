import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Calendar, BarChart3, CheckCircle, Clock } from 'lucide-react';

export default function LeaveManagement() {
  return (
    <PageShell
      title="Leave Management"
      subtitle="Leave requests, balance tracking, and approval workflow"
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Leave' }]}
    >
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon warning"><Clock size={22} /></div><div className="stat-content"><h3>Pending</h3><div className="stat-value">7</div></div></div>
        <div className="stat-card"><div className="stat-icon success"><CheckCircle size={22} /></div><div className="stat-content"><h3>Approved</h3><div className="stat-value">45</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><Calendar size={22} /></div><div className="stat-content"><h3>On Leave Today</h3><div className="stat-value">3</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><BarChart3 size={22} /></div><div className="stat-content"><h3>Avg Balance</h3><div className="stat-value">8.5d</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Calendar} title="Calendar View" description="Visual calendar with leave markers" />
        <FeatureCard icon={BarChart3} title="Balance Tracking" description="Real-time leave balance per employee" />
        <FeatureCard icon={CheckCircle} title="Approval Workflow" description="Multi-level leave approval process" />
        <FeatureCard icon={Clock} title="Leave Types" description="Annual, sick, personal, maternity, etc." />
      </div>
    </PageShell>
  );
}
