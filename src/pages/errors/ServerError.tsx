import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="auth-layout" style={{ textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div style={{ fontSize: '6rem', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, var(--danger), #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>500</div>
        <h2 style={{ color: 'var(--surface-200)', marginBottom: '8px' }}>Server Error</h2>
        <p style={{ color: 'var(--surface-400)', marginBottom: '24px' }}>Something went wrong on our end. Please try again later.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()} className="btn btn-primary"><RefreshCw size={16} /> Retry</button>
          <Link to="/dashboard" className="btn btn-secondary"><Home size={16} /> Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
