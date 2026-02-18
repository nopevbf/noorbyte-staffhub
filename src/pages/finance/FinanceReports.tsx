import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { FileText, BarChart3, Download, TrendingUp } from 'lucide-react';

export default function FinanceReports() {
  return (
    <PageShell title="Financial Reports" subtitle="P&L, balance sheet, cashflow, and custom reports" breadcrumbs={[{ label: 'Finance' }, { label: 'Reports' }]}>
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        {[{ n: 'Profit & Loss', d: 'Income vs expenses breakdown', i: TrendingUp },{ n: 'Balance Sheet', d: 'Assets, liabilities, and equity', i: BarChart3 },{ n: 'Cash Flow', d: 'Cash inflows and outflows', i: FileText },{ n: 'Custom Report', d: 'Build your own financial report', i: Download }].map((r) => (
          <div key={r.n} className="card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="stat-icon primary"><r.i size={22} /></div>
            <div><h4 style={{ fontWeight: 600, color: 'var(--surface-200)', marginBottom: '4px' }}>{r.n}</h4><p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{r.d}</p></div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
