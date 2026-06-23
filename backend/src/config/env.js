import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mobilehealth_website',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_key_change_this',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // URLs
  API_URL: process.env.API_URL || 'http://localhost:5001/api',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  WEBSITE_URL: process.env.WEBSITE_URL || 'http://localhost:3000',
  
  // Email
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@mobilehealth.mw',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
};
