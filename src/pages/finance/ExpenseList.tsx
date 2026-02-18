import PageShell from '../../components/common/PageShell';
import { Plus, Filter, Download } from 'lucide-react';

export default function ExpenseList() {
  return (
    <PageShell title="Expenses" subtitle="Spending transactions" breadcrumbs={[{ label: 'Finance' }, { label: 'Expense' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Expense</button>}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button><button className="btn btn-ghost btn-sm"><Download size={14} /> Export</button></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          {[{ d: '2026-02-16', desc: 'Office Supplies', c: 'Operations', a: 'Rp 2,500,000', s: 'Approved' },{ d: '2026-02-12', desc: 'Server Hosting', c: 'IT', a: 'Rp 5,000,000', s: 'Approved' },{ d: '2026-02-08', desc: 'Team Lunch', c: 'Entertainment', a: 'Rp 1,200,000', s: 'Pending' }].map((r, i) => (
            <tr key={i}><td>{r.d}</td><td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.desc}</td><td><span className="badge badge-info">{r.c}</span></td><td style={{ color: 'var(--danger)' }}>-{r.a}</td><td><span className={`badge ${r.s === 'Approved' ? 'badge-success' : 'badge-warning'}`}>{r.s}</span></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </PageShell>
  );
}
