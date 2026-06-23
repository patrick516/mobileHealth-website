import { FAQ } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get all FAQs (public)
// @route   GET /api/faqs
export const getFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;

    const faqs = await FAQ.find(filter)
      .sort({ order: 1, createdAt: 1 });

    // Group by category
    const grouped = {};
    faqs.forEach(faq => {
      const cat = faq.category || 'General';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(faq);
    });

    res.json({
      success: true,
      count: faqs.length,
      data: grouped,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all FAQs (admin)
// @route   GET /api/faqs/admin
export const getFAQsAdmin = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create FAQ
// @route   POST /api/faqs
export const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order } = req.body;

    if (!question || !answer) {
      throw new AppError('Question and answer are required', 400);
    }

    const faq = await FAQ.create({
      question,
      answer,
      category: category || 'General',
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
export const updateFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order, isActive } = req.body;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    if (question) faq.question = question;
    if (answer) faq.answer = answer;
    if (category) faq.category = category;
    if (order !== undefined) faq.order = order;
    if (isActive !== undefined) faq.isActive = isActive;

    await faq.save();

    res.json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
export const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    await faq.deleteOne();

    res.json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
