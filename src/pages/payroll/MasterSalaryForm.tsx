import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import { Save } from 'lucide-react';

export default function MasterSalaryForm() {
  const { id } = useParams();
  return (
    <PageShell title="Edit Salary Structure" subtitle={`Editing salary structure #${id}`} breadcrumbs={[{ label: 'Payroll' }, { label: 'Master Salary', to: '/payroll/master-salary' }, { label: 'Edit' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Component Name</label><input className="input" defaultValue="Base Salary" /></div>
          <div className="input-group"><label>Type</label><select className="input"><option>Earning</option><option>Allowance</option><option>Deduction</option></select></div>
          <div className="input-group"><label>Default Amount</label><input className="input" defaultValue="8000000" type="number" /></div>
          <div className="input-group"><label>Taxable</label><select className="input"><option>Yes</option><option>No</option></select></div>
        </div>
      </div>
    </PageShell>
  );
}
