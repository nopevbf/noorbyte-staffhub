---
name: staffhub-task-workflow
description: 'Jalankan task coding StaffHub dengan perubahan minimal dan terarah di frontend React dan backend Express, termasuk root-cause fix, validasi, dan handoff. Gunakan saat implementasi fitur, bug fix, atau refactor di repo ini.'
argument-hint: 'Perubahan apa yang dibutuhkan di StaffHub? Sertakan scope (frontend/backend/fullstack) dan kriteria sukses.'
---

# StaffHub Task Workflow

## Tujuan
Menghasilkan perubahan StaffHub yang minimal, terarah, aman untuk produksi, dan mudah diverifikasi.

## Kapan Digunakan
- Saat mengimplementasikan atau memperbaiki kode di repository ini.
- Saat butuh workflow yang konsisten untuk perubahan frontend, backend, atau fullstack.
- Saat ingin memastikan konvensi proyek dari `agents.md` tetap dipatuhi.

## Input
- Request user dan perilaku yang diharapkan.
- Scope perubahan: `frontend`, `backend`, atau `fullstack`.
- Batasan: file/modul yang tidak boleh disentuh.

## Prosedur
1. Konfirmasi scope tugas dan kriteria sukses.
2. Petakan hanya area yang terdampak:
   - Frontend: `src/**`
   - Backend: `server/src/**`
   - Dokumen: `docs/**` dan `server/docs/**`
3. Baca pola existing sebelum edit:
   - Ikuti style kode dan pola modul yang sudah ada.
   - Untuk endpoint backend, gunakan helper di `server/src/utils`.
   - Untuk auth/permission, ikuti middleware di `server/src/middleware`.
4. Implementasikan root-cause fix, bukan patch sementara:
   - Pertahankan perubahan tetap minimal dan terarah.
   - Hindari rename/move file kecuali benar-benar perlu.
   - Hindari dependency baru jika stack saat ini sudah cukup.
5. Terapkan validasi sesuai area perubahan:
   - Perubahan frontend: jalankan cek root (`npm run build`, opsional `npm run lint`).
   - Perubahan backend: jalankan cek server (`npm run build` dan `npm run typecheck` di `server`).
   - Perubahan DB/schema: sertakan catatan migrasi/seed dan command yang relevan.
6. Terapkan security checklist secara kondisional untuk task auth/payment/redirect backend:
   - Redirect URL divalidasi terhadap allowlist.
   - Aksi admin-only memeriksa role (`user.role === 'admin'`).
   - Webhook Stripe memverifikasi signature sebelum memproses payload.
   - Error response ke client bersifat generik; detail error hanya di server logging.
   - Route reset password tetap dibatasi rate limit.
7. Tambahkan dokumentasi singkat saat membuat fungsi, method, atau script baru:
   - Tujuan
   - Input/output
   - Cara pakai
8. Jalankan checklist penyelesaian:
   - Tidak menambah error TypeScript baru pada area yang diubah.
   - Build/lint/typecheck untuk area yang disentuh lolos.
   - Dokumentasi diperbarui bila ada command atau flow baru.
9. Buat ringkasan handoff:
   - Perubahan apa dan alasannya.
   - Daftar file yang diubah.
   - Command validasi yang dijalankan beserta hasil ringkasnya.
   - Risiko lanjutan atau next step.

## Titik Keputusan
- Jika request belum jelas, minta expected behavior dan acceptance criteria sebelum coding.
- Jika perubahan menyentuh modul yang tidak terkait, pecah jadi fase dan konfirmasi prioritas.
- Jika solusi berbenturan dengan konvensi existing, dahulukan konvensi existing dan jelaskan tradeoff.

## Standar Kualitas
- Perubahan tetap sesuai request tanpa churn di area lain.
- Solusi menyelesaikan akar masalah dan menjaga arsitektur existing.
- Validasi dapat diulang dengan command yang jelas.
- Handoff singkat, jelas, dan bisa langsung ditindaklanjuti.

## Referensi Proyek
- Guardrails workflow: `agents.md`
- Aplikasi frontend: `src/`
- Aplikasi backend: `server/src/`
- Setup Postgres: `docs/postgresql-setup.md`
- Ringkasan route backend: `server/README.md`
