import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageShellProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageShell({ title, subtitle, breadcrumbs, actions, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <div className="page-header">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="breadcrumb">
            <Link to="/dashboard">Home</Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <ChevronRight size={12} className="separator" />
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <div className="page-title-row">
          <h1>{title}</h1>
          {actions && <div className="page-actions">{actions}</div>}
        </div>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
