import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { MessageSquare, User, Clock } from 'lucide-react';

export default function ConversationDetail() {
  const { sessionId } = useParams();
  return (
    <PageShell title="Conversation Detail" subtitle={`Session #${sessionId}`} breadcrumbs={[{ label: 'WhatsApp Bot' }, { label: 'Logs', to: '/bot/logs' }, { label: `#${sessionId}` }]}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[{ from: 'user', msg: 'Saya mau check in', time: '08:01' },{ from: 'bot', msg: 'Silakan kirim lokasi Anda untuk check in.', time: '08:01' },{ from: 'user', msg: '📍 Location shared', time: '08:02' },{ from: 'bot', msg: '✅ Check in berhasil! Lokasi valid. Waktu: 08:02 WIB', time: '08:02' }].map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'bot' ? 'flex-start' : 'flex-end' }}>
              <div style={{ maxWidth: '60%', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: m.from === 'bot' ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface-700)', border: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--surface-200)' }}>{m.msg}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--surface-500)' }}>{m.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={MessageSquare} title="Full Thread" description="Complete conversation history" />
        <FeatureCard icon={User} title="Employee Context" description="Linked employee information" />
        <FeatureCard icon={Clock} title="Timeline" description="Conversation timestamps" />
      </div>
    </PageShell>
  );
}
