# Panduan Fungsi Folder Proyek StaffHub

Dokumen ini menjelaskan fungsi setiap folder utama di repository agar onboarding dan maintenance lebih cepat.

## Ringkasan Cepat (Folder → Fungsi)

### Root project

| Folder    | Fungsi                                                        |
| --------- | ------------------------------------------------------------- |
| `docs/`   | Dokumentasi teknis proyek (setup, plan, panduan operasional). |
| `public/` | Aset statis frontend yang disajikan langsung oleh Vite.       |
| `server/` | Aplikasi backend (Express + Drizzle + PostgreSQL + Redis).    |
| `src/`    | Aplikasi frontend (React + TypeScript).                       |

### Frontend (`src/`)

| Folder               | Fungsi                                                        |
| -------------------- | ------------------------------------------------------------- |
| `assets/`            | Menyimpan aset frontend (gambar, ikon, dll).                  |
| `auth/`              | Layer autentikasi client (API auth, sesi/token).              |
| `components/common/` | Komponen reusable lintas fitur.                               |
| `components/layout/` | Komponen layout utama (header, sidebar, shell).               |
| `context/`           | React Context provider/state global.                          |
| `hooks/`             | Custom hooks React.                                           |
| `pages/attendance/`  | Fitur absensi, lembur, cuti, shift, kalender kerja.           |
| `pages/auth/`        | Halaman login, lupa password, reset password.                 |
| `pages/bot/`         | Fitur bot: log, template, broadcast, auto-reply.              |
| `pages/dashboard/`   | Ringkasan dashboard, notifikasi, pencarian.                   |
| `pages/employees/`   | Data karyawan: list, detail, tambah/edit, import, struktur.   |
| `pages/errors/`      | Halaman error (403, 404, 500, maintenance, offline).          |
| `pages/finance/`     | Fitur keuangan: income/expense, kategori, budgeting, laporan. |
| `pages/payroll/`     | Fitur penggajian.                                             |
| `pages/reports/`     | Fitur laporan lintas domain.                                  |
| `pages/settings/`    | Pengaturan aplikasi.                                          |

### Backend (`server/src/`)

| Folder           | Fungsi                                                      |
| ---------------- | ----------------------------------------------------------- |
| `db/`            | Seed, migrasi, dan schema database.                         |
| `lib/`           | Inisialisasi library eksternal (auth, DB client, Redis).    |
| `middleware/`    | Middleware Express (auth, RBAC, error handler, request-id). |
| `modules/audit/` | Audit trail/log aktivitas sistem.                           |
| `modules/auth/`  | Autentikasi dan otorisasi.                                  |
| `modules/roles/` | Manajemen role dan permission.                              |
| `modules/users/` | Manajemen data pengguna.                                    |
| `types/`         | Deklarasi tipe global/augmentasi Express.                   |
| `utils/`         | Helper utilitas umum (response/error, dll).                 |

### Dokumentasi (`docs/`)

| File                          | Fungsi                                           |
| ----------------------------- | ------------------------------------------------ |
| `backend-plan-users-roles.md` | Rencana desain/flow modul user dan role backend. |
| `postgresql-setup.md`         | Panduan setup PostgreSQL lokal/development.      |
| `folder-structure-guide.md`   | Peta fungsi folder utama project.                |

## 1) Folder root

- `docs/`  
  Dokumentasi teknis proyek (setup, plan backend, panduan operasional).

- `public/`  
  Aset statis frontend yang disajikan langsung oleh Vite (mis. file publik yang tidak diproses bundler).

- `server/`  
  Aplikasi backend (Express + Drizzle + PostgreSQL + Redis), termasuk konfigurasi, source code API, migrasi, dan script utilitas.

- `src/`  
  Aplikasi frontend (React + TypeScript), berisi routing, halaman, state/auth, dan komponen UI.

## 2) Folder dokumentasi (`docs/`)

- `backend-plan-users-roles.md`  
  Rencana desain/flow modul user dan role di backend.

- `postgresql-setup.md`  
  Panduan setup PostgreSQL untuk environment lokal/development.

## 3) Folder frontend (`src/`)

- `assets/`  
  Menyimpan aset frontend (gambar, ikon, dll) yang dipakai komponen/halaman.

- `auth/`  
  Layer autentikasi sisi client (API auth, manajemen sesi/token).

- `components/`  
  Komponen UI reusable.
  - `common/`: komponen umum lintas fitur (mis. shell/card).
  - `layout/`: komponen struktur layout aplikasi (header, sidebar, layout utama).

- `context/`  
  React Context provider/state global (khususnya context autentikasi).

- `hooks/`  
  Custom hooks React (mis. helper untuk akses auth/context).

- `pages/`  
  Halaman per domain fitur.
  - `attendance/`: fitur absensi, lembur, kalender kerja, shift, dll.
  - `auth/`: halaman login, lupa password, reset password.
  - `bot/`: fitur broadcast, template, auto-reply, log pesan.
  - `dashboard/`: ringkasan dashboard, notifikasi, hasil pencarian.
  - `employees/`: data karyawan (list, detail, tambah/edit, import, struktur).
  - `errors/`: halaman error (403, 404, maintenance, offline, server error).
  - `finance/`: fitur keuangan (income/expense, budgeting, kategori, laporan).
  - `payroll/`: fitur penggajian.
  - `reports/`: fitur laporan lintas domain.
  - `settings/`: pengaturan aplikasi.

## 4) Folder backend (`server/`)

- `scripts/`  
  Script utilitas backend (mis. reset schema auth).

- `src/`  
  Source code utama backend API.
  - `db/`: seed, migrasi, dan schema database.
  - `lib/`: inisialisasi library eksternal (auth, DB client, Redis).
  - `middleware/`: middleware Express (auth, RBAC, error handler, request-id).
  - `modules/`: modul fitur backend berbasis domain.
    - `audit/`: logging/audit trail aktivitas sistem.
    - `auth/`: autentikasi dan otorisasi.
    - `roles/`: manajemen role/permission.
    - `users/`: manajemen data pengguna.
  - `types/`: deklarasi tipe global/augmentasi tipe Express.
  - `utils/`: helper utilitas umum (format response/error, dll).

## 5) Catatan penggunaan

- Tambahkan folder baru mengikuti pemisahan domain yang sudah ada (frontend: `pages/<domain>`, backend: `modules/<domain>`).
- Simpan dokumentasi perubahan struktur di `docs/` agar tetap sinkron dengan implementasi.
