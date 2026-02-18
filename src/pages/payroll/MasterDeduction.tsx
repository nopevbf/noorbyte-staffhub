import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Plus, Shield, Calculator, CreditCard } from 'lucide-react';

export default function MasterDeduction() {
  return (
    <PageShell title="Master Deduction" subtitle="Manage deduction types: BPJS, PPh21, loans, and custom deductions" breadcrumbs={[{ label: 'Payroll' }, { label: 'Master Deduction' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Deduction</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper"><table><thead><tr><th>Deduction</th><th>Type</th><th>Rate/Amount</th><th>Status</th></tr></thead>
        <tbody>
          {[{ n: 'BPJS Kesehatan', t: 'Mandatory', a: '1%', s: 'Active' },{ n: 'BPJS Ketenagakerjaan', t: 'Mandatory', a: '2%', s: 'Active' },{ n: 'PPh 21', t: 'Tax', a: 'Progressive', s: 'Active' },{ n: 'Loan Installment', t: 'Custom', a: 'Rp 500,000', s: 'Active' }].map((r) => (
            <tr key={r.n}><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.n}</td><td><span className="badge badge-info">{r.t}</span></td><td>{r.a}</td><td><span className="badge badge-success">{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Shield} title="BPJS" description="BPJS Kesehatan & Ketenagakerjaan" />
        <FeatureCard icon={Calculator} title="PPh21" description="Progressive tax calculation" />
        <FeatureCard icon={CreditCard} title="Loans" description="Employee loan deductions" />
      </div>
    </PageShell>
  );
}
