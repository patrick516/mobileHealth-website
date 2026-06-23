import { Setting } from '../models/index.js';
import { DEFAULT_SETTINGS, SETTINGS_GROUPS } from '../config/constants.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get all settings (public)
// @route   GET /api/settings/public
export const getPublicSettings = async (req, res, next) => {
  try {
    const settings = await Setting.find({ group: { $ne: 'seo' } });
    
    const settingsMap = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });

    res.json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all settings (admin)
// @route   GET /api/settings
export const getSettings = async (req, res, next) => {
  try {
    const { group } = req.query;
    const filter = {};
    
    if (group) filter.group = group;

    const settings = await Setting.find(filter).sort({ group: 1, key: 1 });

    res.json({
      success: true,
      count: settings.length,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get setting by key
// @route   GET /api/settings/:key
export const getSettingByKey = async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });

    if (!setting) {
      throw new AppError('Setting not found', 404);
    }

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update setting
// @route   PUT /api/settings/:key
export const updateSetting = async (req, res, next) => {
  try {
    const { value, description, group } = req.body;
    const key = req.params.key;

    if (value === undefined) {
      throw new AppError('Value is required', 400);
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, description, group: group || 'general' },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk update settings
// @route   POST /api/settings/bulk
export const bulkUpdateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      throw new AppError('Settings object is required', 400);
    }

    const operations = Object.entries(settings).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { 
          $set: { value, updatedAt: new Date() },
          $setOnInsert: { group: 'general' }
        },
        upsert: true,
      },
    }));

    await Setting.bulkWrite(operations);

    res.json({
      success: true,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Initialize default settings
// @route   POST /api/settings/init
export const initSettings = async (req, res, next) => {
  try {
    const operations = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { 
          $setOnInsert: { 
            value, 
            description: `Default setting for ${key}`,
            group: 'general',
          }
        },
        upsert: true,
      },
    }));

    await Setting.bulkWrite(operations);

    res.json({
      success: true,
      message: 'Default settings initialized',
    });
  } catch (error) {
    next(error);
  }
};
