import express from 'express';
import {
  login,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/me', protect, getMe);
router.post('/change-password', protect, changePassword);

export default router;
