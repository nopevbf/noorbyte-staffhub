import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import {
  Users, Clock, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  UserPlus, ClipboardList, DollarSign, AlertCircle
} from 'lucide-react';

import { useDashboardStats } from '@/hooks/useDashboard';
import { useFinanceStats } from '@/hooks/useFinance';

export default function DashboardHome() {
  const { data: dashboardStats, isLoading: loadingDash } = useDashboardStats();
  const { data: financeStats, isLoading: loadingFin } = useFinanceStats();

  const isLoading = loadingDash || loadingFin;

  // Derived values
  const presentCount = dashboardStats ? Math.round(dashboardStats.totalEmployees * (dashboardStats.attendanceRate / 100)) : 0;
  const attendanceRate = dashboardStats?.attendanceRate || 0;
  const totalEmployees = dashboardStats?.totalEmployees || 0;
  const payrollStatus = dashboardStats?.lastPayrollStatus || 'On Track';
  const revenue = financeStats?.totalIncome || 0;

  return (
    <PageShell title="Dashboard" subtitle="Welcome back! Here's your business overview.">
      {/* Stat Cards */}
      <div className="grid grid-4" style={{ marginBottom: '28px' }}>
        <div className="stat-card">
          <div className="stat-icon primary"><Users size={22} /></div>
          <div className="stat-content">
            <h3>Total Employees</h3>
            <div className="stat-value">{isLoading ? '...' : totalEmployees}</div>
            <div className="stat-change up"><ArrowUpRight size={14} /> +12 this month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><Clock size={22} /></div>
          <div className="stat-content">
            <h3>Present Today</h3>
            <div className="stat-value">{isLoading ? '...' : presentCount}</div>
            <div className="stat-change up"><ArrowUpRight size={14} /> {attendanceRate}% rate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><Wallet size={22} /></div>
          <div className="stat-content">
            <h3>Payroll Status</h3>
            <div className="stat-value" style={{ fontSize: '1.2rem' }}>{isLoading ? '...' : payrollStatus}</div>
            <div className="stat-change down"><ArrowDownRight size={14} /> {dashboardStats?.pendingLeaves || 0} Leaves Pending</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info"><TrendingUp size={22} /></div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <div className="stat-value" style={{ fontSize: '1.2rem' }}>{isLoading ? '...' : `Rp ${revenue.toLocaleString()}`}</div>
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
