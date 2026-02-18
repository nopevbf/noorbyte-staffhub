import { WifiOff, RefreshCw } from 'lucide-react';

export default function Offline() {
  return (
    <div className="auth-layout" style={{ textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <WifiOff size={64} style={{ color: 'var(--surface-500)', marginBottom: '16px' }} />
        <h2 style={{ color: 'var(--surface-200)', marginBottom: '8px' }}>You're Offline</h2>
        <p style={{ color: 'var(--surface-400)', marginBottom: '24px' }}>It looks like you've lost your internet connection. Please check your network and try again.</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary"><RefreshCw size={16} /> Try Again</button>
      </div>
    </div>
  );
}
