import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import connectDB from '../config/database.js';
import { adminData } from './data/admins.js';

const seedAdmins = async () => {
  try {
    await connectDB();
    await Admin.deleteMany({});
    await Admin.insertMany(adminData);
    console.log('✅ Admins seeded successfully!');
    console.log('📧 admin@mobilehealth.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmins();
