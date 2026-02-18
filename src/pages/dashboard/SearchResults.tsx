import { useSearchParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import { Search, Users, Wallet, FileText } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const mockResults = [
    { type: 'employee', icon: Users, title: 'Ahmad Fauzi', desc: 'Software Engineer · Engineering Dept', badge: 'Employee' },
    { type: 'employee', icon: Users, title: 'Siti Nurbaya', desc: 'HR Manager · Human Resources', badge: 'Employee' },
    { type: 'transaction', icon: Wallet, title: 'Invoice #INV-2026-001', desc: 'Rp 15,000,000 · Jan 2026', badge: 'Transaction' },
    { type: 'document', icon: FileText, title: 'Employee Handbook v2', desc: 'Updated Feb 2026', badge: 'Document' },
  ];

  return (
    <PageShell
      title="Search Results"
      subtitle={query ? `Showing results for "${query}"` : 'Enter a search term'}
      breadcrumbs={[{ label: 'Search' }]}
    >
      {query ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          {mockResults.map((r, i) => (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
              <div className="stat-icon primary"><r.icon size={20} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ color: 'var(--surface-200)' }}>{r.title}</strong>
                  <span className="badge badge-primary">{r.badge}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--surface-500)' }}>
          <Search size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
          <p>Use the search bar above to find employees, transactions, and more.</p>
        </div>
      )}
    </PageShell>
  );
}
