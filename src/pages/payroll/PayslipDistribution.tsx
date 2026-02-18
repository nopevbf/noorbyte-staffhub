import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Send, Mail, MessageSquare, CheckCircle } from 'lucide-react';

export default function PayslipDistribution() {
  return (
    <PageShell title="Payslip Distribution" subtitle="Send payslips to employees via WhatsApp or Email" breadcrumbs={[{ label: 'Payroll' }, { label: 'Payslips' }]} actions={<button className="btn btn-primary"><Send size={16} /> Send All</button>}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><CheckCircle size={22} /></div><div className="stat-content"><h3>Delivered</h3><div className="stat-value">198</div></div></div>
        <div className="stat-card"><div className="stat-icon warning"><Send size={22} /></div><div className="stat-content"><h3>Pending</h3><div className="stat-value">50</div></div></div>
        <div className="stat-card"><div className="stat-icon danger"><Mail size={22} /></div><div className="stat-content"><h3>Failed</h3><div className="stat-value">0</div></div></div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={MessageSquare} title="Bulk WA" description="Send payslips via WhatsApp" />
        <FeatureCard icon={Mail} title="Bulk Email" description="Send payslips via email" />
        <FeatureCard icon={CheckCircle} title="Delivery Tracking" description="Track delivery status per employee" />
      </div>
    </PageShell>
  );
}
