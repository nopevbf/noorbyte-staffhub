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
  CalendarDays,
  Mail,
  Phone,
  ImagePlus,
  Info,
  IdCard,
  Upload,
  FileCheck2,
  ReceiptText,
  Trash2,
  AlertCircle,
  Pencil,
} from "lucide-react";
import {
  addStoredEmployee,
  defaultEmployees,
  getNextEmployeeId,
  getStoredEmployees,
} from "./employeeStorage";
import type { EmployeeStatus } from "./employeeStorage";

const steps = [
  { icon: User, label: "Data Pribadi" },
  { icon: Briefcase, label: "Kepegawaian" },
  { icon: Wallet, label: "Konfigurasi Gaji" },
  { icon: FileText, label: "Dokumen" },
];

type AddEmployeeForm = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  ktp: string;
  employeeId: string;
  department: string;
  position: string;
  employmentType: string;
  status: EmployeeStatus;
  joinDate: string;
  workLocation: string;
  reportingManager: string;
  basicSalary: string;
  salaryCurrency: string;
  paymentType: string;
  transportAllowanceEnabled: boolean;
  transportAllowanceAmount: string;
  mealAllowanceEnabled: boolean;
  mealAllowanceAmount: string;
  positionAllowanceEnabled: boolean;
  positionAllowanceAmount: string;
  deductionBpjsHealth: boolean;
  deductionPension: boolean;
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
    maritalStatus: "",
    ktp: "",
    employeeId: getNextEmployeeId(employees),
    department: "Engineering",
    position: "",
    employmentType: "Permanent",
    status: "Active",
    joinDate: "",
    workLocation: "",
    reportingManager: "",
    basicSalary: "",
    salaryCurrency: "USD",
    paymentType: "Monthly",
    transportAllowanceEnabled: true,
    transportAllowanceAmount: "150",
    mealAllowanceEnabled: false,
    mealAllowanceAmount: "",
    positionAllowanceEnabled: false,
    positionAllowanceAmount: "",
    deductionBpjsHealth: true,
    deductionPension: false,
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
  const [documentFiles, setDocumentFiles] = useState({
    ktp: "",
    contract: "",
    npwp: "",
  });

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleDocumentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: "ktp" | "contract" | "npwp",
  ) => {
    const fileName = event.target.files?.[0]?.name ?? "";
    setDocumentFiles((previous) => ({
      ...previous,
      [key]: fileName,
    }));
  };

  const renderStepFields = () => {
    if (activeStep === 0) {
      return (
        <div className="aev2-form-grid">
          <div className="aev2-field full">
            <label htmlFor="name">Nama Lengkap *</label>
            <input
              id="name"
              className="input"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="contoh: Sarah Jenkins"
            />
          </div>

          <div className="aev2-field">
            <label htmlFor="ktp">Nomor Induk Kependudukan (NIK)</label>
            <input
              id="ktp"
              className="input"
              name="ktp"
              value={form.ktp}
              onChange={handleInputChange}
              placeholder="contoh: 317123456789"
            />
          </div>

          <div className="aev2-field aev2-with-icon">
            <label htmlFor="birthDate">Tanggal Lahir</label>
            <div className="aev2-input-icon-wrap">
              <CalendarDays size={16} />
              <input
                id="birthDate"
                className="input"
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="aev2-field">
            <label>Jenis Kelamin</label>
            <div className="aev2-radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={handleInputChange}
                />
                <span>Laki-laki</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleInputChange}
                />
                <span>Perempuan</span>
              </label>
            </div>
          </div>

          <div className="aev2-field">
            <label htmlFor="maritalStatus">Status Pernikahan</label>
            <select
              id="maritalStatus"
              className="input"
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleInputChange}
            >
              <option value="">Pilih status</option>
              <option value="single">Belum Menikah</option>
              <option value="married">Menikah</option>
              <option value="divorced">Cerai</option>
            </select>
          </div>

          <div className="aev2-field full aev2-with-icon">
            <label htmlFor="email">Alamat Email</label>
            <div className="aev2-input-icon-wrap">
              <Mail size={16} />
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="sarah.jenkins@acme.com"
              />
            </div>
          </div>

          <div className="aev2-field full aev2-with-icon">
            <label htmlFor="phone">Nomor Telepon</label>
            <div className="aev2-input-icon-wrap">
              <Phone size={16} />
              <input
                id="phone"
                className="input"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="+62 8xx xxxx xxxx"
              />
            </div>
          </div>
        </div>
      );
    }

    if (activeStep === 1) {
      return (
        <>
          <div className="aev2-form-grid">
            <div className="aev2-field">
              <label htmlFor="department">
                Departemen <span className="required">*</span>
              </label>
              <select
                id="department"
                className="input"
                name="department"
                value={form.department}
                onChange={handleInputChange}
              >
                <option value="">Pilih Departemen</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>HR</option>
                <option>Sales</option>
                <option>Product</option>
              </select>
            </div>

            <div className="aev2-field">
              <label htmlFor="position">
                Jabatan <span className="required">*</span>
              </label>
              <input
                id="position"
                className="input"
                name="position"
                value={form.position}
                onChange={handleInputChange}
                placeholder="contoh: Senior Software Engineer"
              />
            </div>

            <div className="aev2-field">
              <label htmlFor="employeeId">ID Karyawan</label>
              <input
                id="employeeId"
                className="input aev2-readonly"
                name="employeeId"
                value={form.employeeId}
                onChange={handleInputChange}
                readOnly
                placeholder="contoh: E006"
              />
              <small className="aev2-help-text">
                ID ini dibuat otomatis oleh sistem.
              </small>
            </div>

            <div className="aev2-field">
              <label htmlFor="joinDate">
                Tanggal Bergabung <span className="required">*</span>
              </label>
              <input
                id="joinDate"
                className="input"
                type="date"
                name="joinDate"
                value={form.joinDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="aev2-field">
              <label htmlFor="workLocation">
                Lokasi Kerja <span className="required">*</span>
              </label>
              <select
                id="workLocation"
                className="input"
                name="workLocation"
                value={form.workLocation}
                onChange={handleInputChange}
              >
                <option value="">Pilih Lokasi</option>
                <option value="jakarta">Kantor Jakarta</option>
                <option value="bandung">Kantor Bandung</option>
                <option value="surabaya">Kantor Surabaya</option>
                <option value="remote-id">Remote (Indonesia)</option>
                <option value="remote-global">Remote (Global)</option>
              </select>
            </div>

            <div className="aev2-field">
              <label htmlFor="reportingManager">Atasan Langsung</label>
              <select
                id="reportingManager"
                className="input"
                name="reportingManager"
                value={form.reportingManager}
                onChange={handleInputChange}
              >
                <option value="">Pilih Karyawan...</option>
                <option value="sarah">Sarah Connor</option>
                <option value="john">John Wick</option>
                <option value="ellen">Ellen Ripley</option>
              </select>
            </div>
          </div>

          <div className="aev2-field aev2-employment-type">
            <label>
              Tipe Kepegawaian <span className="required">*</span>
            </label>
            <div className="aev2-type-grid">
              <label className="aev2-type-card">
                <input
                  type="radio"
                  name="employmentType"
                  value="Permanent"
                  checked={form.employmentType === "Permanent"}
                  onChange={handleInputChange}
                />
                <div>
                  <strong>Permanen</strong>
                  <small>Kontrak kerja standar full-time</small>
                </div>
              </label>

              <label className="aev2-type-card">
                <input
                  type="radio"
                  name="employmentType"
                  value="Contract"
                  checked={form.employmentType === "Contract"}
                  onChange={handleInputChange}
                />
                <div>
                  <strong>Kontrak</strong>
                  <small>Periode kerja dengan jangka waktu tertentu</small>
                </div>
              </label>

              <label className="aev2-type-card">
                <input
                  type="radio"
                  name="employmentType"
                  value="Internship"
                  checked={form.employmentType === "Internship"}
                  onChange={handleInputChange}
                />
                <div>
                  <strong>Magang</strong>
                  <small>Program pembelajaran sementara</small>
                </div>
              </label>
            </div>
          </div>
        </>
      );
    }

    if (activeStep === 2) {
      return (
        <div className="aev2-salary-layout">
          <section className="aev2-salary-section">
            <h4>Detail Kompensasi</h4>
            <div className="aev2-form-grid">
              <div className="aev2-field">
                <label htmlFor="basicSalary">Gaji Pokok (Bulanan)</label>
                <div className="aev2-money-input">
                  <span>$</span>
                  <input
                    id="basicSalary"
                    className="input"
                    type="number"
                    name="basicSalary"
                    value={form.basicSalary}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  <small>{form.salaryCurrency}</small>
                </div>
              </div>

              <div className="aev2-field">
                <label htmlFor="salaryCurrency">Mata Uang</label>
                <select
                  id="salaryCurrency"
                  className="input"
                  name="salaryCurrency"
                  value={form.salaryCurrency}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
          </section>

          <section className="aev2-salary-section aev2-salary-muted">
            <h4>Tunjangan</h4>

            <div className="aev2-allowance-row">
              <label>
                <input
                  type="checkbox"
                  name="transportAllowanceEnabled"
                  checked={form.transportAllowanceEnabled}
                  onChange={handleCheckboxChange}
                />
                <span>
                  <strong>Tunjangan Transport</strong>
                  <small>Kompensasi perjalanan bulanan</small>
                </span>
              </label>
              <div className="aev2-allowance-input">
                <span>$</span>
                <input
                  className="input"
                  name="transportAllowanceAmount"
                  value={form.transportAllowanceAmount}
                  onChange={handleInputChange}
                  disabled={!form.transportAllowanceEnabled}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="aev2-allowance-row">
              <label>
                <input
                  type="checkbox"
                  name="mealAllowanceEnabled"
                  checked={form.mealAllowanceEnabled}
                  onChange={handleCheckboxChange}
                />
                <span>
                  <strong>Tunjangan Makan</strong>
                  <small>Uang makan harian atau bulanan</small>
                </span>
              </label>
              <div className="aev2-allowance-input">
                <span>$</span>
                <input
                  className="input"
                  name="mealAllowanceAmount"
                  value={form.mealAllowanceAmount}
                  onChange={handleInputChange}
                  disabled={!form.mealAllowanceEnabled}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="aev2-allowance-row">
              <label>
                <input
                  type="checkbox"
                  name="positionAllowanceEnabled"
                  checked={form.positionAllowanceEnabled}
                  onChange={handleCheckboxChange}
                />
                <span>
                  <strong>Tunjangan Jabatan</strong>
                  <small>Tambahan untuk posisi senior</small>
                </span>
              </label>
              <div className="aev2-allowance-input">
                <span>$</span>
                <input
                  className="input"
                  name="positionAllowanceAmount"
                  value={form.positionAllowanceAmount}
                  onChange={handleInputChange}
                  disabled={!form.positionAllowanceEnabled}
                  placeholder="0.00"
                />
              </div>
            </div>
          </section>

          <section className="aev2-salary-section">
            <h4>Potongan Wajib</h4>
            <div className="aev2-deduction-grid">
              <label className="aev2-deduction-item">
                <input
                  type="checkbox"
                  name="deductionBpjsHealth"
                  checked={form.deductionBpjsHealth}
                  onChange={handleCheckboxChange}
                />
                <span>
                  <strong>BPJS Kesehatan</strong>
                  <small>Potongan standar 1% dari karyawan.</small>
                </span>
              </label>

              <label className="aev2-deduction-item">
                <input
                  type="checkbox"
                  name="deductionPension"
                  checked={form.deductionPension}
                  onChange={handleCheckboxChange}
                />
                <span>
                  <strong>Skema Pensiun</strong>
                  <small>Kontribusi sukarela 2%.</small>
                </span>
              </label>
            </div>
          </section>

          <section className="aev2-salary-section aev2-salary-muted">
            <h4>Informasi Bank</h4>
            <div className="aev2-bank-grid">
              <div className="aev2-field">
                <label htmlFor="bankName">Nama Bank</label>
                <select
                  id="bankName"
                  className="input"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Bank</option>
                  <option value="chase">Chase Bank</option>
                  <option value="boa">Bank of America</option>
                  <option value="wells">Wells Fargo</option>
                </select>
              </div>

              <div className="aev2-field">
                <label htmlFor="bankAccountNumber">Nomor Rekening</label>
                <input
                  id="bankAccountNumber"
                  className="input"
                  name="bankAccountNumber"
                  value={form.bankAccountNumber}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000"
                />
              </div>

              <div className="aev2-field">
                <label htmlFor="accountHolderName">Nama Pemilik Rekening</label>
                <input
                  id="accountHolderName"
                  className="input"
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="Nama legal lengkap"
                />
              </div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="aev2-docs-layout">
        <div className="aev2-docs-left">
          <div className="aev2-docs-head">
            <h4>Dokumen Wajib</h4>
            <p>
              Unggah dokumen karyawan dengan file yang valid dan terbaca jelas.
            </p>
          </div>

          <article className="aev2-doc-card">
            <div className="aev2-doc-card-top">
              <div className="aev2-doc-icon">
                <IdCard size={28} />
              </div>
              <div className="aev2-doc-content">
                <h5>KTP / Kartu Identitas</h5>
                <p>
                  Scan harus menampilkan foto dan nomor identitas dengan jelas.
                  Maks 5MB.
                </p>
                <div className="aev2-doc-actions">
                  <label htmlFor="ktpUpload">
                    <Upload size={16} /> Pilih File
                    <input
                      id="ktpUpload"
                      type="file"
                      onChange={(event) => handleDocumentChange(event, "ktp")}
                    />
                  </label>
                  <span>Atau drag & drop di sini</span>
                </div>
              </div>
            </div>

            {documentFiles.ktp && (
              <div className="aev2-doc-uploaded">
                <div>
                  <FileCheck2 size={16} />
                  <span>{documentFiles.ktp}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDocumentFiles((previous) => ({ ...previous, ktp: "" }))
                  }
                  aria-label="Hapus file KTP"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </article>

          <article className="aev2-doc-card">
            <div className="aev2-doc-card-top">
              <div className="aev2-doc-icon primary">
                <Upload size={28} />
              </div>
              <div className="aev2-doc-content">
                <h5>Kontrak Kerja Ditandatangani</h5>
                <p>
                  Unggah salinan PDF kontrak yang sudah ditandatangani. Maks
                  10MB.
                </p>
                <div className="aev2-doc-actions">
                  <label htmlFor="contractUpload" className="solid">
                    Pilih File
                    <input
                      id="contractUpload"
                      type="file"
                      onChange={(event) =>
                        handleDocumentChange(event, "contract")
                      }
                    />
                  </label>
                  <span>PDF dan JPG didukung</span>
                </div>
              </div>
            </div>

            {documentFiles.contract && (
              <div className="aev2-doc-uploaded">
                <div>
                  <FileCheck2 size={16} />
                  <span>{documentFiles.contract}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDocumentFiles((previous) => ({
                      ...previous,
                      contract: "",
                    }))
                  }
                  aria-label="Hapus file kontrak"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </article>

          <article className="aev2-doc-card">
            <div className="aev2-doc-card-top">
              <div className="aev2-doc-icon">
                <ReceiptText size={28} />
              </div>
              <div className="aev2-doc-content">
                <h5>NPWP</h5>
                <p>
                  Opsional untuk saat ini. Dokumen dapat diunggah oleh karyawan
                  nanti.
                </p>
                <div className="aev2-doc-actions">
                  <label htmlFor="npwpUpload">
                    <Upload size={16} /> Pilih File
                    <input
                      id="npwpUpload"
                      type="file"
                      onChange={(event) => handleDocumentChange(event, "npwp")}
                    />
                  </label>
                </div>
              </div>
            </div>

            {documentFiles.npwp && (
              <div className="aev2-doc-uploaded">
                <div>
                  <FileCheck2 size={16} />
                  <span>{documentFiles.npwp}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDocumentFiles((previous) => ({ ...previous, npwp: "" }))
                  }
                  aria-label="Hapus file NPWP"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </article>
        </div>

        <aside className="aev2-docs-summary">
          <div className="aev2-summary-head">
            <h4>Ringkasan</h4>
            <button type="button">
              <Pencil size={14} /> Edit
            </button>
          </div>

          <div className="aev2-summary-body">
            <div className="aev2-summary-identity">
              <div className="avatar">{form.name?.charAt(0) || "U"}</div>
              <div>
                <p>{form.name || "Nama belum diisi"}</p>
                <span>ID: {form.employeeId || "-"}</span>
              </div>
            </div>

            <div className="aev2-summary-grid">
              <div>
                <label>Jabatan</label>
                <p>{form.position || "-"}</p>
              </div>
              <div>
                <label>Departemen</label>
                <p>{form.department || "-"}</p>
              </div>
              <div>
                <label>Tanggal Mulai</label>
                <p>{form.joinDate || "-"}</p>
              </div>
            </div>

            <div className="aev2-summary-salary">
              <label>Gaji Pokok Bulanan</label>
              <p>
                {form.salaryCurrency} {form.basicSalary || "0.00"}
              </p>
            </div>

            <div className="aev2-summary-alert">
              <AlertCircle size={16} />
              <span>
                Mohon cek kembali seluruh data sebelum submit. Setelah dikirim,
                perubahan membutuhkan persetujuan admin.
              </span>
            </div>
          </div>
        </aside>
      </div>
    );
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
      title="Tambah Karyawan Baru"
      subtitle="Masukkan detail data karyawan yang akan didaftarkan."
      breadcrumbs={[
        { label: "Karyawan", to: "/employees" },
        { label: "Tambah Baru" },
      ]}
    >
      <section className="add-employee-v2">
        <div className="aev2-stepper">
          <div className="aev2-stepper-line" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            const isDone = activeStep > index;

            return (
              <button
                key={step.label}
                type="button"
                onClick={() => setActiveStep(index)}
                className="aev2-step"
              >
                <span
                  className={`aev2-step-circle ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                >
                  <Icon size={16} />
                </span>
                <span className={`aev2-step-label ${isActive ? "active" : ""}`}>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="aev2-card card">
          <div
            className={`aev2-card-body ${activeStep !== 0 ? "aev2-no-side" : ""}`}
          >
            <div className="aev2-main-column">
              <h3>{steps[activeStep].label}</h3>
              {renderStepFields()}
            </div>

            {activeStep === 0 && (
              <aside className="aev2-side-column">
                <p className="label">Foto Profil</p>
                <div className="aev2-upload-box">
                  <div className="aev2-avatar-preview">
                    <User size={42} />
                    <button type="button" aria-label="Edit avatar">
                      <ImagePlus size={14} />
                    </button>
                  </div>

                  <label
                    className="aev2-upload-trigger"
                    htmlFor="employee-avatar"
                  >
                    <span>Unggah file</span> atau seret dan lepas
                    <input id="employee-avatar" type="file" />
                  </label>
                  <small>PNG, JPG, GIF hingga 2MB</small>
                </div>

                <div className="aev2-tip-box">
                  <Info size={14} />
                  <p>
                    Pastikan NIK dan email valid. Email akan digunakan sebagai
                    kredensial login karyawan.
                  </p>
                </div>
              </aside>
            )}
          </div>

          <div className="aev2-footer-actions">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => navigate("/employees")}
              disabled={isSaved}
            >
              Batal
            </button>

            <div className="aev2-right-actions">
              {!isFirstStep && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  <ArrowLeft size={16} /> Kembali
                </button>
              )}

              {!isLastStep ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                >
                  Lanjut: {steps[activeStep + 1].label} <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSaveEmployee}
                  disabled={!isFormValid || isSaved}
                >
                  <Save size={16} /> Simpan Karyawan
                </button>
              )}
            </div>
          </div>
        </div>

        {!isFormValid && (
          <p className="aev2-warning-note">
            Nama Lengkap dan Jabatan wajib diisi sebelum menyimpan karyawan.
          </p>
        )}

        {isSaved && (
          <p className="aev2-success-note">
            <CheckCircle2 size={16} /> Karyawan berhasil disimpan, mengarahkan
            ke daftar...
          </p>
        )}
      </section>
    </PageShell>
  );
}
