import { Newsletter } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400);
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        throw new AppError('Email already subscribed', 400);
      }
      // Reactivate
      existing.isActive = true;
      existing.unsubscribedAt = undefined;
      await existing.save();
      return res.json({
        success: true,
        message: 'Subscription reactivated',
      });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
export const unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400);
    }

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      throw new AppError('Email not found', 404);
    }

    subscription.isActive = false;
    subscription.unsubscribedAt = new Date();
    await subscription.save();

    res.json({
      success: true,
      message: 'Unsubscribed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all subscribers (admin)
// @route   GET /api/newsletter/subscribers
export const getSubscribers = async (req, res, next) => {
  try {
    const { isActive, limit = 20, page = 1 } = req.query;
    const filter = {};

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [subscribers, total] = await Promise.all([
      Newsletter.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Newsletter.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: subscribers.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export subscribers as CSV (admin)
// @route   GET /api/newsletter/export
export const exportSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .select('email createdAt')
      .sort({ createdAt: -1 });

    // Create CSV
    const header = 'Email,Subscribed At\n';
    const rows = subscribers.map(s => 
      `${s.email},${s.createdAt.toISOString()}`
    ).join('\n');

    const csv = header + rows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
