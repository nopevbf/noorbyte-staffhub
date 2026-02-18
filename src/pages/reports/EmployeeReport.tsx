import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Download, UserMinus, BarChart3, Users } from 'lucide-react';

export default function EmployeeReport() {
  return (
    <PageShell title="Employee Report" subtitle="HR analytics: turnover, attendance rate, demographics" breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Employees' }]} actions={<button className="btn btn-primary"><Download size={16} /> Export</button>}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon danger"><UserMinus size={22} /></div><div className="stat-content"><h3>Turnover Rate</h3><div className="stat-value">3.2%</div></div></div>
        <div className="stat-card"><div className="stat-icon success"><BarChart3 size={22} /></div><div className="stat-content"><h3>Avg Attendance</h3><div className="stat-value">94.2%</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><Users size={22} /></div><div className="stat-content"><h3>Avg Age</h3><div className="stat-value">32.5</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={UserMinus} title="Turnover" description="Employee turnover analysis" />
        <FeatureCard icon={BarChart3} title="Attendance Rate" description="Company-wide attendance metrics" />
        <FeatureCard icon={Users} title="Age Distribution" description="Employee age demographics" />
      </div>
    </PageShell>
  );
}
