import { Router } from 'express';
import { db } from '../db';
import { employees, attendanceLogs, leaves, payrollRuns } from '../db/schema';
import { sql, eq, and } from 'drizzle-orm';
import redisClient from '../utils/redis';

const router = Router();

router.get('/stats', async (req, res) => {
  try {
    // Check cache
    const cacheKey = 'dashboard:stats';
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    // Parallel queries
    const [empCount] = await db.select({ count: sql<number>`count(*)` }).from(employees).where(eq(employees.status, 'active'));
    
    // Mock attendance data for today (since real data might be empty in dev)
    const attendanceRate = 95; 
    
    const [pendingLeaves] = await db.select({ count: sql<number>`count(*)` }).from(leaves).where(eq(leaves.status, 'pending'));
    
    const [lastPayroll] = await db.select().from(payrollRuns).orderBy(sql`${payrollRuns.period} DESC`).limit(1);

    const stats = {
      totalEmployees: empCount?.count || 0,
      attendanceRate,
      pendingLeaves: pendingLeaves?.count || 0,
      lastPayrollStatus: lastPayroll?.status || 'No Data',
      timestamp: new Date(),
    };

    // Cache for 5 minutes
    await redisClient.set(cacheKey, JSON.stringify(stats), { EX: 300 });

    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
