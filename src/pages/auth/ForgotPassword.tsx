import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState } from "react";
import { requestPasswordReset } from "../../auth/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("admin@noorbyte.com");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSuccess(false);

    const result = await requestPasswordReset(email);

    if (!result.ok) {
      setErrorMessage(result.message ?? "Failed to send reset link");
      setIsSubmitting(false);
      return;
    }

    setIsSuccess(true);
    setIsSubmitting(false);
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
        <h2>Reset Password</h2>
        <p className="subtitle">
          Enter your email to receive a password reset link
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              className="input"
              type="email"
              placeholder="admin@noorbyte.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
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
              If the email exists, a reset link has been sent.
            </p>
          )}
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={isSubmitting}
          >
            <Mail size={18} />
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
