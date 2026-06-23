import express from 'express';
import {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// All routes require authentication and SUPER_ADMIN role
router.use(protect, authorize('SUPER_ADMIN'));

// Validation rules
const createAdminValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const updateAdminValidation = [
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('role').optional().isIn(['SUPER_ADMIN', 'ADMIN']).withMessage('Invalid role'),
];

router.route('/')
  .get(getAdmins)
  .post(createAdminValidation, validate, createAdmin);

router.route('/:id')
  .get(getAdmin)
  .put(updateAdminValidation, validate, updateAdmin)
  .delete(deleteAdmin);

export default router;
