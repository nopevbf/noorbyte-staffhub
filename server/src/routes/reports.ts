import { Router } from 'express';
import { db } from '../db';
import { attendanceLogs, payrollRuns, transactions } from '../db/schema';
import { sql, desc } from 'drizzle-orm';

const router = Router();

// Attendance Report (Mock aggregate)
router.get('/attendance', async (req, res) => {
  // Return attendance stats grouped by date
  res.json({
    summary: 'Attendance Report Data',
    data: [
      { date: '2026-02-17', present: 230, late: 5, absent: 2 },
      { date: '2026-02-16', present: 235, late: 2, absent: 0 },
    ]
  });
});

// Payroll Report
router.get('/payroll', async (req, res) => {
  try {
    const runs = await db.select().from(payrollRuns).orderBy(desc(payrollRuns.period));
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll report' });
  }
});

// Financial Report overview
router.get('/financial', async (req, res) => {
  // Aggregate income vs expense by month
  res.json({
    summary: 'Financial Performance 2026',
    data: [
        { month: 'Jan', income: 450000000, expense: 320000000 },
        { month: 'Feb', income: 280000000, expense: 150000000 },
    ]
  });
});

export default router;
