import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['PAGE_VIEW', 'VISIT', 'DOWNLOAD', 'CONTACT', 'NEWSLETTER'],
    required: true,
  },
  page: {
    type: String,
    trim: true,
  },
  ip: String,
  userAgent: String,
  referrer: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

// Index for faster queries
analyticsSchema.index({ type: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });

export const Analytics = mongoose.model('Analytics', analyticsSchema);
