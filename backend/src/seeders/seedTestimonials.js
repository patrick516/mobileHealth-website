import { Testimonial } from '../models/Testimonial.js';
import connectDB from '../config/database.js';
import { testimonialData } from './data/testimonials.js';

const seedTestimonials = async () => {
  try {
    await connectDB();
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonialData);
    console.log('✅ Testimonials seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedTestimonials();
