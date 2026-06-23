import { Contact } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Submit contact form (public)
// @route   POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      throw new AppError('Please fill in all required fields', 400);
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // TODO: Send email notification to admin

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contacts
export const getContacts = async (req, res, next) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    const filter = {};

    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .populate('repliedBy', 'fullName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Contact.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: contacts.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'fullName email');

    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    // Mark as read if new
    if (contact.status === 'NEW') {
      contact.status = 'READ';
      await contact.save();
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to contact
// @route   POST /api/contacts/:id/reply
export const replyContact = async (req, res, next) => {
  try {
    const { replyMessage } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    if (!replyMessage) {
      throw new AppError('Reply message is required', 400);
    }

    contact.status = 'REPLIED';
    contact.repliedAt = new Date();
    contact.repliedBy = req.user._id;
    contact.replyMessage = replyMessage;
    await contact.save();

    // TODO: Send email reply to user

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
