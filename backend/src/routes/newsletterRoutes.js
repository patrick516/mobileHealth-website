import express from 'express';
import {
  subscribe,
  unsubscribe,
  getSubscribers,
  exportSubscribers,
} from '../controllers/newsletterController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
const emailValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
];

router.post('/subscribe', emailValidation, validate, subscribe);
router.post('/unsubscribe', emailValidation, validate, unsubscribe);

// Admin routes
router.use(protect, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/subscribers', getSubscribers);
router.get('/export', exportSubscribers);

export default router;
