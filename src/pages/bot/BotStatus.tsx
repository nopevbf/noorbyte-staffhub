import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Wifi, QrCode, BarChart3, RefreshCw } from 'lucide-react';

export default function BotStatus() {
  return (
    <PageShell title="WhatsApp Bot Status" subtitle="Connection health, QR code, and statistics" breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Status' }]}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><Wifi size={22} /></div><div className="stat-content"><h3>Connection</h3><div className="stat-value" style={{ fontSize: '1.2rem' }}>Connected</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><BarChart3 size={22} /></div><div className="stat-content"><h3>Messages Today</h3><div className="stat-value">342</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><BarChart3 size={22} /></div><div className="stat-content"><h3>Active Sessions</h3><div className="stat-value">28</div></div></div>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '40px', marginBottom: '24px' }}>
        <QrCode size={120} style={{ color: 'var(--surface-600)', marginBottom: '16px' }} />
        <p style={{ color: 'var(--surface-400)' }}>Scan QR code to reconnect WhatsApp</p>
        <button className="btn btn-primary" style={{ marginTop: '16px' }}><RefreshCw size={16} /> Reconnect</button>
      </div>
      <div className="feature-list">
        <FeatureCard icon={QrCode} title="QR Code" description="Scan to connect WhatsApp" />
        <FeatureCard icon={RefreshCw} title="Reconnect" description="Re-establish bot connection" />
        <FeatureCard icon={BarChart3} title="Stats" description="Message volume and response rates" />
        <FeatureCard icon={Wifi} title="Logs" description="Connection event logs" />
      </div>
    </PageShell>
  );
}
