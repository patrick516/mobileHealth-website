import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  avatar: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
