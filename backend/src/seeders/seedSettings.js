import { Setting } from '../models/Setting.js';
import connectDB from '../config/database.js';
import { settingData } from './data/settings.js';

const seedSettings = async () => {
  try {
    await connectDB();
    await Setting.deleteMany({});
    await Setting.insertMany(settingData);
    console.log('✅ Settings seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedSettings();
