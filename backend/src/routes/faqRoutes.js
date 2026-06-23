import express from 'express';
import {
  getFAQs,
  getFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faqController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route
router.get('/', getFAQs);

// Admin routes
router.use(protect, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/admin', getFAQsAdmin);

const faqValidation = [
  body('question').notEmpty().withMessage('Question is required'),
  body('answer').notEmpty().withMessage('Answer is required'),
];

router.post('/', faqValidation, validate, createFAQ);
router.put('/:id', faqValidation, validate, updateFAQ);
router.delete('/:id', deleteFAQ);

export default router;
