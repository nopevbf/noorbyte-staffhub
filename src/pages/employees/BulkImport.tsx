import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';

export default function BulkImport() {
  return (
    <PageShell
      title="Bulk Import"
      subtitle="Import multiple employees via Excel or CSV upload"
      breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: 'Import' }]}
    >
      {/* Upload zone */}
      <div className="card" style={{ textAlign: 'center', padding: '60px 40px', marginBottom: '24px', border: '2px dashed var(--surface-600)', cursor: 'pointer' }}>
        <Upload size={48} style={{ color: 'var(--primary-400)', marginBottom: '16px' }} />
        <h3 style={{ color: 'var(--surface-200)', marginBottom: '8px' }}>Drop your file here</h3>
        <p style={{ color: 'var(--surface-400)', fontSize: '0.9rem', marginBottom: '16px' }}>Supports .xlsx, .xls, .csv files</p>
        <button className="btn btn-primary">Browse Files</button>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Download} title="Template Download" description="Download pre-formatted Excel template" />
        <FeatureCard icon={CheckCircle} title="Validation Preview" description="Preview and validate data before import" />
        <FeatureCard icon={AlertCircle} title="Error Handling" description="Detailed error reports for invalid rows" />
        <FeatureCard icon={Upload} title="Progress Tracking" description="Real-time import progress bar" />
      </div>
    </PageShell>
  );
}
