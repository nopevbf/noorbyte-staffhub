import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Clock, Plus, Percent, Calendar } from 'lucide-react';

export default function MasterOvertime() {
  return (
    <PageShell title="Master Overtime" subtitle="OT rate rules, multipliers, and thresholds" breadcrumbs={[{ label: 'Payroll' }, { label: 'Master Overtime' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Rule</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper"><table><thead><tr><th>Rule Name</th><th>Day Type</th><th>First Hour</th><th>Next Hours</th><th>Status</th></tr></thead>
        <tbody>
          {[{ n: 'Weekday OT', d: 'Regular', f: '1.5x', nh: '2.0x', s: 'Active' },{ n: 'Weekend OT', d: 'Weekend', f: '2.0x', nh: '2.5x', s: 'Active' },{ n: 'Holiday OT', d: 'Holiday', f: '3.0x', nh: '4.0x', s: 'Active' }].map((r) => (
            <tr key={r.n}><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.n}</td><td>{r.d}</td><td><span className="badge badge-warning">{r.f}</span></td><td><span className="badge badge-danger">{r.nh}</span></td><td><span className="badge badge-success">{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Percent} title="Multipliers" description="Define rate multipliers per rule" />
        <FeatureCard icon={Clock} title="Thresholds" description="Set hour thresholds for rate changes" />
        <FeatureCard icon={Calendar} title="Day-Type Rules" description="Different rates for weekdays, weekends, holidays" />
      </div>
    </PageShell>
  );
}
