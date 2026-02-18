import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import { Save } from 'lucide-react';

export default function UserForm() {
  const { id } = useParams();
  return (
    <PageShell title={id === 'new' ? 'Add User' : 'Edit User'} subtitle={id === 'new' ? 'Create new admin account' : `Editing user #${id}`} breadcrumbs={[{ label: 'Settings' }, { label: 'Users', to: '/settings/users' }, { label: id === 'new' ? 'New' : 'Edit' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Full Name</label><input className="input" placeholder="Full name" /></div>
          <div className="input-group"><label>Email</label><input className="input" type="email" placeholder="email@company.com" /></div>
          <div className="input-group"><label>Role</label><select className="input"><option>Super Admin</option><option>HR Admin</option><option>Finance</option><option>Manager</option></select></div>
          <div className="input-group"><label>Branch Access</label><select className="input"><option>All Branches</option><option>Head Office</option></select></div>
        </div>
      </div>
    </PageShell>
  );
}
