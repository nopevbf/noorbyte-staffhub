import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import { Save } from 'lucide-react';

export default function CategoryForm() {
  const { id } = useParams();
  return (
    <PageShell title="Edit Category" subtitle={`Edit category #${id}`} breadcrumbs={[{ label: 'Finance' }, { label: 'Categories', to: '/finance/categories' }, { label: 'Edit' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card">
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Category Name</label><input className="input" defaultValue="Service Revenue" /></div>
          <div className="input-group"><label>Parent Category</label><select className="input"><option>Revenue</option><option>Expenses</option><option>Assets</option></select></div>
          <div className="input-group"><label>Color</label><input className="input" type="color" defaultValue="#10b981" /></div>
          <div className="input-group"><label>Budget (optional)</label><input className="input" type="number" placeholder="0" /></div>
        </div>
      </div>
    </PageShell>
  );
}
