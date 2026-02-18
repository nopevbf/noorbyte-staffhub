import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { History, Download, BarChart3, Eye } from 'lucide-react';

export default function PayrollHistory() {
  return (
    <PageShell title="Payroll History" subtitle="Past payroll records and archives" breadcrumbs={[{ label: 'Payroll' }, { label: 'History' }]}>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Period</th><th>Employees</th><th>Gross Total</th><th>Net Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {[
                { period: 'Jan 2026', emp: 248, gross: 'Rp 1.2B', net: 'Rp 980M', status: 'Completed' },
                { period: 'Dec 2025', emp: 245, gross: 'Rp 1.15B', net: 'Rp 950M', status: 'Completed' },
                { period: 'Nov 2025', emp: 242, gross: 'Rp 1.1B', net: 'Rp 920M', status: 'Completed' },
              ].map((r) => (
                <tr key={r.period}>
                  <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.period}</td>
                  <td>{r.emp}</td><td>{r.gross}</td><td>{r.net}</td>
                  <td><span className="badge badge-success">{r.status}</span></td>
                  <td><button className="btn btn-ghost btn-sm"><Download size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={History} title="Archive" description="Full payroll history archive" />
        <FeatureCard icon={BarChart3} title="Comparison" description="Compare periods side by side" />
        <FeatureCard icon={Download} title="Re-download" description="Download payroll reports again" />
        <FeatureCard icon={Eye} title="Detail View" description="Click into any period for details" />
      </div>
    </PageShell>
  );
}
