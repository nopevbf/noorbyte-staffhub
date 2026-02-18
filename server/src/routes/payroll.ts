import { Router } from 'express';
import { db } from '../db';
import { payrollRuns, payslips, employees, employeeContracts } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Get Payroll History
router.get('/runs', async (req, res) => {
  try {
    const history = await db.select().from(payrollRuns).orderBy(desc(payrollRuns.period));
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll history' });
  }
});

// Run Payroll Calculation (Mock implementation)
router.post('/runs/generate', async (req, res) => {
  const { period, startDate, endDate } = req.body;

  try {
    // 1. Create Payroll Run
    const [run] = await db.insert(payrollRuns).values({
      period,
      startDate,
      endDate,
      status: 'processing',
    }).returning();

    // 2. Fetch all active employees
    const activeEmployees = await db.select().from(employees).where(eq(employees.status, 'active'));

    let totalGross = 0;
    let totalNet = 0;

    // 3. Generate dummy payslips for each employee
    // In real app, we would join with employeeContracts to get baseSalary
    // and attendanceLogs to calculate deductions/overtime.
    for (const emp of activeEmployees) {
      const gross = 5000000; // Mock salary
      const net = 4500000;
      
      totalGross += gross;
      totalNet += net;

      await db.insert(payslips).values({
        payrollRunId: run.id,
        employeeId: emp.id,
        grossSalary: gross.toString(),
        netSalary: net.toString(),
        deductionsTotal: '500000',
      });
    }

    // 4. Update status to completed
    const [updatedRun] = await db.update(payrollRuns)
      .set({ 
        status: 'completed',
        totalGross: totalGross.toString(),
        totalNet: totalNet.toString(),
      })
      .where(eq(payrollRuns.id, run.id))
      .returning();

    res.status(201).json(updatedRun);
  } catch (error) {
    res.status(500).json({ error: 'Payroll generation failed', details: error });
  }
});

// Get Payslips for a Run
router.get('/runs/:id/payslips', async (req, res) => {
  try {
    const result = await db.select().from(payslips)
      .where(eq(payslips.payrollRunId, req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payslips' });
  }
});

export default router;
