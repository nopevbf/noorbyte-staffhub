import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { UserPlus, Filter, Download, SortAsc, Users, Search } from 'lucide-react';

export default function EmployeeList() {
  const employees = [
    { id: 'E001', name: 'Ahmad Fauzi', department: 'Engineering', position: 'Sr. Developer', status: 'Active' },
    { id: 'E002', name: 'Siti Nurbaya', department: 'HR', position: 'HR Manager', status: 'Active' },
    { id: 'E003', name: 'Budi Santoso', department: 'Finance', position: 'Accountant', status: 'Active' },
    { id: 'E004', name: 'Dewi Lestari', department: 'Marketing', position: 'Content Lead', status: 'On Leave' },
    { id: 'E005', name: 'Rizki Pratama', department: 'Engineering', position: 'Jr. Developer', status: 'Active' },
  ];

  return (
    <PageShell
      title="Employees"
      subtitle="Manage all employee records"
      breadcrumbs={[{ label: 'Employees' }]}
      actions={<button className="btn btn-primary"><UserPlus size={16} /> Add Employee</button>}
    >
      <div className="feature-list" style={{ marginBottom: '24px' }}>
        <FeatureCard icon={Filter} title="Smart Filters" description="Filter by department, status, position" />
        <FeatureCard icon={SortAsc} title="Sort & Group" description="Sort by name, date, department" />
        <FeatureCard icon={Download} title="Export" description="Export to Excel, CSV, PDF" />
        <FeatureCard icon={Users} title="Bulk Actions" description="Bulk update, archive, delete" />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-800)', padding: '8px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-700)' }}>
            <Search size={14} style={{ color: 'var(--surface-500)' }} />
            <input placeholder="Search employees..." style={{ background: 'transparent', border: 'none', color: 'var(--surface-200)', outline: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }} />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--surface-400)' }}>{employees.length} employees</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Department</th><th>Position</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td style={{ color: 'var(--surface-500)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{e.id}</td>
                  <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{e.name}</td>
                  <td>{e.department}</td>
                  <td>{e.position}</td>
                  <td><span className={`badge ${e.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
