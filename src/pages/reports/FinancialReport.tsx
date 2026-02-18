import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Download, Layers, PieChart } from 'lucide-react';

export default function FinancialReport() {
  return (
    <PageShell title="Financial Report" subtitle="Custom financial query with multi-dimensional analysis" breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Finance' }]} actions={<button className="btn btn-primary"><Download size={16} /> Export</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Date Range</label><input className="input" type="date" /></div>
          <div className="input-group"><label>Category</label><select className="input"><option>All Categories</option></select></div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Layers} title="Multi-Dimensional" description="Slice data across multiple dimensions" />
        <FeatureCard icon={PieChart} title="Pivot Tables" description="Dynamic pivot table views" />
        <FeatureCard icon={Download} title="Export" description="Download in multiple formats" />
      </div>
    </PageShell>
  );
}
