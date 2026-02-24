# Agents Guide – StaffHub

Panduan singkat untuk coding agent yang bekerja di repository ini.

## 1) Struktur Proyek

- Frontend (Vite + React + TypeScript): `./src`
- Backend (Express + Drizzle + Postgres + Redis): `./server/src`
- Dokumen teknis: `./docs`

## 2) Fokus Scope

- Kerjakan perubahan secara **minimal, terarah, dan sesuai request user**.
- Jangan ubah area yang tidak diminta.
- Pertahankan style code yang sudah ada.

## 3) Perintah Penting

### Frontend (root)

```bash
npm install
npm run dev
npm run build
```

### Backend (`./server`)

```bash
npm install
npm run dev
npm run db:migrate
npm run db:seed
```

## 4) Konvensi Kerja Agent

- Root-cause fix, hindari patch sementara.
- Jangan rename file/folder tanpa alasan kuat.
- Jangan menambah dependency baru jika bisa pakai stack yang sudah ada.
- Setiap fungsi, method, atau script baru **wajib** disertai penjelasan/dokumentasi singkat tentang tujuan, input/output, dan cara pakainya.
- Untuk endpoint backend, gunakan pola response/error helper yang sudah tersedia di `server/src/utils`.
- Untuk auth/permission, ikuti middleware existing di `server/src/middleware`.

## 5) Checklist Sebelum Selesai

- Build/lint area yang diubah.
- Tidak ada error TypeScript baru dari perubahan.
- Dokumentasi diperbarui jika ada command/flow baru.
- Ringkas perubahan + file yang diubah dalam handoff.

## 6) Catatan

- Setup PostgreSQL mengacu ke: `docs/postgresql-setup.md`
- Route backend ringkas mengacu ke: `server/README.md`

## 7) Peraturan Keamanan Tambahan

1. Configure CORS agar hanya mengizinkan request dari domain production `example.com` (untuk nanti).
2. Pastikan semua redirect URL divalidasi terhadap allowlist sebelum melakukan redirect user.
3. Buat storage policies agar user hanya bisa mengakses file yang mereka upload sendiri.
4. Hapus semua `console.log` dan ganti dengan mekanisme error logging yang proper.
5. Verifikasi webhook signature menggunakan Stripe SDK sebelum memproses data pembayaran apa pun.
6. Di server, cek `user.role === 'admin'` sebelum mengeksekusi aksi yang membutuhkan admin.
7. Setelah build, jalankan `npm audit fix` dan kirim pesan ke AI: "Are there breaking changes in the latest versions i should know about?"
8. Tambahkan rate limiting pada route reset password: maksimal 3 request per email per jam.
9. Tangkap semua error dan kembalikan pesan generik ke user; detail error hanya dilog di server-side.
10. Set JWT expiration ke 7 hari dan implementasikan refresh token rotation.
