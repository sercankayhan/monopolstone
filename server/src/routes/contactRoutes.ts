import express from 'express';
import { contactController } from '../controllers/contactController';

const router = express.Router();

// POST /api/contact - Contact form submission
router.post('/', contactController.submitContact);

export default router;
