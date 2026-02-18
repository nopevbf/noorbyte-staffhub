import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Moon } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Header({ collapsed, onToggle }: HeaderProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className={`app-header ${collapsed ? 'collapsed' : ''}`}>
      <div className="header-left">
        <button className="toggle-btn" onClick={onToggle} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <form onSubmit={handleSearch} className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search employees, transactions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="shortcut">Ctrl+K</span>
        </form>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" aria-label="Toggle theme">
          <Moon size={20} />
        </button>
        <button className="header-icon-btn" aria-label="Notifications" onClick={() => navigate('/notifications')}>
          <Bell size={20} />
          <span className="notification-dot" />
        </button>
        <div className="header-avatar" onClick={() => navigate('/settings/users')}>
          AD
        </div>
      </div>
    </header>
  );
}
