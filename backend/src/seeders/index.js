import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { adminData } from './data/admins.js';
import { settingData } from './data/settings.js';
import { faqData } from './data/faqs.js';
import { testimonialData } from './data/testimonials.js';
import { Admin } from '../models/Admin.js';
import { Setting } from '../models/Setting.js';
import { FAQ } from '../models/FAQ.js';
import { Testimonial } from '../models/Testimonial.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('📊 Connected to database...');

    // Clear existing data (optional - comment out if you want to keep data)
    console.log('🧹 Clearing existing data...');
    await Admin.deleteMany({});
    await Setting.deleteMany({});
    await FAQ.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('✅ Existing data cleared');

    // Seed Admins
    console.log('👤 Seeding admins...');
    await Admin.insertMany(adminData);
    console.log(`✅ ${adminData.length} admins seeded`);

    // Seed Settings
    console.log('⚙️ Seeding settings...');
    await Setting.insertMany(settingData);
    console.log(`✅ ${settingData.length} settings seeded`);

    // Seed FAQs
    console.log('❓ Seeding FAQs...');
    await FAQ.insertMany(faqData);
    console.log(`✅ ${faqData.length} FAQs seeded`);

    // Seed Testimonials
    console.log('⭐ Seeding testimonials...');
    await Testimonial.insertMany(testimonialData);
    console.log(`✅ ${testimonialData.length} testimonials seeded`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email: admin@mobilehealth.com');
    console.log('   Password: admin123');
    console.log('\n   Email: test@mobilehealth.com');
    console.log('   Password: test123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
