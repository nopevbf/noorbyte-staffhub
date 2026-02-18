import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import { Save } from 'lucide-react';

export default function MasterDeductionForm() {
  const { id } = useParams();
  return (
    <PageShell title="Edit Deduction Rules" subtitle={`Editing deduction rule #${id}`} breadcrumbs={[{ label: 'Payroll' }, { label: 'Master Deduction', to: '/payroll/master-deduction' }, { label: 'Edit' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Deduction Name</label><input className="input" defaultValue="BPJS Kesehatan" /></div>
          <div className="input-group"><label>Type</label><select className="input"><option>Mandatory</option><option>Tax</option><option>Custom</option></select></div>
          <div className="input-group"><label>Calculation Method</label><select className="input"><option>Percentage</option><option>Fixed Amount</option><option>Formula</option></select></div>
          <div className="input-group"><label>Rate / Amount</label><input className="input" defaultValue="1" /></div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Condition (optional)</label><input className="input" placeholder="e.g. salary > 5000000" /></div>
        </div>
      </div>
    </PageShell>
  );
}
