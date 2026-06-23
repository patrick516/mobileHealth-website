import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  group: {
    type: String,
    enum: ['general', 'contact', 'social', 'seo', 'features'],
    default: 'general',
  },
}, {
  timestamps: true,
});

export const Setting = mongoose.model('Setting', settingSchema);
