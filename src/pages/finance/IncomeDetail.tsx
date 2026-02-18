import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Edit, Copy, Link, FileText } from 'lucide-react';

export default function IncomeDetail() {
  const { id } = useParams();
  return (
    <PageShell title="Income Detail" subtitle={`Transaction #${id || 'INC001'}`} breadcrumbs={[{ label: 'Finance' }, { label: 'Income', to: '/finance/income' }, { label: `#${id}` }]} actions={<button className="btn btn-primary"><Edit size={16} /> Edit</button>}>
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><FileText size={22} /></div><div className="stat-content"><h3>Amount</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Rp 45,000,000</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><FileText size={22} /></div><div className="stat-content"><h3>Status</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Received</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Edit} title="Edit" description="Modify transaction details" />
        <FeatureCard icon={Copy} title="Duplicate" description="Create a copy of this transaction" />
        <FeatureCard icon={Link} title="Link to Invoice" description="Connect to related invoices" />
      </div>
    </PageShell>
  );
}
