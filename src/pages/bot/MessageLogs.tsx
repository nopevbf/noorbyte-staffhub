import PageShell from '../../components/common/PageShell';
import { Search, Filter, Download, Loader2 } from 'lucide-react';
import { useBotLogs } from '@/hooks/useBot';

export default function MessageLogs() {
  const { data: logs, isLoading, error } = useBotLogs();

  return (
    <PageShell title="Message Logs" subtitle="All bot conversations and analytics" breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Logs' }]} actions={<button className="btn btn-secondary"><Download size={16} /> Export</button>}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}><button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button><button className="btn btn-ghost btn-sm"><Search size={14} /> Search</button></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div style={{ padding: '48px', display: 'flex', justifyContent: 'center', color: 'var(--surface-500)' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
           <div style={{ padding: '24px', color: 'var(--danger-500)', textAlign: 'center' }}>
            Failed to load message logs
          </div>
        ) : (
          <div className="table-wrapper"><table><thead><tr><th>Time</th><th>From (Session)</th><th>Message</th><th>Direction</th><th>Status</th></tr></thead>
          <tbody>
            {logs?.map((r: any) => (
              <tr key={r.id}>
                <td>{new Date(r.timestamp).toLocaleTimeString()}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{r.sessionId}</td>
                <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{r.content}</td>
                <td><span className={`badge ${r.direction === 'inbound' ? 'badge-primary' : 'badge-secondary'}`}>{r.direction}</span></td>
                <td><span className={`badge ${r.status === 'read' || r.status === 'delivered' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span></td>
              </tr>
            ))}
            {logs?.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--surface-500)' }}>No logs found</td></tr>
            )}
          </tbody></table></div>
        )}
      </div>
    </PageShell>
  );
}
