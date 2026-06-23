import express from 'express';
import {
  submitContact,
  getContacts,
  getContact,
  replyContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route
const contactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
];
router.post('/', contactValidation, validate, submitContact);

// Admin routes
router.use(protect, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/:id/reply', [
  body('replyMessage').notEmpty().withMessage('Reply message is required'),
], validate, replyContact);
router.delete('/:id', deleteContact);

export default router;
