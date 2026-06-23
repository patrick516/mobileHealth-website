import mongoose from 'mongoose';

// @desc    Health check
// @route   GET /api/health
export const healthCheck = async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: 'ok',
    service: 'MobileHealth Website API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbStatus[dbState] || 'unknown',
    uptime: process.uptime(),
  });
};
