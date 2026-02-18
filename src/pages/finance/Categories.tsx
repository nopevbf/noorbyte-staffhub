import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { FolderTree, Plus, Palette, DollarSign } from 'lucide-react';

export default function Categories() {
  return (
    <PageShell title="Categories" subtitle="Chart of accounts and budget allocation" breadcrumbs={[{ label: 'Finance' }, { label: 'Categories' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Category</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        {[{ n: 'Revenue', ch: ['Service Revenue', 'Product Sales', 'Other Income'], color: 'var(--success)' },{ n: 'Expenses', ch: ['Operations', 'IT', 'HR', 'Marketing'], color: 'var(--danger)' },{ n: 'Assets', ch: ['Cash', 'Bank Accounts', 'Equipment'], color: 'var(--info)' }].map((cat) => (
          <div key={cat.n} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color }} />
              <strong style={{ color: 'var(--surface-200)' }}>{cat.n}</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px', paddingLeft: '18px', flexWrap: 'wrap' }}>
              {cat.ch.map((c) => (<span key={c} className="badge badge-primary" style={{ cursor: 'pointer' }}>{c}</span>))}
            </div>
          </div>
        ))}
      </div>
      <div className="feature-list">
        <FeatureCard icon={FolderTree} title="Tree Structure" description="Hierarchical account categories" />
        <FeatureCard icon={DollarSign} title="Budget Allocation" description="Assign budgets per category" />
        <FeatureCard icon={Palette} title="Color Coding" description="Visual color coding for categories" />
      </div>
    </PageShell>
  );
}
