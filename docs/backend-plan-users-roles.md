# StaffHub Backend Plan — Users & Roles

> Stack: **Express.js** · **Drizzle ORM** · **PostgreSQL** · **Redis** · **Better Auth**

---

## 1. Frontend Observations (source of truth)

| Page / Component     | Key Fields & Behaviour                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login**            | Email + password login. No registration — admin-created accounts only.                                                                                                                    |
| **ForgotPassword**   | Sends a reset link to email.                                                                                                                                                              |
| **ResetPassword**    | New password + confirm password (token-based).                                                                                                                                            |
| **UsersRoles list**  | Columns: Name, Email, **Role** (badge), **Branch**, Status (Active/Inactive). "Add User" button.                                                                                          |
| **UserForm**         | Fields: Full Name, Email, Role (`Super Admin`, `HR Admin`, `Finance`, `Manager`), Branch Access (`All Branches` or a specific branch).                                                    |
| **RolesPermissions** | Permission matrix — **Modules** × **Actions**. Modules: Dashboard, Employees, Attendance, Payroll, Finance, WhatsApp Bot, Reports, Settings. Actions: View, Create, Edit, Delete, Export. |
| **Sidebar footer**   | Displays current user avatar initials, name, role label.                                                                                                                                  |
| **AuditLog**         | Columns: Time, User, Action (CREATE/UPDATE/DELETE/BACKUP), Resource, Details.                                                                                                             |
| **Session (client)** | localStorage boolean + TTL (8 h). No token/JWT stored yet — this will be replaced by Better Auth server sessions.                                                                         |

---

## 2. Database Schema (Drizzle + PostgreSQL)

### 2.1 `users` — Better Auth core table

Better Auth manages its own `user` and `session` tables. We extend the user table with app-specific columns.

```ts
// src/db/schema/users.ts
import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: varchar("image", { length: 512 }),

  // ── app-specific ──
  roleId: uuid("role_id").references(() => roles.id),
  branchId: uuid("branch_id").references(() => branches.id), // null = all branches
  status: varchar("status", { length: 20 }).notNull().default("active"), // active | inactive
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### 2.2 `sessions` — Better Auth session table

```ts
// src/db/schema/sessions.ts
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 512 }).notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ipAddress: varchar("ip_address", { length: 64 }),
  userAgent: varchar("user_agent", { length: 512 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### 2.3 `accounts` — Better Auth OAuth / credential accounts

```ts
// src/db/schema/accounts.ts
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(), // "credential" | "google"…
  accessToken: varchar("access_token", { length: 1024 }),
  refreshToken: varchar("refresh_token", { length: 1024 }),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true,
  }),
  scope: varchar("scope", { length: 512 }),
  password: varchar("password", { length: 255 }), // hashed — credential provider
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### 2.4 `verifications` — Better Auth email verification / password reset tokens

```ts
// src/db/schema/verifications.ts
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const verifications = pgTable("verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: varchar("identifier", { length: 255 }).notNull(), // email
  value: varchar("value", { length: 512 }).notNull(), // token hash
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### 2.5 `roles`

```ts
// src/db/schema/roles.ts
import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(), // "Super Admin", "HR Admin" …
  description: varchar("description", { length: 500 }),
  isSystem: boolean("is_system").notNull().default(false), // protect built-in roles
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### 2.6 `role_permissions`

```ts
// src/db/schema/role-permissions.ts
import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),

    // module = dashboard | employees | attendance | payroll | finance | bot | reports | settings
    module: varchar("module", { length: 50 }).notNull(),

    // actions
    canView: boolean("can_view").notNull().default(false),
    canCreate: boolean("can_create").notNull().default(false),
    canEdit: boolean("can_edit").notNull().default(false),
    canDelete: boolean("can_delete").notNull().default(false),
    canExport: boolean("can_export").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    uniqueRoleModule: uniqueIndex("uq_role_module").on(t.roleId, t.module),
  }),
);
```

### 2.7 `branches` (referenced by users)

```ts
// src/db/schema/branches.ts
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 500 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### 2.8 `audit_logs`

```ts
// src/db/schema/audit-logs.ts
import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 20 }).notNull(), // CREATE | UPDATE | DELETE | BACKUP …
  resource: varchar("resource", { length: 100 }).notNull(), // Employee | Leave | Document …
  resourceId: varchar("resource_id", { length: 100 }),
  details: text("details"), // human-readable or JSON diff
  ipAddress: varchar("ip_address", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

### ER Diagram (text)

```
┌──────────┐       ┌───────────────────┐       ┌──────────┐
│ branches │◄──────│       users       │──────►│  roles   │
└──────────┘  ?:1  │  (better-auth)    │  N:1  └────┬─────┘
                   └─────────┬─────────┘             │
                       1:N   │                  1:N  │
                   ┌─────────▼─────────┐  ┌─────────▼──────────┐
                   │     sessions      │  │  role_permissions   │
                   │  (better-auth)    │  │  (module × actions) │
                   └───────────────────┘  └────────────────────┘
                   ┌───────────────────┐
                   │     accounts      │  (credentials / OAuth)
                   └───────────────────┘
                   ┌───────────────────┐
                   │   verifications   │  (email verify / pw reset)
                   └───────────────────┘
                   ┌───────────────────┐
                   │    audit_logs     │
                   └───────────────────┘
```

---

## 3. Redis Usage

| Key Pattern                    | Purpose                      | TTL    |
| ------------------------------ | ---------------------------- | ------ |
| `session:<token>`              | Better Auth session cache    | 8 h    |
| `user:<userId>:permissions`    | Cached flat permission map   | 15 min |
| `rate:login:<ip>`              | Login rate limiter (5 / min) | 1 min  |
| `rate:forgot-password:<email>` | Forgot-password rate limiter | 5 min  |

---

## 4. Project Structure

```
server/
├── src/
│   ├── index.ts                  # Express app bootstrap
│   ├── env.ts                    # Environment config (zod validated)
│   ├── lib/
│   │   ├── auth.ts               # Better Auth instance config
│   │   ├── db.ts                 # Drizzle client + pool
│   │   └── redis.ts              # ioredis client
│   ├── db/
│   │   ├── schema/
│   │   │   ├── index.ts          # re-exports all schemas
│   │   │   ├── users.ts
│   │   │   ├── sessions.ts
│   │   │   ├── accounts.ts
│   │   │   ├── verifications.ts
│   │   │   ├── roles.ts
│   │   │   ├── role-permissions.ts
│   │   │   ├── branches.ts
│   │   │   └── audit-logs.ts
│   │   ├── migrations/           # Drizzle Kit generated
│   │   └── seed.ts               # Default roles & super-admin
│   ├── middleware/
│   │   ├── auth.middleware.ts     # Validate session (Better Auth)
│   │   ├── rbac.middleware.ts     # Check permission (module + action)
│   │   └── rate-limit.middleware.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts    # POST /auth/** (Better Auth handler)
│   │   │   └── auth.service.ts   # Login hooks, audit logging
│   │   ├── users/
│   │   │   ├── users.routes.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.validator.ts
│   │   └── roles/
│   │       ├── roles.routes.ts
│   │       ├── roles.service.ts
│   │       └── roles.validator.ts
│   └── utils/
│       ├── api-response.ts       # Standardised { success, data, error }
│       ├── api-error.ts          # Custom AppError class
│       └── logger.ts             # pino / winston
├── drizzle.config.ts
├── package.json
└── tsconfig.json
```

---

## 5. API Routes

### 5.1 Auth — `POST /api/auth/**`

Better Auth handles these routes automatically when mounted:

| Method | Path                        | Purpose                              | Auth? |
| ------ | --------------------------- | ------------------------------------ | ----- |
| POST   | `/api/auth/sign-in/email`   | Email + password sign-in             | No    |
| POST   | `/api/auth/sign-out`        | Destroy session                      | Yes   |
| POST   | `/api/auth/forgot-password` | Send reset email                     | No    |
| POST   | `/api/auth/reset-password`  | Apply new password via token         | No    |
| GET    | `/api/auth/get-session`     | Return current session + user + role | Yes   |

> **Note:** Sign-up is intentionally disabled. Users are admin-created via the Users API.

### 5.2 Users — `/api/users`

| Method | Path                    | Purpose                                           | Permission Required  |
| ------ | ----------------------- | ------------------------------------------------- | -------------------- |
| GET    | `/api/users`            | List users (paginated)                            | `settings.canView`   |
| GET    | `/api/users/me`         | Current user session context (role + permissions) | Authenticated        |
| GET    | `/api/users/:id`        | Get single user                                   | `settings.canView`   |
| POST   | `/api/users`            | Create user (admin-invite)                        | `settings.canCreate` |
| PUT    | `/api/users/:id`        | Update user profile/role                          | `settings.canEdit`   |
| PATCH  | `/api/users/:id/status` | Toggle active/inactive                            | `settings.canEdit`   |
| DELETE | `/api/users/:id`        | Soft-delete / deactivate                          | `settings.canDelete` |

### 5.3 Roles — `/api/roles`

| Method | Path                         | Purpose                       | Permission Required  |
| ------ | ---------------------------- | ----------------------------- | -------------------- |
| GET    | `/api/roles`                 | List all roles                | `settings.canView`   |
| GET    | `/api/roles/:id`             | Get role + permissions matrix | `settings.canView`   |
| POST   | `/api/roles`                 | Create new role               | `settings.canCreate` |
| PUT    | `/api/roles/:id`             | Update role name/description  | `settings.canEdit`   |
| PUT    | `/api/roles/:id/permissions` | Upsert permission matrix      | `settings.canEdit`   |
| DELETE | `/api/roles/:id`             | Delete role (if not system)   | `settings.canDelete` |

### 5.4 Audit Logs — `/api/audit-logs`

| Method | Path              | Purpose                                                     | Permission Required |
| ------ | ----------------- | ----------------------------------------------------------- | ------------------- |
| GET    | `/api/audit-logs` | Paginated list (filter: user, action, resource, date range) | `settings.canView`  |

---

## 6. Service Layer Detail

### 6.1 `auth.service.ts`

```ts
// Hooks into Better Auth lifecycle
export const authService = {
  /** Called after successful sign-in — log audit entry */
  onSignIn(userId: string, ip: string): Promise<void>,

  /** Called after sign-out */
  onSignOut(userId: string): Promise<void>,

  /** Send password-reset email via verification token */
  sendPasswordResetEmail(email: string): Promise<void>,
};
```

### 6.2 `users.service.ts`

```ts
export const usersService = {
  list(filters: { search?: string; roleId?: string; status?: string; page: number; limit: number }),
  getById(id: string),
  create(data: { name: string; email: string; password: string; roleId: string; branchId?: string }),
  update(id: string, data: Partial<UserUpdate>),
  updateStatus(id: string, status: "active" | "inactive"),
  remove(id: string),                              // soft-delete: set status = inactive
};
```

### 6.3 `roles.service.ts`

```ts
export const rolesService = {
  list(),
  getById(id: string),                             // includes permissions
  create(data: { name: string; description?: string }),
  update(id: string, data: Partial<RoleUpdate>),
  upsertPermissions(roleId: string, permissions: PermissionMatrix[]),
  remove(id: string),
  /** Flatten permissions into a map and cache in Redis */
  getPermissionsForRole(roleId: string): Promise<PermissionMap>,
};

// Types
type PermissionMatrix = {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
};

type PermissionMap = Record<string, {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
}>;
```

---

## 7. Middleware Detail

### 7.1 `auth.middleware.ts`

```ts
import { fromNodeHeaders } from "better-auth/node";

/** Validates session via Better Auth, attaches `req.user` and `req.session` */
export async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session)
    return res.status(401).json({ success: false, error: "Unauthorized" });

  req.user = session.user;
  req.session = session.session;
  next();
}
```

### 7.2 `rbac.middleware.ts`

```ts
/**
 * Usage: router.get("/", requireAuth, requirePermission("employees", "canView"), handler)
 *
 * 1. Read user.roleId
 * 2. Fetch permissions from Redis cache (or DB fallback)
 * 3. Check if module.action is true
 */
export function requirePermission(module: string, action: keyof PermissionActions) {
  return async (req, res, next) => { ... };
}
```

---

## 8. Better Auth Config

```ts
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // admin-created accounts
  },
  session: {
    expiresIn: 60 * 60 * 8, // 8 hours (matches frontend TTL)
    updateAge: 60 * 15, // refresh session every 15 min
  },
  user: {
    additionalFields: {
      roleId: { type: "string", required: false },
      branchId: { type: "string", required: false },
      status: { type: "string", required: false, defaultValue: "active" },
    },
  },
  advanced: {
    cookiePrefix: "staffhub",
  },
});
```

---

## 9. Seed Data

```ts
// src/db/seed.ts
const DEFAULT_ROLES = [
  { name: "Super Admin", isSystem: true },
  { name: "HR Admin", isSystem: true },
  { name: "Finance", isSystem: true },
  { name: "Manager", isSystem: false },
];

const MODULES = [
  "dashboard",
  "employees",
  "attendance",
  "payroll",
  "finance",
  "bot",
  "reports",
  "settings",
];

// Super Admin gets all permissions = true
// Other roles get view-only defaults
// Creates initial admin@noorbyte.com user with "Super Admin" role
```

---

## 10. Implementation Order

| #   | Task                                              | Status |
| --- | ------------------------------------------------- | ------ |
| 1   | Scaffold `server/` with Express + TS              | ☐      |
| 2   | Set up Drizzle + PostgreSQL connection            | ☐      |
| 3   | Set up Redis client                               | ☐      |
| 4   | Define all schema files (users, roles, etc.)      | ☐      |
| 5   | Run `drizzle-kit generate` + `migrate`            | ☐      |
| 6   | Configure Better Auth with Drizzle adapter        | ☐      |
| 7   | Mount Better Auth handler at `/api/auth/**`       | ☐      |
| 8   | Build `auth.middleware.ts` + `rbac.middleware.ts` | ☐      |
| 9   | Build `roles.service.ts` + `roles.routes.ts`      | ☐      |
| 10  | Build `users.service.ts` + `users.routes.ts`      | ☐      |
| 11  | Build audit-log utility + route                   | ☐      |
| 12  | Write seed script                                 | ☐      |
| 13  | Wire up Redis caching for sessions & perms        | ☐      |
| 14  | Add rate-limiting middleware                      | ☐      |
| 15  | Update frontend auth to use Better Auth client    | ☐      |

---

## 11. API Contracts (v1)

### 11.1 Shared response envelope

```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "req_01J..."
  }
}
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [{ "field": "email", "message": "Invalid email format" }]
  },
  "meta": {
    "requestId": "req_01J..."
  }
}
```

### 11.2 Users API payloads

`POST /api/users`

```json
{
  "name": "HR Manager",
  "email": "hr@noorbyte.com",
  "password": "TempPass#2026",
  "roleId": "f5901934-9d9c-4f59-b7e2-684dc0b88272",
  "branchId": "4e50ab53-c244-4bb0-9c77-d9d6fe565100"
}
```

`PUT /api/users/:id`

```json
{
  "name": "HR Lead",
  "roleId": "f5901934-9d9c-4f59-b7e2-684dc0b88272",
  "branchId": null
}
```

`PATCH /api/users/:id/status`

```json
{
  "status": "inactive"
}
```

`GET /api/users` query params

```txt
?search=hr&roleId=<uuid>&status=active&page=1&limit=20&sortBy=createdAt&sortDir=desc
```

### 11.3 Roles API payloads

`POST /api/roles`

```json
{
  "name": "Payroll Admin",
  "description": "Handles payroll operations"
}
```

`PUT /api/roles/:id/permissions`

```json
{
  "permissions": [
    {
      "module": "payroll",
      "canView": true,
      "canCreate": true,
      "canEdit": true,
      "canDelete": false,
      "canExport": true
    },
    {
      "module": "employees",
      "canView": true,
      "canCreate": false,
      "canEdit": false,
      "canDelete": false,
      "canExport": false
    }
  ]
}
```

### 11.4 Session payload (for frontend)

`GET /api/auth/get-session`

```json
{
  "success": true,
  "data": {
    "session": {
      "id": "4f5774cd-b780-4682-a93c-a49b4b3077c9",
      "expiresAt": "2026-02-19T18:30:00.000Z"
    },
    "user": {
      "id": "cdd66f67-a269-49dc-bd3a-684f2c090851",
      "name": "Admin User",
      "email": "admin@noorbyte.com",
      "status": "active",
      "role": {
        "id": "3f95b0f8-5d9a-4b9f-a4ee-ff5fd9fd5e2d",
        "name": "Super Admin"
      },
      "branch": null,
      "permissions": {
        "settings": {
          "canView": true,
          "canCreate": true,
          "canEdit": true,
          "canDelete": true,
          "canExport": true
        }
      }
    }
  }
}
```

---

## 12. Route-to-Service Split (Express)

### 12.1 Users module

- `users.routes.ts`
  - only request validation, middleware wiring, and `res.json(...)`
- `users.service.ts`
  - DB logic (Drizzle), email uniqueness checks, role existence checks, audit logging
- `users.repository.ts` (optional but recommended)
  - isolate Drizzle queries for easier testing and reuse

### 12.2 Roles module

- `roles.routes.ts`
  - role CRUD endpoint handlers
- `roles.service.ts`
  - business rules: system-role protection, permission upsert, cache invalidation
- `roles.cache.ts`
  - helper for `user:<userId>:permissions` and `role:<roleId>:permissions`

### 12.3 Auth module

- `auth.routes.ts`
  - mount Better Auth handler under `/api/auth`
- `auth.service.ts`
  - Better Auth lifecycle hooks + rate-limit checks + audit events

---

## 13. Migration Plan (Drizzle)

### 13.1 Migration sequence

1. Create base tables: `branches`, `roles`.
2. Create Better Auth tables: `users`, `sessions`, `accounts`, `verifications`.
3. Add RBAC and logs: `role_permissions`, `audit_logs`.
4. Add indexes and constraints.
5. Seed defaults.

### 13.2 Required indexes

- `users(email)` unique
- `users(role_id)`
- `users(branch_id)`
- `users(status)`
- `role_permissions(role_id, module)` unique
- `audit_logs(created_at)`
- `audit_logs(user_id, created_at)`
- `sessions(token)` unique
- `sessions(user_id)`

### 13.3 Data integrity rules

- Prevent deletion of `roles.isSystem = true`.
- Prevent assigning inactive roles to users.
- Prevent role deletion if still referenced by active users.
- When user is deactivated, invalidate all active sessions.

---

## 14. Users & Roles First Delivery (Sprint Plan)

### Sprint A — Foundation (Day 1-2)

- Bootstrap `server/` and env config.
- Wire PostgreSQL + Drizzle + Redis.
- Add schema and run initial migration.
- Add seed script for default roles and admin account.

### Sprint B — Auth + Session (Day 3-4)

- Configure Better Auth with Drizzle adapter.
- Expose `/api/auth/*` endpoints.
- Implement `requireAuth` middleware.
- Return role + permission payload from session endpoint.

### Sprint C — Roles (Day 5-6)

- Implement roles CRUD.
- Implement permission matrix upsert endpoint.
- Add Redis permission cache + invalidation.
- Add protection for system roles.

### Sprint D — Users (Day 7-8)

- Implement user CRUD + status toggle.
- Add role/branch validation and unique email guard.
- Invalidate user sessions on deactivation.
- Emit audit logs for user and role changes.

### Sprint E — Hardening (Day 9-10)

- Add rate limiters (login, forgot-password).
- Add request validation and error normalization.
- Add integration tests for auth/users/roles flows.
- Finalize API docs for frontend integration.

---

## 15. Definition of Done (Users & Roles)

- Login, logout, forgot-password, reset-password all work via Better Auth endpoints.
- Users page can list/create/edit/deactivate users against real API.
- Roles page can list/create/edit roles and persist permissions matrix.
- RBAC middleware blocks unauthorized requests by module/action.
- Permission cache is used and invalidated correctly after role updates.
- Audit logs are written for sign-in, sign-out, user CRUD, and role updates.
- Seed creates one super admin and default role matrix.
- API returns consistent success/error envelopes with request IDs.
