import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: 480, width: '100%', animation: 'fadeInUp 0.5s ease-out' }}>
        <div style={{ fontSize: '6rem', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>404</div>
        <h2 style={{ color: 'var(--surface-200)', marginBottom: '8px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--surface-400)', marginBottom: '24px' }}>The page you are looking for does not exist or has been moved.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link to="/dashboard" className="btn btn-primary"><Home size={16} /> Dashboard</Link>
          <Link to="/search" className="btn btn-secondary"><Search size={16} /> Search</Link>
        </div>
      </div>
    </div>
  );
}
