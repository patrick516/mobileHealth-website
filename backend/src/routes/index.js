import express from 'express';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import blogRoutes from './blogRoutes.js';
import contactRoutes from './contactRoutes.js';
import settingRoutes from './settingRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import faqRoutes from './faqRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import healthRoutes from './healthRoutes.js';
import { limiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Apply rate limiting to all routes
router.use(limiter);

// Health check
router.use('/health', healthRoutes);

// API routes
router.use('/auth', authRoutes);
router.use('/admins', adminRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faqs', faqRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/upload', uploadRoutes);

// API info
router.get('/', (req, res) => {
  res.json({
    name: 'MobileHealth Website API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      admins: '/api/admins',
      blog: '/api/blog',
      contact: '/api/contact',
      settings: '/api/settings',
      newsletter: '/api/newsletter',
      testimonials: '/api/testimonials',
      faqs: '/api/faqs',
      analytics: '/api/analytics',
      upload: '/api/upload',
      health: '/api/health',
    },
  });
});

export default router;
