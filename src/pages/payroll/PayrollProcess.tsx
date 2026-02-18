import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { ClipboardList, CheckCircle, Calculator, Eye, CreditCard } from 'lucide-react';

const steps = [
  { label: 'Select Period', active: true },
  { label: 'Validation', active: false },
  { label: 'Calculation', active: false },
  { label: 'Review', active: false },
  { label: 'Payout', active: false },
];

export default function PayrollProcess() {
  return (
    <PageShell
      title="Process Payroll"
      subtitle="Monthly payroll processing wizard"
      breadcrumbs={[{ label: 'Payroll' }, { label: 'Process' }]}
    >
      <div style={{ display: 'flex', gap: '4px', marginBottom: '28px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 18px', borderRadius: 'var(--radius-md)',
            background: s.active ? 'rgba(99, 102, 241, 0.1)' : 'rgba(15, 23, 42, 0.4)',
            border: `1px solid ${s.active ? 'rgba(99, 102, 241, 0.3)' : 'var(--glass-border)'}`,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: s.active ? 'var(--primary-600)' : 'var(--surface-700)', color: s.active ? 'white' : 'var(--surface-400)',
              fontSize: '0.85rem', fontWeight: 600
            }}>{i + 1}</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: s.active ? 'var(--primary-400)' : 'var(--surface-400)' }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontWeight: 600, color: 'var(--surface-200)', marginBottom: '20px' }}>Step 1: Select Payroll Period</h3>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Month</label><select className="input"><option>February 2026</option><option>January 2026</option></select></div>
          <div className="input-group"><label>Employee Group</label><select className="input"><option>All Employees</option><option>Department…</option></select></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button className="btn btn-primary">Continue →</button>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={ClipboardList} title="5-Step Wizard" description="Period → Validation → Calc → Review → Payout" />
        <FeatureCard icon={CheckCircle} title="Data Validation" description="Auto-check attendance and deduction data" />
        <FeatureCard icon={Calculator} title="Auto Calculation" description="Compute gross, deductions, net pay" />
        <FeatureCard icon={Eye} title="Review & Approve" description="Review summary before final payout" />
        <FeatureCard icon={CreditCard} title="Payout" description="Execute bank transfers or print checks" />
      </div>
    </PageShell>
  );
}
