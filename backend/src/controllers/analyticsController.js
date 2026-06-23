import { Analytics } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Track page view
// @route   POST /api/analytics/page-view
export const trackPageView = async (req, res, next) => {
  try {
    const { page, referrer } = req.body;

    await Analytics.create({
      type: 'PAGE_VIEW',
      page,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      referrer: referrer || req.headers.referer,
    });

    res.status(201).json({
      success: true,
      message: 'Page view tracked',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track download
// @route   POST /api/analytics/download
export const trackDownload = async (req, res, next) => {
  try {
    const { file } = req.body;

    await Analytics.create({
      type: 'DOWNLOAD',
      metadata: { file },
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json({
      success: true,
      message: 'Download tracked',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics (admin)
// @route   GET /api/analytics
export const getAnalytics = async (req, res, next) => {
  try {
    const { type, startDate, endDate, limit = 100 } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (startDate) filter.createdAt = { $gte: new Date(startDate) };
    if (endDate) {
      filter.createdAt = { 
        ...filter.createdAt, 
        $lte: new Date(endDate) 
      };
    }

    const [analytics, total] = await Promise.all([
      Analytics.find(filter)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit)),
      Analytics.countDocuments(filter),
    ]);

    // Summary statistics
    const summary = await Analytics.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    // Daily breakdown for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyBreakdown = await Analytics.aggregate([
      {
        $match: {
          ...filter,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            type: '$type',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.date': 1 },
      },
    ]);

    res.json({
      success: true,
      total,
      summary,
      dailyBreakdown,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats (admin)
// @route   GET /api/analytics/dashboard
export const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [
      totalPageViews,
      todayPageViews,
      weekPageViews,
      monthPageViews,
      totalDownloads,
      todayDownloads,
      recentActivity,
      topPages,
    ] = await Promise.all([
      Analytics.countDocuments({ type: 'PAGE_VIEW' }),
      Analytics.countDocuments({
        type: 'PAGE_VIEW',
        createdAt: { $gte: startOfDay },
      }),
      Analytics.countDocuments({
        type: 'PAGE_VIEW',
        createdAt: { $gte: weekAgo },
      }),
      Analytics.countDocuments({
        type: 'PAGE_VIEW',
        createdAt: { $gte: monthAgo },
      }),
      Analytics.countDocuments({ type: 'DOWNLOAD' }),
      Analytics.countDocuments({
        type: 'DOWNLOAD',
        createdAt: { $gte: startOfDay },
      }),
      Analytics.find()
        .sort({ createdAt: -1 })
        .limit(10),
      Analytics.aggregate([
        {
          $match: { type: 'PAGE_VIEW', page: { $ne: null } },
        },
        {
          $group: {
            _id: '$page',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10,
        },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totals: {
          pageViews: totalPageViews,
          downloads: totalDownloads,
        },
        today: {
          pageViews: todayPageViews,
          downloads: todayDownloads,
        },
        periods: {
          week: weekPageViews,
          month: monthPageViews,
        },
        topPages,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};
