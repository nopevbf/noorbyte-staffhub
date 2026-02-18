import PageShell from '../../components/common/PageShell';
import { Plus, Filter, Download, Loader2 } from 'lucide-react';
import { useTransactions } from '@/hooks/useFinance';

export default function IncomeList() {
  const { data: transactions, isLoading, error } = useTransactions();
  
  const incomeTransactions = transactions?.filter((t: any) => t.type === 'income') || [];

  const formatCurrency = (amount: string | number) => {
    // Handle if amount is string "Rp 50000" or number
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g,"")) : amount;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  return (
    <PageShell title="Income" subtitle="Revenue transactions" breadcrumbs={[{ label: 'Finance' }, { label: 'Income' }]} actions={<button className="btn btn-primary"><Plus size={16} /> Add Income</button>}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button><button className="btn btn-ghost btn-sm"><Download size={14} /> Export</button></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '48px', display: 'flex', justifyContent: 'center', color: 'var(--surface-500)' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
           <div style={{ padding: '24px', color: 'var(--danger-500)', textAlign: 'center' }}>
            Failed to load transactions
          </div>
        ) : (
          <div className="table-wrapper"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {incomeTransactions.map((r: any) => (
              <tr key={r.id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.description}</td>
                <td><span className="badge badge-primary">{r.category}</span></td>
                <td style={{ color: 'var(--success)' }}>{formatCurrency(r.amount)}</td>
                <td><span className={`badge ${r.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span></td>
              </tr>
            ))}
            {incomeTransactions.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--surface-500)' }}>No income transactions found</td></tr>
            )}
          </tbody></table></div>
        )}
      </div>
    </PageShell>
  );
}
