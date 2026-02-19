import PageShell from "../../components/common/PageShell";
import { Plus } from "lucide-react";

export default function Templates() {
  return (
    <PageShell
      title="Template Messages"
      subtitle="WhatsApp message templates with variables"
      breadcrumbs={[{ label: "WhatsApp Bot" }, { label: "Templates" }]}
      actions={
        <button className="btn btn-primary">
          <Plus size={16} /> New Template
        </button>
      }
    >
      <div className="grid grid-2">
        {[
          {
            n: "Payslip Notification",
            vars: ["name", "period", "amount"],
            s: "Approved",
          },
          {
            n: "Leave Reminder",
            vars: ["name", "date", "type"],
            s: "Approved",
          },
          { n: "Attendance Alert", vars: ["name", "status"], s: "Pending" },
          { n: "Company Announcement", vars: ["title", "body"], s: "Approved" },
        ].map((t) => (
          <div key={t.n} className="card" style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <h4 style={{ fontWeight: 600, color: "var(--surface-200)" }}>
                {t.n}
              </h4>
              <span
                className={`badge ${t.s === "Approved" ? "badge-success" : "badge-warning"}`}
              >
                {t.s}
              </span>
            </div>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {t.vars.map((v) => (
                <span
                  key={v}
                  style={{
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    background: "var(--surface-800)",
                    borderRadius: "4px",
                    color: "var(--primary-400)",
                    fontFamily: "var(--font-mono)",
                  }}
                >{`{{${v}}}`}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
