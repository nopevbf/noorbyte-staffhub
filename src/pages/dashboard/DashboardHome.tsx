import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import {
  Users, Clock, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  UserPlus, ClipboardList, DollarSign, AlertCircle
} from 'lucide-react';

export default function DashboardHome() {
  return (
    <PageShell title="Dashboard" subtitle="Welcome back! Here's your business overview.">
      {/* Stat Cards */}
      <div className="grid grid-4" style={{ marginBottom: '28px' }}>
        <div className="stat-card">
          <div className="stat-icon primary"><Users size={22} /></div>
          <div className="stat-content">
            <h3>Total Employees</h3>
            <div className="stat-value">248</div>
            <div className="stat-change up"><ArrowUpRight size={14} /> +12 this month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><Clock size={22} /></div>
          <div className="stat-content">
            <h3>Present Today</h3>
            <div className="stat-value">231</div>
            <div className="stat-change up"><ArrowUpRight size={14} /> 93.1% rate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><Wallet size={22} /></div>
          <div className="stat-content">
            <h3>Pending Payroll</h3>
            <div className="stat-value">Rp 847M</div>
            <div className="stat-change down"><ArrowDownRight size={14} /> Feb 2026</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info"><TrendingUp size={22} /></div>
          <div className="stat-content">
            <h3>Monthly Revenue</h3>
            <div className="stat-value">Rp 1.2B</div>
            <div className="stat-change up"><ArrowUpRight size={14} /> +8.3%</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--surface-200)', marginBottom: '16px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary"><UserPlus size={16} /> Add Employee</button>
          <button className="btn btn-secondary"><ClipboardList size={16} /> Manual Attendance</button>
          <button className="btn btn-secondary"><DollarSign size={16} /> Process Payroll</button>
          <button className="btn btn-secondary"><AlertCircle size={16} /> View Alerts</button>
        </div>
      </div>

      {/* Feature highlights */}
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--surface-200)', marginBottom: '4px' }}>
        Key Features
      </h3>
      <div className="feature-list">
        <FeatureCard icon={Users} title="Live Attendance" description="Real-time employee attendance monitoring with GPS tracking" />
        <FeatureCard icon={TrendingUp} title="Financial Snapshot" description="Cashflow overview, income vs expense trends" />
        <FeatureCard icon={Wallet} title="Payroll Status" description="Current period payroll processing status" />
        <FeatureCard icon={Clock} title="Overtime Alerts" description="Pending overtime approvals and notifications" />
      </div>
    </PageShell>
  );
}
