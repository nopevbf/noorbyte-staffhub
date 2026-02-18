import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Edit, History, FileText, Image } from 'lucide-react';

export default function ExpenseDetail() {
  const { id } = useParams();
  return (
    <PageShell title="Expense Detail" subtitle={`Transaction #${id || 'EXP001'}`} breadcrumbs={[{ label: 'Finance' }, { label: 'Expense', to: '/finance/expense' }, { label: `#${id}` }]}>
      <div className="feature-list">
        <FeatureCard icon={History} title="Audit Trail" description="Full history of changes and approvals" />
        <FeatureCard icon={Image} title="Payment Proof" description="Attached receipts and invoices" />
        <FeatureCard icon={Edit} title="Edit" description="Modify transaction details" />
        <FeatureCard icon={FileText} title="Related Docs" description="Linked documents and invoices" />
      </div>
    </PageShell>
  );
}
