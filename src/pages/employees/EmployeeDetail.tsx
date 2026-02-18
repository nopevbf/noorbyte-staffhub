import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { User, Clock, Wallet, FileText, Edit, Calendar } from 'lucide-react';

export default function EmployeeDetail() {
  const { id } = useParams();
  return (
    <PageShell
      title="Employee Detail"
      subtitle={`Viewing employee profile #${id || 'E001'}`}
      breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: `#${id || 'E001'}` }]}
      actions={<button className="btn btn-primary"><Edit size={16} /> Edit</button>}
    >
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon primary"><User size={22} /></div>
          <div className="stat-content"><h3>Department</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Engineering</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><Calendar size={22} /></div>
          <div className="stat-content"><h3>Join Date</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>12 Jan 2024</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><Wallet size={22} /></div>
          <div className="stat-content"><h3>Contract</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Permanent</div></div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={User} title="Profile" description="Personal information, contact details, emergency contacts" />
        <FeatureCard icon={Clock} title="Attendance History" description="Monthly attendance records, late patterns" />
        <FeatureCard icon={Wallet} title="Salary History" description="Compensation changes, payslip archive" />
        <FeatureCard icon={FileText} title="Documents" description="Contracts, ID copies, certificates" />
      </div>
    </PageShell>
  );
}
