import { useEffect, useState } from "react";
import PageShell from "../../components/common/PageShell";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultEmployees, getStoredEmployees } from "./employeeStorage";
import type { Employee } from "./employeeStorage";
import {
  UserPlus,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  Pencil,
} from "lucide-react";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState<Employee[]>(() =>
    getStoredEmployees(defaultEmployees),
  );
  const [showCreatedNotice, setShowCreatedNotice] = useState(false);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (searchParams.get("created") !== "1") {
      return;
    }

    setEmployees(getStoredEmployees(defaultEmployees));
    setShowCreatedNotice(true);
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  const departments = Array.from(
    new Set(employees.map((item) => item.department)),
  );

  const filteredEmployees = employees.filter((employee) => {
    const normalizedQuery = query.toLowerCase().trim();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      employee.name.toLowerCase().includes(normalizedQuery) ||
      employee.id.toLowerCase().includes(normalizedQuery);
    const matchesDepartment =
      department === "all" || employee.department === department;
    const matchesStatus = status === "all" || employee.status === status;

    return matchesQuery && matchesDepartment && matchesStatus;
  });

  const getBadgeClassName = (employeeStatus: Employee["status"]) => {
    if (employeeStatus === "Active") {
      return "active";
    }

    if (employeeStatus === "Probation") {
      return "probation";
    }

    return "leave";
  };

  const getJoinDate = (id: string) => {
    const serial = Number(id.replace("E", ""));
    const safeSerial = Number.isNaN(serial) ? 1 : serial;
    const day = ((safeSerial * 7) % 28) + 1;
    const month = ((safeSerial * 3) % 12) + 1;
    const year = 2020 + (safeSerial % 5);
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  };

  const getEmail = (name: string) =>
    `${name.toLowerCase().replace(/\s+/g, ".")}@company.com`;

  const renderAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return <span className="avatar-fallback">{initials}</span>;
  };

  return (
    <PageShell
      title="Daftar Karyawan"
      subtitle="Manage your employee data and access."
      breadcrumbs={[{ label: "Employees" }]}
      actions={
        <button
          className="btn btn-primary"
          onClick={() => navigate("/employees/new")}
        >
          <UserPlus size={16} /> Tambah Karyawan
        </button>
      }
    >
      {showCreatedNotice && (
        <div className="employee-created-notice">
          <span>Employee berhasil ditambahkan.</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowCreatedNotice(false)}
          >
            Tutup
          </button>
        </div>
      )}

      <section className="employee-v2 card">
        <div className="employee-toolbar">
          <div className="filters-wrap">
            <label className="search-input" htmlFor="employee-search">
              <Search size={16} />
              <input
                id="employee-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name or ID..."
              />
            </label>

            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Probation">Probation</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-secondary employee-export-btn"
          >
            <Download size={16} /> Export
          </button>
        </div>

        <div className="employee-table-wrap">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Karyawan</th>
                <th>ID Karyawan</th>
                <th>Departemen</th>
                <th>Posisi</th>
                <th>Tgl Bergabung</th>
                <th className="align-center">Status</th>
                <th className="align-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="avatar">
                        {renderAvatar(employee.name)}
                      </div>
                      <div>
                        <p>{employee.name}</p>
                        <small>{getEmail(employee.name)}</small>
                      </div>
                    </div>
                  </td>
                  <td className="mono">EMP-{employee.id.replace("E", "")}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{getJoinDate(employee.id)}</td>
                  <td className="align-center">
                    <span
                      className={`status-badge ${getBadgeClassName(employee.status)}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="align-right">
                    <div className="row-actions">
                      <button
                        type="button"
                        onClick={() => navigate(`/employees/${employee.id}`)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/bot/broadcast")}
                      >
                        <MessageCircle size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/employees/${employee.id}/edit`)
                        }
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-row">
                    Tidak ada data karyawan yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="employee-pagination">
          <p>
            Showing{" "}
            <strong>
              {filteredEmployees.length === 0 ? 0 : 1}-
              {filteredEmployees.length}
            </strong>{" "}
            of <strong>{employees.length}</strong> results
          </p>
          <div className="pager-btns">
            <button type="button" aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            <button type="button" className="active">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button" aria-label="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
