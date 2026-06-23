import { FAQ } from '../models/FAQ.js';
import connectDB from '../config/database.js';
import { faqData } from './data/faqs.js';

const seedFAQs = async () => {
  try {
    await connectDB();
    await FAQ.deleteMany({});
    await FAQ.insertMany(faqData);
    console.log('✅ FAQs seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedFAQs();
