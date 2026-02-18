import PageShell from '../../components/common/PageShell';
import { Save, Building, Upload } from 'lucide-react';

export default function CompanyProfile() {
  return (
    <PageShell title="Company Profile" subtitle="Business information and branding" breadcrumbs={[{ label: 'Settings' }, { label: 'Company' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 800 }}>N</div>
          <div><h3 style={{ color: 'var(--surface-200)', marginBottom: '4px' }}>Company Logo</h3><button className="btn btn-ghost btn-sm"><Upload size={14} /> Upload</button></div>
        </div>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Company Name</label><input className="input" defaultValue="PT NoorByte Technology" /></div>
          <div className="input-group"><label>Tax ID (NPWP)</label><input className="input" defaultValue="12.345.678.9-012.345" /></div>
          <div className="input-group"><label>Email</label><input className="input" defaultValue="info@noorbyte.com" /></div>
          <div className="input-group"><label>Phone</label><input className="input" defaultValue="+62 21 1234567" /></div>
          <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Address</label><textarea className="input" rows={2} defaultValue="Jl. Sudirman No. 123, Jakarta Selatan" style={{ resize: 'vertical' }} /></div>
        </div>
      </div>
    </PageShell>
  );
}
