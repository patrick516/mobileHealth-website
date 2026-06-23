import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['NEW', 'READ', 'REPLIED'],
    default: 'NEW',
  },
  repliedAt: Date,
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  replyMessage: String,
}, {
  timestamps: true,
});

export const Contact = mongoose.model('Contact', contactSchema);
