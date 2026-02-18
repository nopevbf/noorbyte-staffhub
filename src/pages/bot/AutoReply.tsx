import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Plus, Zap, Clock, MessageSquare } from 'lucide-react';

export default function AutoReply() {
  return (
    <PageShell title="Auto-Reply Rules" subtitle="Configure automated bot responses" breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Auto-Reply' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Rule</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper"><table><thead><tr><th>Keyword</th><th>Response</th><th>Type</th><th>Status</th></tr></thead>
        <tbody>
          {[{ k: 'check in', r: 'Sends location request', t: 'Attendance', s: 'Active' },{ k: 'slip gaji, payslip', r: 'Sends latest payslip', t: 'Payroll', s: 'Active' },{ k: 'cuti, leave', r: 'Leave request form', t: 'Leave', s: 'Active' },{ k: '*', r: 'AI fallback response', t: 'Default', s: 'Active' }].map((r, i) => (
            <tr key={i}><td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary-400)' }}>{r.k}</td><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.r}</td><td><span className="badge badge-primary">{r.t}</span></td><td><span className="badge badge-success">{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Zap} title="Keyword Triggers" description="Match keywords to automated responses" />
        <FeatureCard icon={MessageSquare} title="AI Fallback" description="AI-powered response for unmatched queries" />
        <FeatureCard icon={Clock} title="Business Hours" description="Configure active hours for auto-reply" />
      </div>
    </PageShell>
  );
}
