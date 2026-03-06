export * from "./accounts.js";
export * from "./audit-logs.js";
export * from "./branches.js";
export * from "./role-permissions.js";
export * from "./roles.js";
export * from "./sessions.js";
export * from "./users.js";
export * from "./verifications.js";

import { accounts } from "./accounts.js";
import { sessions } from "./sessions.js";
import { users } from "./users.js";
import { verifications } from "./verifications.js";

export const account = accounts;
export const session = sessions;
export const user = users;
export const verification = verifications;
