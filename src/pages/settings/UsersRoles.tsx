import PageShell from "../../components/common/PageShell";
import { Plus } from "lucide-react";

export default function UsersRoles() {
  return (
    <PageShell
      title="Users & Roles"
      subtitle="Admin accounts and role-based access"
      breadcrumbs={[{ label: "Settings" }, { label: "Users" }]}
      actions={
        <button className="btn btn-primary">
          <Plus size={16} /> Add User
        </button>
      }
    >
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Branch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  n: "Admin User",
                  e: "admin@noorbyte.com",
                  r: "Super Admin",
                  b: "All",
                  s: "Active",
                },
                {
                  n: "HR Manager",
                  e: "hr@noorbyte.com",
                  r: "HR Admin",
                  b: "Head Office",
                  s: "Active",
                },
                {
                  n: "Finance Staff",
                  e: "finance@noorbyte.com",
                  r: "Finance",
                  b: "Head Office",
                  s: "Active",
                },
              ].map((u, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {u.n}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {u.e}
                  </td>
                  <td>
                    <span className="badge badge-primary">{u.r}</span>
                  </td>
                  <td>{u.b}</td>
                  <td>
                    <span className="badge badge-success">{u.s}</span>
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
