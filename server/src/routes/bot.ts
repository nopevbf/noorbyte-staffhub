import { Router } from 'express';
import { db } from '../db';
import { botSessions, botMessages } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Webhook for WhatsApp (Meta)
router.post('/webhook', async (req, res) => {
  // In real implementation, verify signature and handle events
  console.log('Webhook received:', req.body);
  
  // Mock handling usage
  // If we receive a message from a new number, create a session
  res.sendStatus(200);
});

// Send Message
router.post('/send', async (req, res) => {
  const { phoneNumber, message } = req.body;
  
  try {
    // 1. Find or create session
    let session = await db.query.botSessions.findFirst({
        where: eq(botSessions.phoneNumber, phoneNumber)
    });

    if (!session) {
        const [newSession] = await db.insert(botSessions).values({
            phoneNumber,
            lastInteraction: new Date()
        }).returning();
        session = newSession;
    }

    // 2. Log outbound message
    await db.insert(botMessages).values({
        sessionId: session.id,
        direction: 'outbound',
        content: message,
        status: 'sent'
    });

    // 3. Create mock reply for demo purposes
    if (message.toLowerCase() === 'hi') {
        setTimeout(async () => {
             await db.insert(botMessages).values({
                sessionId: session!.id, // Non-null assertion safe here
                direction: 'inbound',
                content: 'Hello! How can I help you today? Type "menu" to see options.',
                status: 'delivered'
            });
        }, 1000);
    }

    res.json({ status: 'success', message: 'Message queued' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message', details: error });
  }
});

// Get Bot Status
router.get('/status', (req, res) => {
  // Check connection to WhatsApp API providers (Twilio/Meta)
  res.json({ status: 'connected', batteryLevel: 98, lastSync: new Date() });
});

// Get Logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await db.select().from(botMessages).orderBy(desc(botMessages.timestamp)).limit(50);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});

export default router;
