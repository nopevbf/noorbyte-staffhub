import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Download, Calendar, Search, FileText } from 'lucide-react';

export default function ReportViewer() {
  const { type } = useParams();
  const title = type === 'pnl' ? 'Profit & Loss' : type === 'balance' ? 'Balance Sheet' : type === 'cashflow' ? 'Cash Flow' : 'Financial Report';
  return (
    <PageShell title={title} subtitle={`Generated report — ${type}`} breadcrumbs={[{ label: 'Finance' }, { label: 'Reports', to: '/finance/reports' }, { label: title }]} actions={<button className="btn btn-primary"><Download size={16} /> Export</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-3" style={{ gap: '16px', marginBottom: '16px' }}>
          <div className="input-group"><label>Start Date</label><input className="input" type="date" /></div>
          <div className="input-group"><label>End Date</label><input className="input" type="date" /></div>
          <div className="input-group"><label>Group By</label><select className="input"><option>Monthly</option><option>Quarterly</option><option>Yearly</option></select></div>
        </div>
        <button className="btn btn-primary"><Search size={16} /> Generate</button>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Calendar} title="Date Range" description="Custom date range selection" />
        <FeatureCard icon={Search} title="Drill-Down" description="Click into details for any line item" />
        <FeatureCard icon={Download} title="Export" description="Export to Excel/PDF" />
        <FeatureCard icon={FileText} title="Report Data" description="Generated report displays here" />
      </div>
    </PageShell>
  );
}
