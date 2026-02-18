import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { AlertTriangle, BarChart3, Calendar, TrendingUp } from 'lucide-react';

export default function Budgeting() {
  return (
    <PageShell title="Budgeting" subtitle="Monthly budgets and variance analysis" breadcrumbs={[{ label: 'Finance' }, { label: 'Budget' }]}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon primary"><BarChart3 size={22} /></div><div className="stat-content"><h3>Total Budget</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Rp 900M</div></div></div>
        <div className="stat-card"><div className="stat-icon warning"><TrendingUp size={22} /></div><div className="stat-content"><h3>Spent</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Rp 620M</div></div></div>
        <div className="stat-card"><div className="stat-icon success"><Calendar size={22} /></div><div className="stat-content"><h3>Remaining</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Rp 280M</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={BarChart3} title="Variance Analysis" description="Budget vs actual comparison" />
        <FeatureCard icon={AlertTriangle} title="Budget Alerts" description="Get alerts when nearing budget limits" />
        <FeatureCard icon={Calendar} title="Monthly View" description="Month-by-month budget tracking" />
      </div>
    </PageShell>
  );
}
