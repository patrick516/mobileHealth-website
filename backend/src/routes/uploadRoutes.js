import express from 'express';
import {
  uploadImage,
  uploadImages,
  uploadDocument,
  deleteFile,
} from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// All upload routes require authentication
router.use(protect, authorize('SUPER_ADMIN', 'ADMIN'));

// Single image upload
router.post('/image', uploadSingle('image'), uploadImage);

// Multiple images upload (max 5)
router.post('/images', uploadMultiple('images', 5), uploadImages);

// Document upload (PDF, DOC, etc.)
router.post('/document', uploadSingle('document'), uploadDocument);

// Delete file
router.delete('/:filename', deleteFile);

export default router;
