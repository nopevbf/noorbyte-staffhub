import { useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  ChevronDown,
  Clock3,
  History,
  MapPin,
  Save,
  UploadCloud,
  UserSearch,
} from "lucide-react";
import PageShell from "../../components/common/PageShell";

type ManualEntryFormState = {
  employee: string;
  attendanceDate: string;
  clockInTime: string;
  clockOutTime: string;
  status: string;
  location: string;
  manualReason: string;
};

type ManualEntryErrorState = Partial<
  Record<keyof ManualEntryFormState, string>
>;

export default function ManualEntry() {
  const [formState, setFormState] = useState<ManualEntryFormState>({
    employee: "",
    attendanceDate: "",
    clockInTime: "",
    clockOutTime: "",
    status: "",
    location: "",
    manualReason: "",
  });
  const [formErrors, setFormErrors] = useState<ManualEntryErrorState>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateForm = (
    values: ManualEntryFormState,
  ): ManualEntryErrorState => {
    const errors: ManualEntryErrorState = {};

    if (!values.employee.trim()) {
      errors.employee = "Employee wajib diisi.";
    }

    if (!values.attendanceDate) {
      errors.attendanceDate = "Tanggal absensi wajib diisi.";
    }

    if (!values.clockInTime) {
      errors.clockInTime = "Clock in time wajib diisi.";
    }

    if (!values.status) {
      errors.status = "Status wajib dipilih.";
    }

    if (!values.location) {
      errors.location = "Lokasi wajib dipilih.";
    }

    if (!values.manualReason.trim()) {
      errors.manualReason = "Alasan manual entry wajib diisi.";
    }

    return errors;
  };

  const updateField = <K extends keyof ManualEntryFormState>(
    key: K,
    value: ManualEntryFormState[K],
  ) => {
    const nextForm = { ...formState, [key]: value };
    setFormState(nextForm);

    if (Object.keys(formErrors).length > 0) {
      setFormErrors(validateForm(nextForm));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(formState);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setShowSuccessToast(true);
    window.setTimeout(() => setShowSuccessToast(false), 2500);
  };

  return (
    <PageShell
      title="Input Absensi Manual"
      subtitle="Catat absensi karyawan secara manual saat diperlukan."
      breadcrumbs={[
        { label: "Attendance", to: "/attendance/summary" },
        { label: "Manual Entry" },
      ]}
      actions={
        <button className="btn btn-secondary btn-sm">
          <History size={15} /> History
        </button>
      }
    >
      <section className="manual-entry-v2">
        <div
          className={`manual-entry-v2__toast ${showSuccessToast ? "show" : ""}`}
        >
          <CheckCircle size={15} />
          <span>Data absensi manual berhasil disimpan.</span>
        </div>

        <form className="card manual-entry-v2__form" onSubmit={handleSubmit}>
          <div className="manual-entry-v2__form-header">
            <h3>Attendance Details</h3>
            <p>Please fill in all required fields accurately.</p>
          </div>

          <div className="manual-entry-v2__form-body">
            <div className="manual-entry-v2__grid manual-entry-v2__grid--2">
              <div className="manual-entry-v2__field">
                <label>
                  Employee <span>*</span>
                </label>
                <div className="manual-entry-v2__input-wrap">
                  <UserSearch
                    size={16}
                    className="manual-entry-v2__input-icon"
                  />
                  <input
                    className={`input ${formErrors.employee ? "manual-entry-v2__input-error" : ""}`}
                    list="manualEntryEmployees"
                    placeholder="Search employee by name or ID..."
                    type="text"
                    value={formState.employee}
                    onChange={(event) =>
                      updateField("employee", event.target.value)
                    }
                  />
                </div>
                {formErrors.employee && (
                  <p className="manual-entry-v2__error-text">
                    {formErrors.employee}
                  </p>
                )}
                <datalist id="manualEntryEmployees">
                  <option value="Budi Santoso - Marketing" />
                  <option value="Siti Aminah - Production" />
                  <option value="Agus Pratama - Sales" />
                  <option value="Dewi Wulandari - Finance" />
                </datalist>
              </div>

              <div className="manual-entry-v2__field">
                <label>
                  Attendance Date <span>*</span>
                </label>
                <div className="manual-entry-v2__input-wrap">
                  <CalendarDays
                    size={16}
                    className="manual-entry-v2__input-icon"
                  />
                  <input
                    className={`input ${formErrors.attendanceDate ? "manual-entry-v2__input-error" : ""}`}
                    type="date"
                    value={formState.attendanceDate}
                    onChange={(event) =>
                      updateField("attendanceDate", event.target.value)
                    }
                  />
                </div>
                {formErrors.attendanceDate && (
                  <p className="manual-entry-v2__error-text">
                    {formErrors.attendanceDate}
                  </p>
                )}
              </div>
            </div>

            <div className="manual-entry-v2__grid manual-entry-v2__grid--3">
              <div className="manual-entry-v2__field">
                <label>
                  Clock In Time <span>*</span>
                </label>
                <div className="manual-entry-v2__input-wrap">
                  <Clock3 size={16} className="manual-entry-v2__input-icon" />
                  <input
                    className={`input ${formErrors.clockInTime ? "manual-entry-v2__input-error" : ""}`}
                    type="time"
                    value={formState.clockInTime}
                    onChange={(event) =>
                      updateField("clockInTime", event.target.value)
                    }
                  />
                </div>
                {formErrors.clockInTime && (
                  <p className="manual-entry-v2__error-text">
                    {formErrors.clockInTime}
                  </p>
                )}
              </div>

              <div className="manual-entry-v2__field">
                <label>Clock Out Time</label>
                <div className="manual-entry-v2__input-wrap">
                  <Clock3 size={16} className="manual-entry-v2__input-icon" />
                  <input
                    className="input"
                    type="time"
                    value={formState.clockOutTime}
                    onChange={(event) =>
                      updateField("clockOutTime", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="manual-entry-v2__field">
                <label>
                  Status <span>*</span>
                </label>
                <select
                  className={`input ${formErrors.status ? "manual-entry-v2__input-error" : ""}`}
                  value={formState.status}
                  onChange={(event) =>
                    updateField("status", event.target.value)
                  }
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="hadir">Hadir (Present)</option>
                  <option value="izin">Izin (Permitted)</option>
                  <option value="sakit">Sakit (Sick)</option>
                  <option value="alpha">Alpha (Absent)</option>
                </select>
                {formErrors.status && (
                  <p className="manual-entry-v2__error-text">
                    {formErrors.status}
                  </p>
                )}
              </div>
            </div>

            <div className="manual-entry-v2__field">
              <label>
                Location / Office <span>*</span>
              </label>
              <div className="manual-entry-v2__input-wrap">
                <MapPin size={16} className="manual-entry-v2__input-icon" />
                <select
                  className={`input manual-entry-v2__select-with-icon ${formErrors.location ? "manual-entry-v2__input-error" : ""}`}
                  value={formState.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                >
                  <option value="" disabled>
                    Select location
                  </option>
                  <option value="hq">Headquarters (Jakarta)</option>
                  <option value="branch-bdg">Bandung Branch</option>
                  <option value="branch-sby">Surabaya Branch</option>
                  <option value="remote">Remote / WFH</option>
                </select>
                <ChevronDown
                  size={16}
                  className="manual-entry-v2__select-arrow"
                />
              </div>
              {formErrors.location && (
                <p className="manual-entry-v2__error-text">
                  {formErrors.location}
                </p>
              )}
            </div>

            <div className="manual-entry-v2__field">
              <label>
                Reason for Manual Entry <span>*</span>
              </label>
              <textarea
                className={`input manual-entry-v2__textarea ${formErrors.manualReason ? "manual-entry-v2__input-error" : ""}`}
                placeholder="e.g., Forgot to clock in, Biometric scanner error, Working off-site..."
                rows={3}
                value={formState.manualReason}
                onChange={(event) =>
                  updateField("manualReason", event.target.value)
                }
              />
              {formErrors.manualReason && (
                <p className="manual-entry-v2__error-text">
                  {formErrors.manualReason}
                </p>
              )}
            </div>

            <div className="manual-entry-v2__field">
              <label>Evidence / Attachment</label>
              <label
                className="manual-entry-v2__upload"
                htmlFor="manualAttendanceEvidence"
              >
                <UploadCloud
                  size={32}
                  className="manual-entry-v2__upload-icon"
                />
                <p>
                  <span>Upload a file</span> or drag and drop
                </p>
                <small>PNG, JPG, PDF up to 5MB</small>
                <input id="manualAttendanceEvidence" type="file" />
              </label>
            </div>
          </div>

          <div className="manual-entry-v2__form-footer">
            <button className="btn btn-secondary" type="button">
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              <Save size={15} /> Save Attendance
            </button>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
