import { Router } from 'express';
import { db } from '../db';
import { transactions, categories } from '../db/schema';
import { eq, desc, sum, and } from 'drizzle-orm';

const router = Router();

// Get Transactions
router.get('/transactions', async (req, res) => {
  try {
    const result = await db.select().from(transactions).orderBy(desc(transactions.date));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Create Transaction
router.post('/transactions', async (req, res) => {
  try {
    const newTx = await db.insert(transactions).values(req.body).returning();
    res.status(201).json(newTx[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// Get Categories
router.get('/categories', async (req, res) => {
  try {
    const result = await db.select().from(categories);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Finance Dashboard Stats
router.get('/dashboard', async (req, res) => {
  try {
    // Determine current month range
    // For now, just aggregate all-time
    const [income] = await db.select({ total: sum(transactions.amount) }).from(transactions).where(eq(transactions.type, 'income'));
    const [expense] = await db.select({ total: sum(transactions.amount) }).from(transactions).where(eq(transactions.type, 'expense'));
    
    res.json({
      totalIncome: income?.total || 0,
      totalExpense: expense?.total || 0,
      netProfit: (Number(income?.total || 0) - Number(expense?.total || 0)),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch finance stats' });
  }
});

export default router;
