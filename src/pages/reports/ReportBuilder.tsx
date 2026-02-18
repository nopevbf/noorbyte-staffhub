import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Sliders, Filter, Save, Layout } from 'lucide-react';

export default function ReportBuilder() {
  return (
    <PageShell title="Custom Report Builder" subtitle="Drag-and-drop report creator with custom fields and filters" breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Builder' }]}>
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h4 style={{ fontWeight: 600, color: 'var(--surface-200)', marginBottom: '12px' }}>Available Fields</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Employee Name', 'Department', 'Position', 'Salary', 'Attendance', 'Overtime', 'Deductions'].map((f) => (
              <div key={f} style={{ padding: '8px 12px', background: 'var(--surface-800)', borderRadius: 'var(--radius-sm)', cursor: 'grab', fontSize: '0.85rem', color: 'var(--surface-300)', border: '1px solid var(--surface-700)' }}>{f}</div>
            ))}
          </div>
        </div>
        <div className="card" style={{ border: '2px dashed var(--surface-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <div style={{ textAlign: 'center', color: 'var(--surface-500)' }}>
            <Layout size={48} style={{ marginBottom: '12px', opacity: 0.3 }} />
            <p>Drop fields here to build your report</p>
          </div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Sliders} title="Fields" description="Drag fields to build columns" />
        <FeatureCard icon={Filter} title="Filters" description="Add conditions and filters" />
        <FeatureCard icon={Layout} title="Groupings" description="Group data by dimensions" />
        <FeatureCard icon={Save} title="Save Template" description="Save reports for future use" />
      </div>
    </PageShell>
  );
}
