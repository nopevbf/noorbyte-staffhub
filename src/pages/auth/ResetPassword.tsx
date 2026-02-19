import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { resetPassword } from "../../auth/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("token") ?? "";
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSuccess(false);

    if (!token) {
      setErrorMessage(
        "Reset token is missing. Please use the link from your email.",
      );
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Password confirmation does not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword(token, newPassword);

    if (!result.ok) {
      setErrorMessage(result.message ?? "Failed to reset password.");
      setIsSubmitting(false);
      return;
    }

    setIsSuccess(true);
    setIsSubmitting(false);
    setNewPassword("");
    setConfirmPassword("");

    window.setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
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
        <h2>Set New Password</h2>
        <p className="subtitle">Create a strong password for your account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              className="input"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          {errorMessage && (
            <p style={{ color: "var(--danger-500)", fontSize: "0.85rem" }}>
              {errorMessage}
            </p>
          )}
          {isSuccess && (
            <p style={{ color: "var(--success)", fontSize: "0.85rem" }}>
              Password reset successful. You can now sign in.
            </p>
          )}
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={isSubmitting}
          >
            <Lock size={18} />
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
