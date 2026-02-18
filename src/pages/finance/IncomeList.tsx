import PageShell from '../../components/common/PageShell';
import { Plus, Filter, Download } from 'lucide-react';

export default function IncomeList() {
  return (
    <PageShell title="Income" subtitle="Revenue transactions" breadcrumbs={[{ label: 'Finance' }, { label: 'Income' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Income</button>}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button><button className="btn btn-ghost btn-sm"><Download size={14} /> Export</button></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          {[{ d: '2026-02-15', desc: 'Client Payment - ABC Corp', c: 'Service Revenue', a: 'Rp 45,000,000', s: 'Received' },{ d: '2026-02-10', desc: 'Product Sale #2045', c: 'Product Sales', a: 'Rp 12,500,000', s: 'Received' },{ d: '2026-02-05', desc: 'Consulting Fee', c: 'Service Revenue', a: 'Rp 8,000,000', s: 'Pending' }].map((r, i) => (
            <tr key={i}><td>{r.d}</td><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.desc}</td><td><span className="badge badge-primary">{r.c}</span></td><td style={{ color: 'var(--success)' }}>{r.a}</td><td><span className={`badge ${r.s === 'Received' ? 'badge-success' : 'badge-warning'}`}>{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </PageShell>
  );
}
