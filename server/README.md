# StaffHub Server

Backend scaffold for users and roles using Express, Drizzle, Postgres, Redis, and Better Auth.

## Setup

1. Setup PostgreSQL dulu: lihat [../docs/postgresql-setup.md](../docs/postgresql-setup.md)
2. Copy env (PowerShell): `Copy-Item .env.example .env`
3. Install: `npm install`
4. Run migrations: `npm run db:migrate`
5. Seed defaults: `npm run db:seed`
6. Start dev server: `npm run dev`

## Key Routes

- `GET /api/health`
- `ALL /api/auth/*`
- `POST /api/auth/forgot-password` (redirect allowlist + rate limit 3x/email/jam)
- `POST /api/auth/rotate-refresh-token` (refresh token rotation)
- `POST /api/webhooks/stripe` (Stripe signature verification)
- `GET /api/users/me`
- `GET|POST|PUT|PATCH|DELETE /api/users`
- `GET|POST|PUT|DELETE /api/roles`
- `PUT /api/roles/:id/permissions`
- `GET /api/audit-logs`

## Security Controls (New)

- `withStrictCors` (`src/middleware/cors.middleware.ts`)
  - Tujuan: membatasi origin request lintas domain.
  - Input: header `Origin`.
  - Output: response CORS valid atau `403` generik jika origin tidak diizinkan.
  - Pakai: otomatis terpasang global di bootstrap server.

- `validateRedirectAllowlist` (`src/middleware/redirect-allowlist.middleware.ts`)
  - Tujuan: mencegah open redirect pada alur reset password.
  - Input: body `redirectTo`.
  - Output: lanjut ke handler auth bila valid, `400` generik bila tidak valid.
  - Pakai: terpasang pada route `POST /api/auth/forgot-password`.

- `rateLimitPasswordResetByEmail` (`src/middleware/rate-limit-password-reset.middleware.ts`)
  - Tujuan: membatasi reset password maksimal 3 request per email per jam.
  - Input: body `email`.
  - Output: `429` bila melewati limit.
  - Pakai: terpasang pada route `POST /api/auth/forgot-password`.

- `verifyStripeWebhookSignature` (`src/middleware/stripe-webhook.middleware.ts`)
  - Tujuan: verifikasi signature webhook Stripe sebelum payload diproses.
  - Input: raw body + header `stripe-signature`.
  - Output: event terverifikasi di `req.stripeEvent` atau `400/503` generik.
  - Pakai: terpasang pada route `POST /api/webhooks/stripe`.

- `rotateRefreshToken` (`src/modules/auth/refresh-token.service.ts`)
  - Tujuan: merotasi refresh token akun credential agar token lama invalid.
  - Input: `userId` + token refresh lama (opsional).
  - Output: refresh token baru + waktu kedaluwarsa baru.
  - Pakai: dipanggil oleh `POST /api/auth/rotate-refresh-token`.

- `storage-owner-policies.sql` (`scripts/storage-owner-policies.sql`)
  - Tujuan: template PostgreSQL RLS agar user hanya mengakses file miliknya sendiri.
  - Input: tabel `public.uploaded_files` dengan kolom `uploader_user_id`.
  - Output: policy SELECT/INSERT/UPDATE/DELETE berbasis `app.current_user_id`.
  - Pakai: jalankan script SQL ini setelah tabel upload tersedia.

## QA Checklist Pasca Upgrade

1. **Build & startup**
   - Jalankan `npm run build` di folder `server` dan pastikan sukses.
   - Jalankan `npm run dev` lalu cek `GET /api/health` mengembalikan status sehat.

2. **CORS policy**
   - Uji request dari origin yang ada di `CORS_ALLOWED_ORIGINS`/`PRODUCTION_DOMAIN` harus lolos.
   - Uji request dari origin lain harus ditolak dengan respons generik.

3. **Forgot password hardening**
   - `POST /api/auth/forgot-password` dengan `redirectTo` dalam allowlist harus diterima.
   - `redirectTo` di luar allowlist harus ditolak.
   - Kirim 4 request reset untuk email yang sama dalam 1 jam: request ke-4 harus `429`.

4. **Admin guard**
   - Login sebagai non-admin: aksi create/update/delete user/role harus `403`.
   - Login sebagai admin: aksi tersebut tetap berjalan normal (sesuai permission lain).

5. **Stripe webhook**
   - Kirim webhook Stripe dengan signature valid: endpoint `/api/webhooks/stripe` harus diterima.
   - Kirim signature invalid/missing: endpoint harus menolak request.

6. **Refresh token rotation**
   - Panggil `POST /api/auth/rotate-refresh-token` saat authenticated: refresh token harus berubah.
   - Ulangi pakai token lama: harus ditolak.

7. **Error handling & logging**
   - Trigger error validasi dan internal error.
   - Pastikan client menerima pesan generik.
   - Pastikan detail error hanya muncul di server log.

Template request siap pakai ada di `docs/qa-request-templates.md`.
Template Postman Collection siap import ada di `docs/qa-postman-collection.json`.

## Notes

- `users` and `roles` modules are service-based (`*.routes.ts` + `*.service.ts`).
- `db:seed` creates default roles and one initial admin user.
- Current credential insert in `users.service.ts` is scaffold-level and should be replaced by Better Auth native user-creation flow before production rollout.
