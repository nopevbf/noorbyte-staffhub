import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function FinanceDashboard() {
  return (
    <PageShell title="Finance Dashboard" subtitle="Financial overview with cashflow, charts, and KPIs" breadcrumbs={[{ label: 'Finance' }, { label: 'Dashboard' }]}>
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><TrendingUp size={22} /></div><div className="stat-content"><h3>Revenue (MTD)</h3><div className="stat-value">Rp 1.2B</div><div className="stat-change up"><ArrowUpRight size={14} /> +8.3%</div></div></div>
        <div className="stat-card"><div className="stat-icon danger"><TrendingDown size={22} /></div><div className="stat-content"><h3>Expenses (MTD)</h3><div className="stat-value">Rp 847M</div><div className="stat-change down"><ArrowDownRight size={14} /> +2.1%</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><DollarSign size={22} /></div><div className="stat-content"><h3>Net Profit</h3><div className="stat-value">Rp 353M</div><div className="stat-change up"><ArrowUpRight size={14} /> +15.2%</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><PieChart size={22} /></div><div className="stat-content"><h3>Cash Balance</h3><div className="stat-value">Rp 2.4B</div></div></div>
      </div>
      <div className="card" style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ textAlign: 'center', color: 'var(--surface-500)' }}><PieChart size={48} style={{ marginBottom: '12px', opacity: 0.3 }} /><p>Revenue vs Expense chart placeholder</p></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={TrendingUp} title="Cashflow" description="Daily/monthly cashflow trends" />
        <FeatureCard icon={PieChart} title="Charts" description="Revenue, expense, and profit charts" />
        <FeatureCard icon={DollarSign} title="KPIs" description="Key financial performance indicators" />
        <FeatureCard icon={TrendingDown} title="Trends" description="Month-over-month comparison" />
      </div>
    </PageShell>
  );
}
