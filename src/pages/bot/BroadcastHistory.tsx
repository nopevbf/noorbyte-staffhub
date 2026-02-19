import PageShell from "../../components/common/PageShell";

export default function BroadcastHistory() {
  return (
    <PageShell
      title="Broadcast History"
      subtitle="Past broadcast records and delivery stats"
      breadcrumbs={[
        { label: "WhatsApp Bot" },
        { label: "Broadcast", to: "/bot/broadcast" },
        { label: "History" },
      ]}
    >
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Template</th>
                <th>Recipients</th>
                <th>Delivered</th>
                <th>Read</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  d: "2026-02-15",
                  t: "Payslip Jan",
                  r: 248,
                  del: 245,
                  read: 198,
                  s: "Completed",
                },
                {
                  d: "2026-02-01",
                  t: "Company Update",
                  r: 248,
                  del: 248,
                  read: 230,
                  s: "Completed",
                },
              ].map((r, i) => (
                <tr key={i}>
                  <td>{r.d}</td>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {r.t}
                  </td>
                  <td>{r.r}</td>
                  <td>
                    <span style={{ color: "var(--success)" }}>{r.del}</span>
                  </td>
                  <td>{r.read}</td>
                  <td>
                    <span className="badge badge-success">{r.s}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
