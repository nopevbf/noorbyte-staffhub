import { Router } from 'express';
import { auth } from '../auth';
import { toNodeHandler } from 'better-auth/node';

const router = Router();

router.all('/auth/*', toNodeHandler(auth));

router.get('/me', async (req, res) => {
    const session = await auth.api.getSession({
        headers: req.headers as unknown as HeadersInit,
    });
    
    if (!session) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    
    res.json(session.user);
});

export default router;
