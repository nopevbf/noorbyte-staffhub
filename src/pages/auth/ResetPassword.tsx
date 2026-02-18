import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function ResetPassword() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">N</div>
          <h1>Noor<span>Byte</span></h1>
        </div>
        <h2>Set New Password</h2>
        <p className="subtitle">Create a strong password for your account</p>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>New Password</label>
            <input className="input" type="password" placeholder="Enter new password" />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input className="input" type="password" placeholder="Confirm new password" />
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            <Lock size={18} />
            Reset Password
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
