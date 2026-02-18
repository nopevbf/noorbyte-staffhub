import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Clock, User, Calculator, GitBranch } from 'lucide-react';

export default function OvertimeDetail() {
  const { id } = useParams();
  return (
    <PageShell
      title="Overtime Detail"
      subtitle={`Overtime request #${id || 'OT001'}`}
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Overtime', to: '/attendance/overtime' }, { label: `#${id}` }]}
      actions={<><button className="btn btn-primary">Approve</button><button className="btn btn-danger">Reject</button></>}
    >
      <div className="feature-list">
        <FeatureCard icon={User} title="Employee Info" description="Full employee details and department" />
        <FeatureCard icon={Calculator} title="Hours Calculation" description="Auto-calculated OT hours and rates" />
        <FeatureCard icon={GitBranch} title="Approval Chain" description="Multi-level approval workflow" />
        <FeatureCard icon={Clock} title="Timeline" description="Request submission and status history" />
      </div>
    </PageShell>
  );
}
