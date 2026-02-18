import { Router } from 'express';
import authRoutes from './auth';
import employeeRoutes from './employees';
import dashboardRoutes from './dashboard';
import attendanceRoutes from './attendance';
import payrollRoutes from './payroll';
import financeRoutes from './finance';
import botRoutes from './bot';
import reportsRoutes from './reports';
import settingsRoutes from './settings';

const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/payroll', payrollRoutes);
router.use('/finance', financeRoutes);
router.use('/bot', botRoutes);
router.use('/reports', reportsRoutes);
router.use('/settings', settingsRoutes);

export default router;
