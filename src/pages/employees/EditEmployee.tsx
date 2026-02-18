import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Save, User, Briefcase, FileText, History } from 'lucide-react';

export default function EditEmployee() {
  const { id } = useParams();
  return (
    <PageShell
      title="Edit Employee"
      subtitle={`Modify data for employee #${id || 'E001'}`}
      breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: `#${id}`, to: `/employees/${id}` }, { label: 'Edit' }]}
      actions={<button className="btn btn-primary"><Save size={16} /> Save Changes</button>}
    >
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '24px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)', padding: '4px', border: '1px solid var(--glass-border)' }}>
        {['Personal', 'Employment', 'Salary', 'Documents', 'Audit Log'].map((tab, i) => (
          <button key={tab} className={i === 0 ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}>{tab}</button>
        ))}
      </div>
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--surface-200)', marginBottom: '20px' }}>Personal Information</h3>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Full Name</label><input className="input" defaultValue="Ahmad Fauzi" /></div>
          <div className="input-group"><label>Email</label><input className="input" defaultValue="ahmad@company.com" /></div>
          <div className="input-group"><label>Phone</label><input className="input" defaultValue="+62 812 3456 7890" /></div>
          <div className="input-group"><label>Department</label><input className="input" defaultValue="Engineering" /></div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={User} title="Tabbed Interface" description="Organize edits across Personal, Employment, Salary tabs" />
        <FeatureCard icon={Briefcase} title="Employment Tab" description="Position, department, contract details" />
        <FeatureCard icon={FileText} title="Documents Tab" description="Upload and manage documents" />
        <FeatureCard icon={History} title="Audit Log" description="Track all changes made to employee data" />
      </div>
    </PageShell>
  );
}
