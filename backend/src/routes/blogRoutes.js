import express from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlog);

// Admin routes
router.use(protect);

const blogValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('status').optional().isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED']).withMessage('Invalid status'),
];

router.post('/', authorize('SUPER_ADMIN', 'ADMIN'), blogValidation, validate, createBlog);
router.put('/:id', authorize('SUPER_ADMIN', 'ADMIN'), blogValidation, validate, updateBlog);
router.delete('/:id', authorize('SUPER_ADMIN', 'ADMIN'), deleteBlog);

export default router;
