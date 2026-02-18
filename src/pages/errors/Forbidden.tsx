import { Link } from 'react-router-dom';
import { Home, ShieldOff } from 'lucide-react';

export default function Forbidden() {
  return (
    <div className="auth-layout" style={{ textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div style={{ fontSize: '6rem', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, var(--warning), #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>403</div>
        <h2 style={{ color: 'var(--surface-200)', marginBottom: '8px' }}>Access Denied</h2>
        <p style={{ color: 'var(--surface-400)', marginBottom: '24px' }}>You do not have permission to access this resource. Contact your administrator.</p>
        <Link to="/dashboard" className="btn btn-primary"><Home size={16} /> Back to Dashboard</Link>
      </div>
    </div>
  );
}
