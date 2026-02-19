import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import {
  Save,
  User,
  Briefcase,
  Wallet,
  FileText,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  addStoredEmployee,
  defaultEmployees,
  getNextEmployeeId,
  getStoredEmployees,
} from "./employeeStorage";
import type { EmployeeStatus } from "./employeeStorage";

const steps = [
  { icon: User, label: "Personal" },
  { icon: Briefcase, label: "Employment" },
  { icon: Wallet, label: "Salary" },
  { icon: FileText, label: "Documents" },
];

type AddEmployeeForm = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  ktp: string;
  employeeId: string;
  department: string;
  position: string;
  employmentType: string;
  status: EmployeeStatus;
  joinDate: string;
  workLocation: string;
  basicSalary: string;
  paymentType: string;
  bankName: string;
  bankAccountNumber: string;
  accountHolderName: string;
  taxStatus: string;
  npwp: string;
  bpjsHealth: string;
  bpjsEmployment: string;
  notes: string;
};

function createInitialForm(): AddEmployeeForm {
  const employees = getStoredEmployees(defaultEmployees);

  return {
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "Male",
    ktp: "",
    employeeId: getNextEmployeeId(employees),
    department: "Engineering",
    position: "",
    employmentType: "Permanent",
    status: "Active",
    joinDate: "",
    workLocation: "",
    basicSalary: "",
    paymentType: "Monthly",
    bankName: "",
    bankAccountNumber: "",
    accountHolderName: "",
    taxStatus: "TK/0",
    npwp: "",
    bpjsHealth: "",
    bpjsEmployment: "",
    notes: "",
  };
}

export default function AddEmployee() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<AddEmployeeForm>(createInitialForm);
  const [isSaved, setIsSaved] = useState(false);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const isFormValid = form.name.trim() !== "" && form.position.trim() !== "";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveEmployee = () => {
    if (!isFormValid) {
      return;
    }

    const currentEmployees = getStoredEmployees(defaultEmployees);
    const employeeId =
      form.employeeId.trim() || getNextEmployeeId(currentEmployees);

    addStoredEmployee(
      {
        id: employeeId,
        name: form.name.trim(),
        department: form.department,
        position: form.position.trim(),
        status: form.status,
      },
      defaultEmployees,
    );

    setIsSaved(true);
    window.setTimeout(() => {
      navigate("/employees?created=1");
    }, 700);
  };

  return (
    <PageShell
      title="Add Employee"
      subtitle="Onboard a new employee with step-by-step form"
      breadcrumbs={[{ label: "Employees", to: "/employees" }, { label: "New" }]}
    >
      <div style={{ display: "flex", gap: "4px", marginBottom: "28px" }}>
        {steps.map((step, index) => {
          const isActive = activeStep === index;

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setActiveStep(index)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                background: isActive
                  ? "rgba(99, 102, 241, 0.1)"
                  : "rgba(15, 23, 42, 0.4)",
                border: `1px solid ${isActive ? "rgba(99, 102, 241, 0.3)" : "var(--glass-border)"}`,
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isActive
                    ? "var(--primary-600)"
                    : "var(--surface-700)",
                  color: isActive ? "white" : "var(--surface-400)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: isActive ? "var(--primary-400)" : "var(--surface-400)",
                }}
              >
                {step.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="card">
        {activeStep === 0 && (
          <>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--surface-200)",
                marginBottom: "20px",
              }}
            >
              Personal Information
            </h3>
            <div className="grid grid-2" style={{ gap: "16px" }}>
              <div className="input-group">
                <label>Full Name *</label>
                <input
                  className="input"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="email@company.com"
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  className="input"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="+62 xxx"
                />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input
                  className="input"
                  type="date"
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select
                  className="input"
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="input-group">
                <label>National ID (KTP)</label>
                <input
                  className="input"
                  name="ktp"
                  value={form.ktp}
                  onChange={handleInputChange}
                  placeholder="16 digit number"
                />
              </div>
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--surface-200)",
                marginBottom: "20px",
              }}
            >
              Employment Information
            </h3>
            <div className="grid grid-2" style={{ gap: "16px" }}>
              <div className="input-group">
                <label>Employee ID</label>
                <input
                  className="input"
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleInputChange}
                  placeholder="e.g. E006"
                />
              </div>
              <div className="input-group">
                <label>Department</label>
                <select
                  className="input"
                  name="department"
                  value={form.department}
                  onChange={handleInputChange}
                >
                  <option>Engineering</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                </select>
              </div>
              <div className="input-group">
                <label>Position *</label>
                <input
                  className="input"
                  name="position"
                  value={form.position}
                  onChange={handleInputChange}
                  placeholder="Job title"
                />
              </div>
              <div className="input-group">
                <label>Employment Type</label>
                <select
                  className="input"
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleInputChange}
                >
                  <option>Permanent</option>
                  <option>Contract</option>
                  <option>Probation</option>
                  <option>Internship</option>
                </select>
              </div>
              <div className="input-group">
                <label>Status</label>
                <select
                  className="input"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                >
                  <option>Active</option>
                  <option>Probation</option>
                  <option>On Leave</option>
                </select>
              </div>
              <div className="input-group">
                <label>Join Date</label>
                <input
                  className="input"
                  type="date"
                  name="joinDate"
                  value={form.joinDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Work Location</label>
                <input
                  className="input"
                  name="workLocation"
                  value={form.workLocation}
                  onChange={handleInputChange}
                  placeholder="Office / Branch"
                />
              </div>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--surface-200)",
                marginBottom: "20px",
              }}
            >
              Salary Information
            </h3>
            <div className="grid grid-2" style={{ gap: "16px" }}>
              <div className="input-group">
                <label>Basic Salary</label>
                <input
                  className="input"
                  type="number"
                  name="basicSalary"
                  value={form.basicSalary}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div className="input-group">
                <label>Payment Type</label>
                <select
                  className="input"
                  name="paymentType"
                  value={form.paymentType}
                  onChange={handleInputChange}
                >
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="input-group">
                <label>Bank Name</label>
                <input
                  className="input"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleInputChange}
                  placeholder="Bank name"
                />
              </div>
              <div className="input-group">
                <label>Bank Account Number</label>
                <input
                  className="input"
                  name="bankAccountNumber"
                  value={form.bankAccountNumber}
                  onChange={handleInputChange}
                  placeholder="Account number"
                />
              </div>
              <div className="input-group">
                <label>Account Holder Name</label>
                <input
                  className="input"
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="As per bank account"
                />
              </div>
              <div className="input-group">
                <label>Tax Status (PTKP)</label>
                <select
                  className="input"
                  name="taxStatus"
                  value={form.taxStatus}
                  onChange={handleInputChange}
                >
                  <option>TK/0</option>
                  <option>K/0</option>
                  <option>K/1</option>
                  <option>K/2</option>
                  <option>K/3</option>
                </select>
              </div>
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--surface-200)",
                marginBottom: "20px",
              }}
            >
              Documents
            </h3>
            <div className="grid grid-2" style={{ gap: "16px" }}>
              <div className="input-group">
                <label>KTP Number</label>
                <input
                  className="input"
                  name="ktp"
                  value={form.ktp}
                  onChange={handleInputChange}
                  placeholder="16 digit number"
                />
              </div>
              <div className="input-group">
                <label>NPWP Number</label>
                <input
                  className="input"
                  name="npwp"
                  value={form.npwp}
                  onChange={handleInputChange}
                  placeholder="NPWP number"
                />
              </div>
              <div className="input-group">
                <label>BPJS Kesehatan</label>
                <input
                  className="input"
                  name="bpjsHealth"
                  value={form.bpjsHealth}
                  onChange={handleInputChange}
                  placeholder="BPJS number"
                />
              </div>
              <div className="input-group">
                <label>BPJS Ketenagakerjaan</label>
                <input
                  className="input"
                  name="bpjsEmployment"
                  value={form.bpjsEmployment}
                  onChange={handleInputChange}
                  placeholder="BPJS number"
                />
              </div>
              <div className="input-group">
                <label>Contract File</label>
                <input className="input" type="file" />
              </div>
              <div className="input-group">
                <label>Additional Notes</label>
                <input
                  className="input"
                  name="notes"
                  value={form.notes}
                  onChange={handleInputChange}
                  placeholder="Optional notes"
                />
              </div>
            </div>
          </>
        )}

        {!isFormValid && (
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.82rem",
              color: "var(--warning)",
            }}
          >
            Full Name dan Position wajib diisi sebelum Save Employee.
          </p>
        )}

        {isSaved && (
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.84rem",
              color: "var(--success)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <CheckCircle2 size={16} /> Employee berhasil disimpan, mengarahkan
            ke list...
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "24px",
          }}
        >
          <div>
            {!isFirstStep && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => navigate("/employees")}
              disabled={isSaved}
            >
              Cancel
            </button>
            {!isLastStep ? (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                Save & Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSaveEmployee}
                disabled={!isFormValid || isSaved}
              >
                <Save size={16} /> Save Employee
              </button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
