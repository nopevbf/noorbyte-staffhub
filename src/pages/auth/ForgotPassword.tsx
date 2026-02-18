import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">N</div>
          <h1>Noor<span>Byte</span></h1>
        </div>
        <h2>Reset Password</h2>
        <p className="subtitle">Enter your email to receive a password reset link</p>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Email Address</label>
            <input className="input" type="email" placeholder="admin@noorbyte.com" />
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            <Mail size={18} />
            Send Reset Link
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
