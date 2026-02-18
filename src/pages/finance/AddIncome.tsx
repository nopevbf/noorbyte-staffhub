import PageShell from '../../components/common/PageShell';
import { Save, Repeat, Paperclip } from 'lucide-react';

export default function AddIncome() {
  return (
    <PageShell title="Add Income" subtitle="Record new revenue transaction" breadcrumbs={[{ label: 'Finance' }, { label: 'Income', to: '/finance/income' }, { label: 'New' }]}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Description</label><input className="input" placeholder="Transaction description" /></div>
          <div className="input-group"><label>Amount (Rp)</label><input className="input" type="number" placeholder="0" /></div>
          <div className="input-group"><label>Category</label><select className="input"><option>Service Revenue</option><option>Product Sales</option><option>Other</option></select></div>
          <div className="input-group"><label>Date</label><input className="input" type="date" /></div>
          <div className="input-group"><label>Customer</label><input className="input" placeholder="Customer name" /></div>
          <div className="input-group"><label>Payment Method</label><select className="input"><option>Bank Transfer</option><option>Cash</option><option>E-Wallet</option></select></div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button className="btn btn-ghost"><Paperclip size={16} /> Attach File</button>
          <button className="btn btn-ghost"><Repeat size={16} /> Set Recurring</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary"><Save size={16} /> Save</button>
        </div>
      </div>
    </PageShell>
  );
}
