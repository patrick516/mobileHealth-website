import { Admin } from '../models/index.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get all admins
// @route   GET /api/admins
export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().select('-passwordHash -passwordResetToken -passwordResetExpires');
    
    res.json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single admin
// @route   GET /api/admins/:id
export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-passwordHash -passwordResetToken -passwordResetExpires');
    
    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create admin
// @route   POST /api/admins
export const createAdmin = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      throw new AppError('Please provide all required fields', 400);
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      throw new AppError('Email already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      fullName,
      email,
      passwordHash,
      role: role || 'ADMIN',
    });

    res.status(201).json({
      success: true,
      data: admin.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin
// @route   PUT /api/admins/:id
export const updateAdmin = async (req, res, next) => {
  try {
    const { fullName, email, role, isActive } = req.body;
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    // Prevent updating self to lower role
    if (req.params.id === req.user._id.toString() && role === 'ADMIN' && req.user.role === 'SUPER_ADMIN') {
      throw new AppError('Cannot demote yourself', 400);
    }

    if (fullName) admin.fullName = fullName;
    if (email) {
      const existing = await Admin.findOne({ email, _id: { $ne: req.params.id } });
      if (existing) {
        throw new AppError('Email already exists', 400);
      }
      admin.email = email;
    }
    if (role) admin.role = role;
    if (isActive !== undefined) admin.isActive = isActive;

    await admin.save();

    res.json({
      success: true,
      data: admin.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete admin
// @route   DELETE /api/admins/:id
export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    // Prevent deleting self
    if (admin._id.toString() === req.user._id.toString()) {
      throw new AppError('Cannot delete your own account', 400);
    }

    await admin.deleteOne();

    res.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
