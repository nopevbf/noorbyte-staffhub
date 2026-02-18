import { useParams } from 'react-router-dom';
import PageShell from '../../components/common/PageShell';
import FeatureCard from '../../components/common/FeatureCard';
import { Save, MapPin, Circle } from 'lucide-react';

export default function LocationForm() {
  const { id } = useParams();
  return (
    <PageShell title="Edit Location" subtitle={`Location #${id}`} breadcrumbs={[{ label: 'Settings' }, { label: 'Locations', to: '/settings/locations' }, { label: 'Edit' }]} actions={<button className="btn btn-primary"><Save size={16} /> Save</button>}>
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="grid grid-2" style={{ gap: '16px' }}>
          <div className="input-group"><label>Location Name</label><input className="input" defaultValue="Head Office" /></div>
          <div className="input-group"><label>Address</label><input className="input" defaultValue="Jl. Sudirman No. 123" /></div>
          <div className="input-group"><label>Latitude</label><input className="input" defaultValue="-6.2088" /></div>
          <div className="input-group"><label>Longitude</label><input className="input" defaultValue="106.8456" /></div>
          <div className="input-group"><label>Geofence Radius (meters)</label><input className="input" type="number" defaultValue="150" /></div>
        </div>
      </div>
      <div className="feature-list">
        <FeatureCard icon={MapPin} title="Map Picker" description="Click on map to set coordinates" />
        <FeatureCard icon={Circle} title="Radius Visualizer" description="Visual circle on map showing geofence" />
      </div>
    </PageShell>
  );
}
