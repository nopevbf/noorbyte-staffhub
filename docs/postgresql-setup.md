# Setup PostgreSQL dari Nol (StaffHub)

Panduan ini untuk menyiapkan PostgreSQL lokal sampai backend `server/` StaffHub bisa jalan.

## 1) Install PostgreSQL (Windows)

### Opsi A — Installer resmi (disarankan)

1. Download installer PostgreSQL dari situs resmi: https://www.postgresql.org/download/windows/
2. Jalankan installer, lalu pastikan komponen berikut terpasang:
   - PostgreSQL Server
   - Command Line Tools (`psql`)
3. Saat diminta:
   - Port: `5432`
   - Superuser: `postgres`
   - Password: isi password kuat (catat password ini)
4. Selesaikan instalasi sampai service PostgreSQL aktif.

### Opsi B — via `winget`

Jalankan PowerShell sebagai Administrator:

```powershell
winget install -e --id PostgreSQL.PostgreSQL
```

> Setelah install via `winget`, pastikan lokasi `bin` PostgreSQL sudah masuk ke `PATH` agar perintah `psql` bisa dipanggil dari terminal.

## 2) Verifikasi instalasi

Jalankan:

```powershell
psql --version
```

Jika versi muncul, instalasi berhasil.

Jika command tidak dikenali, tambahkan folder `bin` PostgreSQL ke `PATH` (contoh umum):

```text
C:\Program Files\PostgreSQL\<versi>\bin
```

Lalu tutup-buka terminal dan cek ulang `psql --version`.

## 3) Buat database untuk StaffHub

Masuk ke PostgreSQL:

```powershell
psql -U postgres -h localhost -p 5432
```

Di prompt `psql`, jalankan:

```sql
CREATE DATABASE staffhub;
```

Verifikasi:

```sql
\l
```

Keluar:

```sql
\q
```

## 4) Konfigurasi environment backend

Di folder `server/`, buat `.env` dari contoh:

```powershell
Copy-Item .env.example .env
```

Isi `DATABASE_URL` di `server/.env`.

Jika user/password PostgreSQL Anda adalah `postgres` / `postgres`, gunakan:

```dotenv
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/staffhub
```

Jika password Anda berbeda, sesuaikan:

```dotenv
DATABASE_URL=postgresql://postgres:<password-anda>@localhost:5432/staffhub
```

## 5) Jalankan backend dengan migrasi

Di folder `server/`:

```powershell
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Health check:

- `http://localhost:4000/api/health`

Backend endpoints (users/roles first):

- `ALL /api/auth/*`
- `GET|POST|PUT|PATCH|DELETE /api/users`
- `GET|POST|PUT|DELETE /api/roles`
- `PUT /api/roles/:id/permissions`
- `GET /api/audit-logs`

> Route `users`, `roles`, and `audit-logs` are protected by auth + permission middleware.

## Troubleshooting cepat

- `password authentication failed for user "postgres"`
  - Password di `DATABASE_URL` tidak sesuai. Update `.env` dengan password yang benar.

- `database "staffhub" does not exist`
  - Jalankan kembali `CREATE DATABASE staffhub;`.

- `connect ECONNREFUSED 127.0.0.1:5432`
  - Service PostgreSQL belum jalan. Start service PostgreSQL dari Services Windows lalu coba lagi.

- `psql` tidak dikenali
  - Tambahkan folder `bin` PostgreSQL ke `PATH`, lalu restart terminal.
