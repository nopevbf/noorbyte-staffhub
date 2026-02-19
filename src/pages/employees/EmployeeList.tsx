import { useEffect, useState } from "react";
import PageShell from "../../components/common/PageShell";
import FeatureCard from "../../components/common/FeatureCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  defaultEmployees,
  Employee,
  getStoredEmployees,
  saveStoredEmployees,
} from "./employeeStorage";
import {
  UserPlus,
  Filter,
  Download,
  SortAsc,
  Users,
  Search,
} from "lucide-react";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState<Employee[]>(() =>
    getStoredEmployees(defaultEmployees),
  );
  const [showCreatedNotice, setShowCreatedNotice] = useState(false);

  useEffect(() => {
    if (searchParams.get("created") !== "1") {
      return;
    }

    setShowCreatedNotice(true);
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    saveStoredEmployees(employees);
  }, [employees]);

  return (
    <PageShell
      title="Employees"
      subtitle="Manage all employee records"
      breadcrumbs={[{ label: "Employees" }]}
      actions={
        <button
          className="btn btn-primary"
          onClick={() => navigate("/employees/new")}
        >
          <UserPlus size={16} /> Add Employee
        </button>
      }
    >
      {showCreatedNotice && (
        <div
          className="card card-sm"
          style={{
            marginBottom: "16px",
            borderColor: "rgba(16, 185, 129, 0.35)",
            background: "rgba(16, 185, 129, 0.08)",
            color: "var(--success)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span>Employee berhasil ditambahkan.</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowCreatedNotice(false)}
          >
            Tutup
          </button>
        </div>
      )}

      <div className="feature-list" style={{ marginBottom: "24px" }}>
        <FeatureCard
          icon={Filter}
          title="Smart Filters"
          description="Filter by department, status, position"
        />
        <FeatureCard
          icon={SortAsc}
          title="Sort & Group"
          description="Sort by name, date, department"
        />
        <FeatureCard
          icon={Download}
          title="Export"
          description="Export to Excel, CSV, PDF"
        />
        <FeatureCard
          icon={Users}
          title="Bulk Actions"
          description="Bulk update, archive, delete"
        />
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--surface-800)",
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--surface-700)",
            }}
          >
            <Search size={14} style={{ color: "var(--surface-500)" }} />
            <input
              placeholder="Search employees..."
              style={{
                background: "transparent",
                border: "none",
                color: "var(--surface-200)",
                outline: "none",
                fontSize: "0.85rem",
                fontFamily: "var(--font-sans)",
              }}
            />
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--surface-400)" }}>
            {employees.length} employees
          </span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td
                    style={{
                      color: "var(--surface-500)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {e.id}
                  </td>
                  <td style={{ fontWeight: 500, color: "var(--surface-200)" }}>
                    {e.name}
                  </td>
                  <td>{e.department}</td>
                  <td>{e.position}</td>
                  <td>
                    <span
                      className={`badge ${e.status === "Active" ? "badge-success" : e.status === "Probation" ? "badge-info" : "badge-warning"}`}
                    >
                      {e.status}
                    </span>
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
