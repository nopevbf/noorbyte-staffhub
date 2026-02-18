import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Archive, ArrowLeftRight, Download, FileText, Loader2 } from 'lucide-react';
import { usePayrollRuns } from '@/hooks/usePayroll';

export default function PayrollHistory() {
  const { data: runs, isLoading, error } = usePayrollRuns();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <PageShell
      title="Payroll History"
      subtitle="Archive of processed payrolls"
      breadcrumbs={[{ label: 'Payroll' }, { label: 'History' }]}
    >
      <div className="feature-list" style={{ marginBottom: '24px' }}>
        <FeatureCard icon={Archive} title="Archive" description="Access past payslips and reports" />
        <FeatureCard icon={ArrowLeftRight} title="Compare" description="Compare periods side-by-side" />
        <FeatureCard icon={Download} title="Re-download" description="Download bank transfer files" />
        <FeatureCard icon={FileText} title="Tax Reports" description="Generated PPh 21 reports" />
      </div>

      <div className="card" style={{ padding: 0 }}>
        {isLoading ? (
          <div style={{ padding: '48px', display: 'flex', justifyContent: 'center', color: 'var(--surface-500)' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
           <div style={{ padding: '24px', color: 'var(--danger-500)', textAlign: 'center' }}>
            Failed to load payroll history
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Period</th><th>Emp</th><th>Gross Pay</th><th>Net Pay</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {runs?.map((r: any) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.period}</td>
                    <td>{r.totalEmployees}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--surface-300)' }}>{formatCurrency(r.totalGross)}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-400)', fontWeight: 500 }}>{formatCurrency(r.totalNet)}</td>
                    <td>
                      <span className={`badge ${r.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageShell>
  );
}
