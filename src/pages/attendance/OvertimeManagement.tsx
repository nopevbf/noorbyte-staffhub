import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle,
  Eye,
  Search,
  Wallet,
  X,
} from "lucide-react";
import PageShell from "../../components/common/PageShell";

interface OvertimeRow {
  id: string;
  employeeName: string;
  role: string;
  date: string;
  reason: string;
  timeRange: string;
  hours: number;
  estimatedPay: string;
  department: string;
  status: "pending" | "approved" | "rejected";
}

export default function OvertimeManagement() {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRejectRow, setSelectedRejectRow] =
    useState<OvertimeRow | null>(null);
  const [batchRejectCount, setBatchRejectCount] = useState(0);
  const [rejectReason, setRejectReason] = useState("");
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [rejectReasonError, setRejectReasonError] = useState(false);

  const overtimeRows: ReadonlyArray<OvertimeRow> = [
    {
      id: "OT-001",
      employeeName: "Budi Santoso",
      role: "Product Designer",
      date: "24 Oct 2026",
      reason: "Mengejar deadline project Alpha phase 2",
      timeRange: "18:00 - 21:00",
      hours: 3,
      estimatedPay: "Rp 150.000",
      department: "Design",
      status: "pending",
    },
    {
      id: "OT-002",
      employeeName: "Siti Aminah",
      role: "QA Engineer",
      date: "24 Oct 2026",
      reason: "Testing critical bug fix untuk release v2.1",
      timeRange: "17:30 - 19:30",
      hours: 2,
      estimatedPay: "Rp 100.000",
      department: "Engineering",
      status: "pending",
    },
    {
      id: "OT-003",
      employeeName: "Ahmad Rizky",
      role: "Backend Developer",
      date: "23 Oct 2026",
      reason: "Server maintenance dan migration",
      timeRange: "20:00 - 00:00",
      hours: 4,
      estimatedPay: "Rp 250.000",
      department: "Engineering",
      status: "pending",
    },
    {
      id: "OT-004",
      employeeName: "Dewi Wulandari",
      role: "HR Assistant",
      date: "23 Oct 2026",
      reason: "Support proses payroll bulanan",
      timeRange: "17:00 - 19:00",
      hours: 2,
      estimatedPay: "Rp 90.000",
      department: "HR",
      status: "pending",
    },
    {
      id: "OT-005",
      employeeName: "Rina Sari",
      role: "Recruiter",
      date: "22 Oct 2026",
      reason: "Interview kandidat batch akhir",
      timeRange: "18:00 - 20:00",
      hours: 2,
      estimatedPay: "Rp 90.000",
      department: "HR",
      status: "approved",
    },
    {
      id: "OT-006",
      employeeName: "Eko Prasetyo",
      role: "Production Operator",
      date: "22 Oct 2026",
      reason: "Pemenuhan target produksi harian",
      timeRange: "19:00 - 22:00",
      hours: 3,
      estimatedPay: "Rp 120.000",
      department: "Production",
      status: "rejected",
    },
  ] as const;

  const displayedRows = useMemo(() => {
    if (activeTab === "pending") {
      return overtimeRows.filter((row) => row.status === "pending");
    }

    return overtimeRows.filter((row) => row.status !== "pending");
  }, [activeTab]);

  const allVisibleSelected =
    displayedRows.length > 0 &&
    displayedRows.every((row) => selectedIds.includes(row.id));

  const toggleRow = (rowId: string) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(rowId)
        ? prevIds.filter((selectedId) => selectedId !== rowId)
        : [...prevIds, rowId],
    );
  };

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((prevIds) =>
        prevIds.filter(
          (selectedId) => !displayedRows.some((row) => row.id === selectedId),
        ),
      );
      return;
    }

    setSelectedIds((prevIds) => {
      const next = new Set(prevIds);
      displayedRows.forEach((row) => next.add(row.id));
      return Array.from(next);
    });
  };

  const handleBulkAction = () => {
    setSelectedIds([]);
  };

  const showSuccessToast = () => {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2500);
  };

  const openRejectModal = (row: OvertimeRow, count = 1) => {
    setSelectedRejectRow(row);
    setBatchRejectCount(count);
    setRejectReason("");
    setNotifyWhatsapp(true);
    setRejectReasonError(false);
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectReasonError(false);
  };

  const handleBulkReject = () => {
    const firstSelected = displayedRows.find((row) =>
      selectedIds.includes(row.id),
    );

    if (!firstSelected) {
      return;
    }

    openRejectModal(firstSelected, selectedIds.length);
  };

  const submitReject = () => {
    if (!rejectReason.trim()) {
      setRejectReasonError(true);
      return;
    }

    closeRejectModal();
    handleBulkAction();
    showSuccessToast();
  };

  return (
    <PageShell
      title="Persetujuan Lembur"
      subtitle="Kelola persetujuan pengajuan lembur karyawan secara cepat dan terpusat."
      breadcrumbs={[
        { label: "Attendance", to: "/attendance/summary" },
        { label: "Lembur" },
      ]}
      actions={
        <div className="overtime-v2__header-actions">
          <button
            className="btn btn-secondary btn-sm overtime-v2__bulk-btn overtime-v2__bulk-btn--reject"
            type="button"
            disabled={selectedIds.length === 0 || activeTab !== "pending"}
            onClick={handleBulkReject}
          >
            <X size={14} /> Reject Selected
          </button>
          <button
            className="btn btn-primary btn-sm overtime-v2__bulk-btn overtime-v2__bulk-btn--approve"
            type="button"
            disabled={selectedIds.length === 0 || activeTab !== "pending"}
            onClick={handleBulkAction}
          >
            <CheckCircle size={14} /> Approve Selected
          </button>
        </div>
      }
    >
      <section className="overtime-v2">
        {rejectModalOpen && selectedRejectRow && (
          <div className="overtime-v2__modal-overlay" role="presentation">
            <div className="overtime-v2__modal">
              <div className="overtime-v2__modal-header">
                <h3>Alasan Penolakan Lembur</h3>
                <button
                  className="overtime-v2__modal-close"
                  type="button"
                  onClick={closeRejectModal}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overtime-v2__modal-body">
                <div className="overtime-v2__modal-profile">
                  <div className="overtime-v2__modal-avatar">
                    {selectedRejectRow.employeeName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="overtime-v2__modal-info">
                    <p className="overtime-v2__modal-name">
                      {selectedRejectRow.employeeName}
                    </p>
                    <p className="overtime-v2__modal-role">
                      {selectedRejectRow.role}
                    </p>
                    <p className="overtime-v2__modal-meta">
                      {selectedRejectRow.date} • {selectedRejectRow.timeRange}
                    </p>
                  </div>
                  <span className="overtime-v2__modal-hours">
                    {selectedRejectRow.hours} Jam
                  </span>
                </div>

                {batchRejectCount > 1 && (
                  <p className="overtime-v2__modal-batch-note">
                    Penolakan ini akan diterapkan ke{" "}
                    <strong>{batchRejectCount}</strong> pengajuan terpilih.
                  </p>
                )}

                <div className="overtime-v2__modal-field">
                  <label htmlFor="overtimeRejectReason">
                    Alasan Penolakan <span>*</span>
                  </label>
                  <textarea
                    id="overtimeRejectReason"
                    className={`input overtime-v2__reason-input ${rejectReasonError ? "is-error" : ""}`}
                    placeholder="Jelaskan mengapa pengajuan lembur ditolak..."
                    value={rejectReason}
                    onChange={(event) => {
                      setRejectReason(event.target.value);
                      if (rejectReasonError && event.target.value.trim()) {
                        setRejectReasonError(false);
                      }
                    }}
                  />
                  {rejectReasonError && (
                    <p className="overtime-v2__field-error">
                      Alasan penolakan wajib diisi.
                    </p>
                  )}
                  <p className="overtime-v2__field-hint">
                    Alasan ini akan dikirimkan kepada karyawan.
                  </p>
                </div>

                <label className="overtime-v2__modal-checkbox">
                  <input
                    type="checkbox"
                    checked={notifyWhatsapp}
                    onChange={(event) =>
                      setNotifyWhatsapp(event.target.checked)
                    }
                  />
                  <span>Kirim notifikasi via WhatsApp</span>
                </label>
              </div>

              <div className="overtime-v2__modal-footer">
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={closeRejectModal}
                >
                  Batal
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={submitReject}
                >
                  Konfirmasi Tolak
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`overtime-v2__toast ${toastVisible ? "show" : ""}`}>
          <Check size={15} />
          <span>Pengajuan lembur berhasil diperbarui.</span>
        </div>

        <div className="overtime-v2__stats grid">
          <div className="stat-card overtime-v2__stat-card">
            <div className="stat-content">
              <h3>Pending Review</h3>
              <div className="stat-value">12</div>
              <p className="overtime-v2__stat-note overtime-v2__stat-note--warning">
                Action Needed
              </p>
            </div>
          </div>
          <div className="stat-card overtime-v2__stat-card">
            <div className="stat-content">
              <h3>Approved Today</h3>
              <div className="stat-value overtime-v2__stat-value--success">
                8
              </div>
              <p className="overtime-v2__stat-note overtime-v2__stat-note--success">
                +12%
              </p>
            </div>
          </div>
          <div className="stat-card overtime-v2__stat-card">
            <div className="stat-content">
              <h3>Rejected Today</h3>
              <div className="stat-value overtime-v2__stat-value--danger">
                2
              </div>
              <p className="overtime-v2__stat-note">requests</p>
            </div>
          </div>
          <div className="stat-card overtime-v2__stat-card">
            <div className="stat-content">
              <h3>Estimated Cost</h3>
              <div className="stat-value">Rp 4.5M</div>
              <p className="overtime-v2__stat-note">minggu ini</p>
            </div>
          </div>
          <div className="stat-card overtime-v2__stat-card">
            <div className="stat-content">
              <h3>Hours This Week</h3>
              <div className="stat-value">48.5</div>
              <p className="overtime-v2__stat-note">hrs</p>
            </div>
          </div>
        </div>

        <div className="card overtime-v2__table-card">
          <div className="overtime-v2__toolbar">
            <div className="overtime-v2__tabs">
              <button
                className={`overtime-v2__tab ${activeTab === "pending" ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setActiveTab("pending");
                  setSelectedIds([]);
                }}
              >
                Pending
              </button>
              <button
                className={`overtime-v2__tab ${activeTab === "history" ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setActiveTab("history");
                  setSelectedIds([]);
                }}
              >
                History
              </button>
            </div>

            <div className="overtime-v2__filters">
              <label className="overtime-v2__input-wrap">
                <Search size={15} className="overtime-v2__input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Search employee..."
                />
              </label>
              <select className="input">
                <option>All Departments</option>
                <option>Design</option>
                <option>Engineering</option>
                <option>Marketing</option>
              </select>
              <label className="overtime-v2__input-wrap overtime-v2__date-filter">
                <CalendarDays size={15} className="overtime-v2__input-icon" />
                <input className="input" type="text" placeholder="20-26 Oct" />
              </label>
            </div>
          </div>

          <div className="table-wrapper overtime-v2__table-wrap">
            <table className="overtime-v2__table">
              <thead>
                <tr>
                  <th className="overtime-v2__check-col">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleAllVisible}
                    />
                  </th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Time</th>
                  <th className="overtime-v2__align-center">Hours</th>
                  <th>Est. Pay</th>
                  <th className="overtime-v2__align-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((row) => (
                  <tr key={row.id}>
                    <td className="overtime-v2__check-col">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td>
                      <div className="overtime-v2__employee-cell">
                        <div className="overtime-v2__avatar">
                          {row.employeeName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="overtime-v2__employee-name">
                            {row.employeeName}
                          </p>
                          <p className="overtime-v2__employee-role">
                            {row.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{row.date}</td>
                    <td className="overtime-v2__reason">{row.reason}</td>
                    <td>{row.timeRange}</td>
                    <td className="overtime-v2__align-center">
                      <span className="overtime-v2__hours-pill">
                        {row.hours}h
                      </span>
                    </td>
                    <td className="overtime-v2__pay-cell">
                      <Wallet size={14} /> {row.estimatedPay}
                    </td>
                    <td className="overtime-v2__align-right">
                      <div className="overtime-v2__actions">
                        <button className="overtime-v2__icon-btn" type="button">
                          <Eye size={15} />
                        </button>
                        {row.status === "pending" && (
                          <>
                            <button
                              className="overtime-v2__action-btn overtime-v2__action-btn--reject"
                              type="button"
                              onClick={() => openRejectModal(row)}
                            >
                              <X size={13} /> Reject
                            </button>
                            <button
                              className="overtime-v2__action-btn overtime-v2__action-btn--approve"
                              type="button"
                            >
                              <Check size={13} /> Approve
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overtime-v2__pagination">
            <p>
              Showing <strong>1-{displayedRows.length}</strong> of{" "}
              <strong>12</strong> results
            </p>
            <div className="overtime-v2__pagination-actions">
              <button className="btn btn-ghost btn-sm" type="button">
                Prev
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
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
