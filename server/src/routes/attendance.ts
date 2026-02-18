import { Router } from 'express';
import { db } from '../db';
import { attendanceLogs, leaves, employees } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();

// Clock In
router.post('/clock-in', async (req, res) => {
  const { employeeId, locationLat, locationLng } = req.body;
  
  if (!employeeId) {
    res.status(400).json({ error: 'Employee ID is required' });
    return;
  }

  try {
    // Check if already clocked in today
    const today = new Date().toISOString().split('T')[0];
    const existing = await db.select().from(attendanceLogs)
      .where(and(eq(attendanceLogs.employeeId, employeeId), eq(attendanceLogs.date, today)));

    if (existing.length > 0) {
      res.status(400).json({ error: 'Already clocked in today' });
      return;
    }

    const log = await db.insert(attendanceLogs).values({
      employeeId,
      date: today,
      checkInTime: new Date(),
      status: 'present',
      locationLat,
      locationLng,
    }).returning();

    res.status(201).json(log[0]);
  } catch (error) {
    res.status(500).json({ error: 'Clock in failed', details: error });
  }
});

// Clock Out
router.post('/clock-out', async (req, res) => {
  const { employeeId } = req.body;
  
  try {
    const today = new Date().toISOString().split('T')[0];
    const existing = await db.select().from(attendanceLogs)
      .where(and(eq(attendanceLogs.employeeId, employeeId), eq(attendanceLogs.date, today)));

    if (existing.length === 0) {
      res.status(400).json({ error: 'No clock-in record found for today' });
      return;
    }

    const log = await db.update(attendanceLogs)
      .set({ checkOutTime: new Date() })
      .where(eq(attendanceLogs.id, existing[0].id))
      .returning();

    res.json(log[0]);
  } catch (error) {
    res.status(500).json({ error: 'Clock out failed' });
  }
});

// Get Attendance History
router.get('/history/:employeeId', async (req, res) => {
  try {
    const history = await db.select().from(attendanceLogs)
      .where(eq(attendanceLogs.employeeId, req.params.employeeId))
      .orderBy(desc(attendanceLogs.date));
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Request Leave
router.post('/leaves', async (req, res) => {
  try {
    const leave = await db.insert(leaves).values(req.body).returning();
    res.status(201).json(leave[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to request leave' });
  }
});

// Get Leaves (Admin/Manager view - usually filtered)
router.get('/leaves', async (req, res) => {
  try {
    const allLeaves = await db.select().from(leaves).orderBy(desc(leaves.createdAt));
    res.json(allLeaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaves' });
  }
});

export default router;
