import express from 'express';
import {
  getTestimonials,
  getTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public route
router.get('/', getTestimonials);

// Admin routes
router.use(protect, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/admin', getTestimonialsAdmin);

const testimonialValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];

router.post('/', testimonialValidation, validate, createTestimonial);
router.put('/:id', testimonialValidation, validate, updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
