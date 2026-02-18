import { Router } from 'express';
import { db } from '../db';
import { employees } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// List all employees
router.get('/', async (req, res) => {
  try {
    const result = await db.select().from(employees).orderBy(desc(employees.createdAt));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.select().from(employees).where(eq(employees.id, req.params.id));
    if (result.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// Create new employee
router.post('/', async (req, res) => {
  try {
    // In a real app, validate body with Zod
    const newEmployee = await db.insert(employees).values(req.body).returning();
    res.status(201).json(newEmployee[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee', details: error });
  }
});

export default router;
