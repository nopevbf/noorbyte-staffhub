import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { DollarSign, Plus, Settings, Users } from 'lucide-react';

export default function MasterSalary() {
  return (
    <PageShell title="Master Salary" subtitle="Manage salary component templates and assignment rules" breadcrumbs={[{ label: 'Payroll' }, { label: 'Master Salary' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Component</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper"><table><thead><tr><th>Component</th><th>Type</th><th>Default Amount</th><th>Taxable</th><th>Status</th></tr></thead>
        <tbody>
          {[{ n: 'Base Salary', t: 'Earning', a: 'Rp 8,000,000', tax: 'Yes', s: 'Active' },{ n: 'Transport Allowance', t: 'Allowance', a: 'Rp 1,500,000', tax: 'No', s: 'Active' },{ n: 'Meal Allowance', t: 'Allowance', a: 'Rp 1,000,000', tax: 'No', s: 'Active' },{ n: 'Position Allowance', t: 'Allowance', a: 'Rp 2,000,000', tax: 'Yes', s: 'Active' }].map((r) => (
            <tr key={r.n}><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.n}</td><td><span className="badge badge-primary">{r.t}</span></td><td>{r.a}</td><td>{r.tax}</td><td><span className="badge badge-success">{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={DollarSign} title="Component Templates" description="Define reusable salary components" />
        <FeatureCard icon={Settings} title="Assignment Rules" description="Auto-assign components by role/level" />
        <FeatureCard icon={Users} title="Group Assignment" description="Apply templates to groups of employees" />
      </div>
    </PageShell>
  );
}
