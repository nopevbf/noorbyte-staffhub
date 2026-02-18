import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { GitBranch, Users, Move, Eye } from 'lucide-react';

export default function EmployeeStructure() {
  return (
    <PageShell
      title="Organization Structure"
      subtitle="Visualize your company's hierarchical structure"
      breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: 'Structure' }]}
    >
      {/* Mock org chart */}
      <div className="card" style={{ textAlign: 'center', padding: '40px', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '14px 28px', background: 'rgba(99, 102, 241, 0.15)', border: '2px solid var(--primary-500)', borderRadius: 'var(--radius-md)', color: 'var(--primary-300)', fontWeight: 600 }}>
            CEO — Noor Hidayat
          </div>
          <div style={{ width: '2px', height: '20px', background: 'var(--surface-600)' }} />
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Engineering', 'HR', 'Finance', 'Marketing'].map((dept) => (
              <div key={dept} style={{ padding: '12px 20px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--surface-300)', fontSize: '0.9rem' }}>
                {dept}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={GitBranch} title="Hierarchical Tree" description="Visual org chart with expandable nodes" />
        <FeatureCard icon={Move} title="Drag-Drop Reassign" description="Move employees between departments" />
        <FeatureCard icon={Users} title="Team View" description="See team members under each manager" />
        <FeatureCard icon={Eye} title="Visual Modes" description="Tree view, grid view, and list view" />
      </div>
    </PageShell>
  );
}
