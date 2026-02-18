import { Router } from 'express';

const router = Router();

// Mock Settings Store (In real app, this would be in a 'settings' table)
let companyProfile = {
  name: 'NoorByte',
  address: 'Jakarta, Indonesia',
  phone: '+62 21 555 0123',
  email: 'contact@noorbyte.com'
};

// Get Company Profile
router.get('/company', (req, res) => {
  res.json(companyProfile);
});

// Update Company Profile
router.put('/company', (req, res) => {
  companyProfile = { ...companyProfile, ...req.body };
  res.json(companyProfile);
});

// Backup (Mock trigger)
router.post('/backup', (req, res) => {
  setTimeout(() => {
    console.log('Backup process completed');
  }, 2000);
  res.json({ status: 'initiated', message: 'Backup started in background' });
});

export default router;
