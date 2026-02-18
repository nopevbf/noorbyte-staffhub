import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { FileText, Users, Calendar, CheckCircle } from 'lucide-react';

export default function LeaveDetail() {
  const { id } = useParams();
  return (
    <PageShell
      title="Leave Request Detail"
      subtitle={`Leave request #${id || 'LV001'}`}
      breadcrumbs={[{ label: 'Attendance', to: '/attendance/summary' }, { label: 'Leave', to: '/attendance/leave' }, { label: `#${id}` }]}
      actions={<><button className="btn btn-primary">Approve</button><button className="btn btn-danger">Reject</button></>}
    >
      <div className="feature-list">
        <FeatureCard icon={FileText} title="Supporting Docs" description="Medical certificates, travel documents" />
        <FeatureCard icon={Users} title="Replacement" description="Assigned replacement during leave" />
        <FeatureCard icon={Calendar} title="Date Range" description="Leave start and end dates" />
        <FeatureCard icon={CheckCircle} title="Approval Status" description="Approval chain and status" />
      </div>
    </PageShell>
  );
}
