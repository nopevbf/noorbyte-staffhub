import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <div className={`app-main ${collapsed ? 'collapsed' : ''}`}>
        <Header collapsed={collapsed} onToggle={toggle} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
