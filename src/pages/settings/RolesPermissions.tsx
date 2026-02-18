import PageShell from '../../components/common/PageShell';
import { Plus } from 'lucide-react';

const modules = ['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Finance', 'WhatsApp Bot', 'Reports', 'Settings'];
const perms = ['View', 'Create', 'Edit', 'Delete', 'Export'];

export default function RolesPermissions() {
  return (
    <PageShell title="Roles & Permissions" subtitle="Permission groups and access control" breadcrumbs={[{ label: 'Settings' }, { label: 'Roles' }]} actions={<button className="btn btn-primary"><Plus size={16} /> New Role</button>}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Module</th>{perms.map((p) => <th key={p} style={{ textAlign: 'center' }}>{p}</th>)}</tr></thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m}>
                  <td style={{ fontWeight: 500, color: 'var(--surface-200)' }}>{m}</td>
                  {perms.map((p) => (
                    <td key={p} style={{ textAlign: 'center' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary-500)', width: 16, height: 16 }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
