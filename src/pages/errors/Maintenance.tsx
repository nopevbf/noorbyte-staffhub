import { Wrench } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="auth-layout" style={{ textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <Wrench size={64} style={{ color: 'var(--warning)', marginBottom: '16px' }} />
        <h2 style={{ color: 'var(--surface-200)', marginBottom: '8px' }}>Under Maintenance</h2>
        <p style={{ color: 'var(--surface-400)', marginBottom: '24px' }}>We're performing scheduled maintenance. We'll be back shortly.</p>
        <div style={{ background: 'var(--surface-800)', borderRadius: 'var(--radius-md)', padding: '12px 20px', color: 'var(--surface-300)', fontSize: '0.85rem' }}>Estimated downtime: <strong>30 minutes</strong></div>
      </div>
    </div>
  );
}
