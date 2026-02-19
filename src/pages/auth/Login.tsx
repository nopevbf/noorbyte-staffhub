import { Link, useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">N</div>
          <h1>
            Noor<span>Byte</span>
          </h1>
        </div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your StaffHub account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              className="input"
              type="email"
              placeholder="admin@noorbyte.com"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                style={{ width: "100%", paddingRight: "44px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--surface-500)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" type="submit">
            <LogIn size={18} />
            Sign In
          </button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <span style={{ color: "var(--surface-600)", fontSize: "0.85rem" }}>
            v2.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
