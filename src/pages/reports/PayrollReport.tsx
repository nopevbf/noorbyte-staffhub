import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Download, Building, TrendingUp, DollarSign } from 'lucide-react';

export default function PayrollReport() {
  return (
    <PageShell title="Payroll Report" subtitle="Compensation analysis by department and trends" breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Payroll' }]} actions={<button className="btn btn-primary"><Download size={16} /> Export</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-3" style={{ gap: '16px' }}>
          <div className="input-group"><label>Period</label><select className="input"><option>February 2026</option><option>January 2026</option></select></div>
          <div className="input-group"><label>Department</label><select className="input"><option>All Departments</option></select></div>
          <div className="input-group"><label>Report Type</label><select className="input"><option>Summary</option><option>Detail</option><option>Bank Summary</option></select></div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Building} title="By Department" description="Breakdown by department" />
        <FeatureCard icon={TrendingUp} title="Trends" description="Month-over-month payroll trends" />
        <FeatureCard icon={DollarSign} title="Bank Summary" description="Bank transfer summary for payroll" />
      </div>
    </PageShell>
  );
}
