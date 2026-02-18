import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Save, Eye, Sliders } from 'lucide-react';

export default function MasterOvertimeForm() {
  const { id } = useParams();
  return (
    <PageShell title="Edit OT Rules" subtitle={`Editing overtime rule #${id}`} breadcrumbs={[{ label: 'Payroll' }, { label: 'Master Overtime', to: '/payroll/master-overtime' }, { label: 'Edit' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Rule Name</label><input className="input" defaultValue="Weekday OT" /></div>
          <div className="input-group"><label>Day Type</label><select className="input"><option>Regular</option><option>Weekend</option><option>Holiday</option></select></div>
          <div className="input-group"><label>First Hour Multiplier</label><input className="input" defaultValue="1.5" type="number" step="0.1" /></div>
          <div className="input-group"><label>Subsequent Hours Multiplier</label><input className="input" defaultValue="2.0" type="number" step="0.1" /></div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Sliders} title="Visual Rule Builder" description="Drag-and-drop rule configuration" />
        <FeatureCard icon={Eye} title="Preview Calculation" description="See how the rule affects payroll" />
      </div>
    </PageShell>
  );
}
