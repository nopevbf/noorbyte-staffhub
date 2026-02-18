import PageShell from '../../components/common/PageShell';
import { Save, Paperclip, Upload } from 'lucide-react';

export default function AddExpense() {
  return (
    <PageShell title="Add Expense" subtitle="Record new spending transaction" breadcrumbs={[{ label: 'Finance' }, { label: 'Expense', to: '/finance/expense' }, { label: 'New' }]}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Description</label><input className="input" placeholder="Expense description" /></div>
          <div className="input-group"><label>Amount (Rp)</label><input className="input" type="number" placeholder="0" /></div>
          <div className="input-group"><label>Category</label><select className="input"><option>Operations</option><option>IT</option><option>Entertainment</option><option>Travel</option></select></div>
          <div className="input-group"><label>Date</label><input className="input" type="date" /></div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button className="btn btn-ghost"><Paperclip size={16} /> Attach Receipt</button>
          <button className="btn btn-ghost"><Upload size={16} /> Upload Invoice</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary"><Save size={16} /> Submit for Approval</button>
        </div>
      </div>
    </PageShell>
  );
}
