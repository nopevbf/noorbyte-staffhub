import { eq } from "drizzle-orm";
import { pathToFileURL } from "node:url";
import { db } from "../lib/db.js";
import { auth } from "../lib/auth.js";
import { rolePermissions } from "./schema/role-permissions.js";
import { roles } from "./schema/roles.js";
import { users } from "./schema/users.js";

const modules = [
  "dashboard",
  "employees",
  "attendance",
  "payroll",
  "finance",
  "bot",
  "reports",
  "settings",
];

async function seedRolesAndPermissions() {
  const defaultRoles = [
    { name: "Super Admin", isSystem: true },
    { name: "HR Admin", isSystem: true },
    { name: "Finance", isSystem: true },
    { name: "Manager", isSystem: false },
  ];

  for (const role of defaultRoles) {
    const existing = await db.query.roles.findFirst({
      where: (table, { eq }) => eq(table.name, role.name),
    });

    if (!existing) {
      const [created] = await db.insert(roles).values(role).returning();

      for (const module of modules) {
        await db.insert(rolePermissions).values({
          roleId: created.id,
          module,
          canView: true,
          canCreate: role.name === "Super Admin",
          canEdit: role.name === "Super Admin",
          canDelete: role.name === "Super Admin",
          canExport: role.name === "Super Admin",
        });
      }
    }
  }
}

async function seedInitialAdmin() {
  const adminEmail = "admin@noorbyte.com";
  const adminPassword = "admin123";
  const adminName = "Admin User";

  const existingAdmin = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, adminEmail),
  });

  const superAdmin = await db.query.roles.findFirst({
    where: (table, { eq }) => eq(table.name, "Super Admin"),
  });

  if (!superAdmin) {
    throw new Error("Super Admin role must exist before seeding admin user");
  }

  if (existingAdmin) {
    await db.delete(users).where(eq(users.id, existingAdmin.id));
  }

  await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
      name: adminName,
    },
  });

  const createdAdmin = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, adminEmail),
  });

  if (!createdAdmin) {
    throw new Error("Failed to create admin user with Better Auth");
  }

  await db
    .update(users)
    .set({
      name: adminName,
      roleId: superAdmin.id,
      status: "active",
      updatedAt: new Date(),
    })
    .where(eq(users.id, createdAdmin.id));
}

export async function seed() {
  await seedRolesAndPermissions();
  await seedInitialAdmin();
}

const isDirectRun =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  seed()
    .then(() => {
      process.stdout.write("Seed completed\n");
      process.exit(0);
    })
    .catch((error) => {
      process.stderr.write(`Seed failed: ${String(error)}\n`);
      process.exit(1);
    });
}
