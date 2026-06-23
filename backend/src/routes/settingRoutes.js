import express from 'express';
import {
  getPublicSettings,
  getSettings,
  getSettingByKey,
  updateSetting,
  bulkUpdateSettings,
  initSettings,
} from '../controllers/settingController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Public route - get public settings
router.get('/public', getPublicSettings);

// Admin routes
router.use(protect, authorize('SUPER_ADMIN', 'ADMIN'));

router.get('/', getSettings);
router.get('/:key', [
  param('key').notEmpty().withMessage('Setting key is required'),
], validate, getSettingByKey);

router.put('/:key', [
  param('key').notEmpty().withMessage('Setting key is required'),
  body('value').notEmpty().withMessage('Value is required'),
], validate, updateSetting);

router.post('/bulk', [
  body('settings').isObject().withMessage('Settings object is required'),
], validate, bulkUpdateSettings);

router.post('/init', initSettings);

export default router;
