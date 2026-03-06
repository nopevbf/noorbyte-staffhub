import { useMemo, useState } from "react";
import { CalendarRange, Check, Eye, Plus, Search, X } from "lucide-react";
import PageShell from "../../components/common/PageShell";

interface LeaveRequestRow {
  id: string;
  employeeName: string;
  role: string;
  leaveType: string;
  dateRange: string;
  duration: string;
  status: "pending" | "approved" | "rejected";
}

export default function LeaveManagement() {
  const leaveRows: ReadonlyArray<LeaveRequestRow> = [
    {
      id: "LR-001",
      employeeName: "Budi Santoso",
      role: "Marketing • Manager",
      leaveType: "Cuti Tahunan",
      dateRange: "12 Feb 2026 - 14 Feb 2026",
      duration: "3 Hari",
      status: "pending",
    },
    {
      id: "LR-002",
      employeeName: "Siti Aminah",
      role: "Production • Supervisor",
      leaveType: "Izin Sakit",
      dateRange: "10 Feb 2026 - 10 Feb 2026",
      duration: "1 Hari",
      status: "approved",
    },
    {
      id: "LR-003",
      employeeName: "Agus Pratama",
      role: "Sales • Associate",
      leaveType: "Izin Keperluan",
      dateRange: "05 Feb 2026 - 05 Feb 2026",
      duration: "1 Hari",
      status: "rejected",
    },
    {
      id: "LR-004",
      employeeName: "Dewi Wulandari",
      role: "Finance • Accountant",
      leaveType: "Cuti Tahunan",
      dateRange: "15 Feb 2026 - 17 Feb 2026",
      duration: "3 Hari",
      status: "pending",
    },
    {
      id: "LR-005",
      employeeName: "Rina Sari",
      role: "HR • Recruiter",
      leaveType: "Izin Sakit",
      dateRange: "02 Feb 2026 - 02 Feb 2026",
      duration: "1 Hari",
      status: "approved",
    },
    {
      id: "LR-006",
      employeeName: "Eko Prasetyo",
      role: "Production • Operator",
      leaveType: "Cuti Tahunan",
      dateRange: "14 Feb 2026 - 20 Feb 2026",
      duration: "7 Hari",
      status: "pending",
    },
  ];

  const [activeStatus, setActiveStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [toastVisible, setToastVisible] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<LeaveRequestRow | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [reasonError, setReasonError] = useState(false);

  const statusOptions = [
    { key: "all", label: "Semua" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Disetujui" },
    { key: "rejected", label: "Ditolak" },
  ] as const;

  const filteredRows = useMemo(() => {
    if (activeStatus === "all") {
      return leaveRows;
    }

    return leaveRows.filter((row) => row.status === activeStatus);
  }, [activeStatus]);

  const showSuccessToast = () => {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2500);
  };

  const openRejectionModal = (row: LeaveRequestRow) => {
    setSelectedRequest(row);
    setRejectionReason("");
    setNotifyWhatsapp(true);
    setReasonError(false);
    setRejectionModalOpen(true);
  };

  const closeRejectionModal = () => {
    setRejectionModalOpen(false);
    setReasonError(false);
  };

  const submitRejection = () => {
    if (!rejectionReason.trim()) {
      setReasonError(true);
      return;
    }

    closeRejectionModal();
    showSuccessToast();
  };

  const statusMeta: Record<
    (typeof leaveRows)[number]["status"],
    { label: string; className: string }
  > = {
    pending: { label: "Pending", className: "pending" },
    approved: { label: "Approved", className: "approved" },
    rejected: { label: "Rejected", className: "rejected" },
  };

  return (
    <PageShell
      title="Izin & Cuti"
      subtitle="Kelola pengajuan izin, cuti, dan proses persetujuan karyawan."
      breadcrumbs={[
        { label: "Attendance", to: "/attendance/summary" },
        { label: "Izin & Cuti" },
      ]}
      actions={
        <button className="btn btn-primary btn-sm">
          <Plus size={15} /> Buat Pengajuan
        </button>
      }
    >
      <section className="leave-management-v2">
        {rejectionModalOpen && selectedRequest && (
          <div
            className="leave-management-v2__modal-overlay"
            role="presentation"
          >
            <div className="leave-management-v2__modal">
              <div className="leave-management-v2__modal-header">
                <h3>Alasan Penolakan</h3>
                <button
                  className="leave-management-v2__modal-close"
                  onClick={closeRejectionModal}
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="leave-management-v2__modal-body">
                <div className="leave-management-v2__modal-profile">
                  <div className="leave-management-v2__modal-avatar">
                    {selectedRequest.employeeName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="leave-management-v2__modal-name">
                      {selectedRequest.employeeName}
                    </p>
                    <p className="leave-management-v2__modal-role">
                      {selectedRequest.role}
                    </p>
                  </div>
                </div>

                <div className="leave-management-v2__modal-info-grid">
                  <div>
                    <span>Tipe Cuti</span>
                    <strong>{selectedRequest.leaveType}</strong>
                  </div>
                  <div>
                    <span>Tanggal</span>
                    <strong>{selectedRequest.dateRange}</strong>
                  </div>
                </div>

                <div className="leave-management-v2__modal-field">
                  <label htmlFor="rejectReason">Berikan alasan penolakan</label>
                  <textarea
                    id="rejectReason"
                    className={`input leave-management-v2__reason-input ${reasonError ? "is-error" : ""}`}
                    placeholder="Contoh: Sudah banyak pengajuan cuti pada tanggal yang sama"
                    value={rejectionReason}
                    onChange={(event) => {
                      setRejectionReason(event.target.value);
                      if (reasonError && event.target.value.trim()) {
                        setReasonError(false);
                      }
                    }}
                  />
                  {reasonError && (
                    <p className="leave-management-v2__field-error">
                      Alasan penolakan wajib diisi.
                    </p>
                  )}
                </div>

                <label className="leave-management-v2__modal-checkbox">
                  <input
                    checked={notifyWhatsapp}
                    type="checkbox"
                    onChange={(event) =>
                      setNotifyWhatsapp(event.target.checked)
                    }
                  />
                  <span>Kirim notifikasi via WhatsApp ke karyawan</span>
                </label>
              </div>

              <div className="leave-management-v2__modal-footer">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={closeRejectionModal}
                  type="button"
                >
                  Batal
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={submitRejection}
                  type="button"
                >
                  <X size={14} /> Ya, Tolak Pengajuan
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`leave-management-v2__toast ${toastVisible ? "show" : ""}`}
        >
          <Check size={16} />
          <div>
            <strong>Success</strong>
            <p>Status pengajuan berhasil diperbarui.</p>
          </div>
        </div>

        <div className="grid grid-4 leave-management-v2__stats">
          <div className="stat-card leave-management-v2__stat-card">
            <div className="stat-content">
              <h3>Pending Requests</h3>
              <div className="stat-value leave-management-v2__stat-value">
                8
              </div>
              <p className="leave-management-v2__stat-note leave-management-v2__stat-note--warning">
                Butuh tindakan
              </p>
            </div>
          </div>
          <div className="stat-card leave-management-v2__stat-card">
            <div className="stat-content">
              <h3>Approved Today</h3>
              <div className="stat-value leave-management-v2__stat-value leave-management-v2__stat-value--success">
                12
              </div>
              <p className="leave-management-v2__stat-note">Pengajuan</p>
            </div>
          </div>
          <div className="stat-card leave-management-v2__stat-card">
            <div className="stat-content">
              <h3>Employees on Leave</h3>
              <div className="stat-value leave-management-v2__stat-value">
                4
              </div>
              <p className="leave-management-v2__stat-note">Saat ini</p>
            </div>
          </div>
          <div className="stat-card leave-management-v2__stat-card">
            <div className="stat-content">
              <h3>Avg. Remaining Quota</h3>
              <div className="stat-value leave-management-v2__stat-value leave-management-v2__stat-value--info">
                8.5 Hari
              </div>
              <p className="leave-management-v2__stat-note">/ Karyawan</p>
            </div>
          </div>
        </div>

        <div className="card leave-management-v2__table-card">
          <div className="leave-management-v2__toolbar">
            <div className="leave-management-v2__status-tabs">
              {statusOptions.map((statusOption) => (
                <button
                  key={statusOption.key}
                  className={`leave-management-v2__status-tab ${activeStatus === statusOption.key ? "active" : ""}`}
                  onClick={() => setActiveStatus(statusOption.key)}
                  type="button"
                >
                  {statusOption.label}
                </button>
              ))}
            </div>

            <div className="leave-management-v2__filters">
              <label className="leave-management-v2__input-wrap">
                <CalendarRange
                  size={16}
                  className="leave-management-v2__input-icon"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Pilih rentang tanggal..."
                />
              </label>
              <label className="leave-management-v2__input-wrap">
                <Search size={16} className="leave-management-v2__input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Cari nama / tipe izin..."
                />
              </label>
            </div>
          </div>

          <div className="table-wrapper leave-management-v2__table-wrap">
            <table className="leave-management-v2__table">
              <thead>
                <tr>
                  <th>Nama Karyawan</th>
                  <th>Tipe Izin</th>
                  <th>Rentang Tanggal</th>
                  <th className="leave-management-v2__align-center">Durasi</th>
                  <th className="leave-management-v2__align-center">Status</th>
                  <th className="leave-management-v2__align-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="leave-management-v2__employee-cell">
                        <div className="leave-management-v2__avatar">
                          {row.employeeName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="leave-management-v2__employee-name">
                            {row.employeeName}
                          </p>
                          <p className="leave-management-v2__employee-meta">
                            {row.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{row.leaveType}</td>
                    <td>{row.dateRange}</td>
                    <td className="leave-management-v2__align-center">
                      {row.duration}
                    </td>
                    <td className="leave-management-v2__align-center">
                      <span
                        className={`leave-management-v2__status-pill leave-management-v2__status-pill--${statusMeta[row.status].className}`}
                      >
                        {statusMeta[row.status].label}
                      </span>
                    </td>
                    <td className="leave-management-v2__align-right">
                      <div className="leave-management-v2__actions">
                        {row.status === "pending" && (
                          <>
                            <button
                              className="leave-management-v2__action-btn leave-management-v2__action-btn--approve"
                              onClick={showSuccessToast}
                              type="button"
                            >
                              <Check size={14} /> Approve
                            </button>
                            <button
                              className="leave-management-v2__action-btn leave-management-v2__action-btn--reject"
                              onClick={() => openRejectionModal(row)}
                              type="button"
                            >
                              <X size={14} /> Reject
                            </button>
                          </>
                        )}
                        <button
                          className="leave-management-v2__action-btn leave-management-v2__action-btn--view"
                          type="button"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="leave-management-v2__pagination">
            <p>
              Menampilkan <strong>1-{filteredRows.length}</strong> dari{" "}
              <strong>24</strong> data
            </p>
            <div className="leave-management-v2__pagination-actions">
              <button className="btn btn-ghost btn-sm" type="button">
                Sebelumnya
              </button>
              <button className="btn btn-primary btn-sm" type="button">
                1
              </button>
              <button className="btn btn-secondary btn-sm" type="button">
                2
              </button>
              <button className="btn btn-secondary btn-sm" type="button">
                3
              </button>
              <button className="btn btn-ghost btn-sm" type="button">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
