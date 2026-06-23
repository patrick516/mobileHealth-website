import { Testimonial } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get all testimonials (public)
// @route   GET /api/testimonials
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all testimonials (admin)
// @route   GET /api/testimonials/admin
export const getTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
export const createTestimonial = async (req, res, next) => {
  try {
    const { name, role, organization, content, avatar, rating, order } = req.body;

    if (!name || !content) {
      throw new AppError('Name and content are required', 400);
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      organization,
      content,
      avatar,
      rating,
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
export const updateTestimonial = async (req, res, next) => {
  try {
    const { name, role, organization, content, avatar, rating, isActive, order } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    if (name) testimonial.name = name;
    if (role !== undefined) testimonial.role = role;
    if (organization !== undefined) testimonial.organization = organization;
    if (content) testimonial.content = content;
    if (avatar !== undefined) testimonial.avatar = avatar;
    if (rating !== undefined) testimonial.rating = rating;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (order !== undefined) testimonial.order = order;

    await testimonial.save();

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    await testimonial.deleteOne();

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
