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
- `GET /api/users/me`
- `GET|POST|PUT|PATCH|DELETE /api/users`
- `GET|POST|PUT|DELETE /api/roles`
- `PUT /api/roles/:id/permissions`
- `GET /api/audit-logs`

## Notes

- `users` and `roles` modules are service-based (`*.routes.ts` + `*.service.ts`).
- `db:seed` creates default roles and one initial admin user.
- Current credential insert in `users.service.ts` is scaffold-level and should be replaced by Better Auth native user-creation flow before production rollout.
