import { pgTable, serial, text, timestamp, boolean, uuid, date, decimal, time, integer, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'hr', 'finance', 'employee']);
export const employeeStatusEnum = pgEnum('employee_status', ['active', 'inactive', 'on_leave']);
export const contractTypeEnum = pgEnum('contract_type', ['permanent', 'contract', 'freelance']);
export const attendanceStatusEnum = pgEnum('attendance_status', ['present', 'late', 'half_day', 'absent']);
export const leaveTypeEnum = pgEnum('leave_type', ['annual', 'sick', 'unpaid', 'other']);
export const leaveStatusEnum = pgEnum('leave_status', ['pending', 'approved', 'rejected']);
export const payrollStatusEnum = pgEnum('payroll_status', ['draft', 'processing', 'completed']);
export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'completed', 'cancelled']);

// --- Auth & Users ---
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  name: text('name').notNull(),
  image: text('image'),
  role: userRoleEnum('role').default('employee'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- Employees ---
export const employees = pgTable('employees', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id), // Link to auth user if they have login
  employeeCode: text('employee_code').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  department: text('department'),
  position: text('position'),
  joinDate: date('join_date').notNull(),
  status: employeeStatusEnum('status').default('active'),
  contactPhone: text('contact_phone'),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const employeeContracts = pgTable('employee_contracts', {
  id: uuid('id').defaultRandom().primaryKey(),
  employeeId: uuid('employee_id').references(() => employees.id).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  type: contractTypeEnum('type').notNull(),
  baseSalary: decimal('base_salary', { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Attendance ---
export const shifts = pgTable('shifts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
});

export const attendanceLogs = pgTable('attendance_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  employeeId: uuid('employee_id').references(() => employees.id).notNull(),
  date: date('date').notNull(),
  checkInTime: timestamp('check_in_time'),
  checkOutTime: timestamp('check_out_time'),
  status: attendanceStatusEnum('status'),
  locationLat: decimal('location_lat', { precision: 10, scale: 8 }),
  locationLng: decimal('location_lng', { precision: 11, scale: 8 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leaves = pgTable('leaves', {
  id: uuid('id').defaultRandom().primaryKey(),
  employeeId: uuid('employee_id').references(() => employees.id).notNull(),
  type: leaveTypeEnum('type').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  reason: text('reason'),
  status: leaveStatusEnum('status').default('pending'),
  approvedBy: uuid('approved_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Payroll ---
export const payrollRuns = pgTable('payroll_runs', {
  id: uuid('id').defaultRandom().primaryKey(),
  period: text('period').notNull(), // YYYY-MM
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  status: payrollStatusEnum('status').default('draft'),
  totalGross: decimal('total_gross', { precision: 14, scale: 2 }).default('0'),
  totalNet: decimal('total_net', { precision: 14, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const payslips = pgTable('payslips', {
  id: uuid('id').defaultRandom().primaryKey(),
  payrollRunId: uuid('payroll_run_id').references(() => payrollRuns.id).notNull(),
  employeeId: uuid('employee_id').references(() => employees.id).notNull(),
  grossSalary: decimal('gross_salary', { precision: 12, scale: 2 }).notNull(),
  netSalary: decimal('net_salary', { precision: 12, scale: 2 }).notNull(),
  deductionsTotal: decimal('deductions_total', { precision: 12, scale: 2 }).default('0'),
  pdfUrl: text('pdf_url'),
  isSent: boolean('is_sent').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const salaryComponents = pgTable('salary_components', {
  id: uuid('id').defaultRandom().primaryKey(),
  payslipId: uuid('payslip_id').references(() => payslips.id).notNull(),
  type: text('type').notNull(), // allowance, deduction, bonus, etc.
  name: text('name').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
});

// --- Finance ---
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: transactionTypeEnum('type').notNull(),
  color: text('color'),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: transactionTypeEnum('type').notNull(),
  date: date('date').notNull(),
  amount: decimal('amount', { precision: 14, scale: 2 }).notNull(),
  description: text('description').notNull(),
  categoryId: uuid('category_id').references(() => categories.id),
  status: transactionStatusEnum('status').default('completed'),
  attachmentUrl: text('attachment_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// --- Bot ---
export const botSessions = pgTable('bot_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  phoneNumber: text('phone_number').notNull().unique(),
  isActive: boolean('is_active').default(true),
  lastInteraction: timestamp('last_interaction'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const botMessages = pgTable('bot_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').references(() => botSessions.id).notNull(),
  direction: text('direction').notNull(), // inbound, outbound
  content: text('content').notNull(),
  status: text('status').default('sent'), // sent, delivered, read, failed
  timestamp: timestamp('timestamp').defaultNow(),
});
