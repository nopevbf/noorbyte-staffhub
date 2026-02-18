import PageShell from '../../components/common/PageShell';
import { Save, User, Briefcase, Wallet, FileText } from 'lucide-react';

const steps = [
  { icon: User, label: 'Personal', active: true },
  { icon: Briefcase, label: 'Employment', active: false },
  { icon: Wallet, label: 'Salary', active: false },
  { icon: FileText, label: 'Documents', active: false },
];

export default function AddEmployee() {
  return (
    <PageShell
      title="Add Employee"
      subtitle="Onboard a new employee with step-by-step form"
      breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: 'New' }]}
    >
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '28px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 18px', borderRadius: 'var(--radius-md)',
            background: s.active ? 'rgba(99, 102, 241, 0.1)' : 'rgba(15, 23, 42, 0.4)',
            border: `1px solid ${s.active ? 'rgba(99, 102, 241, 0.3)' : 'var(--glass-border)'}`,
            cursor: 'pointer', transition: 'all var(--transition-fast)'
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: s.active ? 'var(--primary-600)' : 'var(--surface-700)', color: s.active ? 'white' : 'var(--surface-400)',
              fontSize: '0.85rem', fontWeight: 600
            }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: s.active ? 'var(--primary-400)' : 'var(--surface-400)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--surface-200)', marginBottom: '20px' }}>Personal Information</h3>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Full Name</label><input className="input" placeholder="Enter full name" /></div>
          <div className="input-group"><label>Email Address</label><input className="input" type="email" placeholder="email@company.com" /></div>
          <div className="input-group"><label>Phone Number</label><input className="input" placeholder="+62 xxx" /></div>
          <div className="input-group"><label>Date of Birth</label><input className="input" type="date" /></div>
          <div className="input-group"><label>Gender</label><select className="input"><option>Male</option><option>Female</option></select></div>
          <div className="input-group"><label>National ID (KTP)</label><input className="input" placeholder="16 digit number" /></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary"><Save size={16} /> Save & Continue</button>
        </div>
      </div>
    </PageShell>
  );
}
