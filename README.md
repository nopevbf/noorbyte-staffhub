# Noorbyte StaffHub

Web app Human Resource Information System (HRIS) berbasis React + TypeScript + Vite untuk operasional SDM end-to-end: karyawan, absensi, payroll, finance, report, dan bot komunikasi.

## Stack

- React 19
- TypeScript
- Vite 7
- React Router 7
- ESLint 9

## Modul Utama

Routing aplikasi terpusat di `src/router.tsx` dan dibagi ke area berikut:

- Auth: login, lupa password, reset password
- Dashboard: home, notifikasi, pencarian
- Employees: master data karyawan, kontrak, struktur, bulk import
- Attendance: live monitor, ringkasan, lembur, cuti, kalender kerja, shift
- Payroll: proses payroll, histori, detail slip, master salary/overtime/deduction, pajak
- Finance: income, expense, kategori, budgeting, report viewer
- Bot: status bot, log percakapan, broadcast, auto-reply, template, sinkron kontak
- Reports: report center, report builder, scheduled reports
- Settings: company profile, work hours, lokasi, users/roles, notification, integrations, backup, audit log

## Menjalankan Proyek

Prasyarat:

- Node.js 20+ (disarankan LTS terbaru)
- npm 10+

Instal dependency:

```bash
npm install
```

Environment file belum digunakan saat ini.

Saat integrasi API dimulai, tambahkan file `.env` di root proyek dan isi variabel `VITE_*` sesuai kebutuhan.

Jalankan mode development:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Linting:

```bash
npm run lint
```

Preview hasil build:

```bash
npm run preview
```

## Struktur Direktori Ringkas

- `src/components/layout`: shell utama (`Sidebar`, `Header`, `AppLayout`)
- `src/components/common`: komponen reusable
- `src/pages/*`: halaman per domain fitur
- `src/router.tsx`: definisi rute + lazy loading
- `src/main.tsx`: entry point aplikasi

## Alur Pengembangan Harian

1. Jalankan `npm run dev`
2. Buka `http://localhost:5173`
3. Akses halaman login di `/login`
4. Navigasi modul dari sidebar untuk review UI per domain

## Status Implementasi Saat Ini

- Fokus saat ini adalah front-end (UI/UX) dengan data statis.
- Belum ada integrasi API/backend aktif.
- Sudah ada guard autentikasi sederhana di level router berbasis `localStorage` (kunci: `staffhub_auth`).
- State autentikasi dikelola terpusat lewat `AuthProvider` (`src/context/AuthContext.tsx`) untuk aksi login/logout yang konsisten.
- Sesi login memiliki timeout otomatis 8 jam (`AUTH_SESSION_TTL_MS`) dan akan divalidasi ulang berkala saat aplikasi aktif.

## Catatan

- Seluruh halaman dimuat secara lazy untuk mempercepat initial load.
- Halaman error utility tersedia di `/403`, `/500`, `/maintenance`, dan `/offline`.
