import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Download, Upload, Clock, HardDrive } from 'lucide-react';

export default function BackupExport() {
  return (
    <PageShell title="Backup & Export" subtitle="Data management, manual/auto backup, and restore" breadcrumbs={[{ label: 'Settings' }, { label: 'Backup' }]}>
      <div className="grid grid-3" style={{ marginBottom: '24px' }}>
        <div className="stat-card"><div className="stat-icon success"><HardDrive size={22} /></div><div className="stat-content"><h3>Last Backup</h3><div className="stat-value" style={{ fontSize: '1rem' }}>Today 03:00</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><HardDrive size={22} /></div><div className="stat-content"><h3>DB Size</h3><div className="stat-value" style={{ fontSize: '1rem' }}>2.4 GB</div></div></div>
        <div className="stat-card"><div className="stat-icon info"><Clock size={22} /></div><div className="stat-content"><h3>Schedule</h3><div className="stat-value" style={{ fontSize: '1rem' }}>Daily 03:00</div></div></div>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button className="btn btn-primary"><Download size={16} /> Backup Now</button>
        <button className="btn btn-secondary"><Upload size={16} /> Restore</button>
      </div>
      <div className="feature-list">
        <FeatureCard icon={Download} title="Manual Backup" description="Trigger backup on demand" />
        <FeatureCard icon={Clock} title="Auto-Schedule" description="Configure automatic backup schedule" />
        <FeatureCard icon={Upload} title="Restore" description="Restore from previous backup" />
      </div>
    </PageShell>
  );
}
