import PageShell from "../../components/common/PageShell";
import { Link2, CreditCard, FileText, CloudCog } from "lucide-react";

export default function Integrations() {
  const integrations = [
    {
      n: "Bank API",
      d: "Connect to BCA, Mandiri for payroll transfers",
      status: "Connected",
      i: CreditCard,
      color: "var(--success)",
    },
    {
      n: "Accounting Software",
      d: "Sync with Jurnal or Accurate Online",
      status: "Not Connected",
      i: FileText,
      color: "var(--surface-500)",
    },
    {
      n: "e-Filing (DJP)",
      d: "Export tax data to DJP Online",
      status: "Connected",
      i: CloudCog,
      color: "var(--success)",
    },
  ];
  return (
    <PageShell
      title="Integrations"
      subtitle="Third-party service connections"
      breadcrumbs={[{ label: "Settings" }, { label: "Integrations" }]}
    >
      <div className="grid grid-2">
        {integrations.map((int) => (
          <div
            key={int.n}
            className="card"
            style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
          >
            <div className="stat-icon primary">
              <int.i size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <h4 style={{ fontWeight: 600, color: "var(--surface-200)" }}>
                  {int.n}
                </h4>
                <span
                  className={`badge ${int.status === "Connected" ? "badge-success" : "badge-warning"}`}
                >
                  {int.status}
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--surface-400)" }}>
                {int.d}
              </p>
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginTop: "8px" }}
              >
                <Link2 size={14} />{" "}
                {int.status === "Connected" ? "Configure" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
