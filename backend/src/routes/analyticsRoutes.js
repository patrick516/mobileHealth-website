import express from "express";
import {
  trackPageView,
  trackDownload,
  getAnalytics,
  getDashboardStats,
} from "../controllers/analyticsController.js";
import { protect, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { body } from "express-validator";

const router = express.Router();

// Public routes (tracking)
router.post(
  "/page-view",
  [body("page").optional().isString()],
  validate,
  trackPageView,
);

router.post(
  "/download",
  [body("file").optional().isString()],
  validate,
  trackDownload,
);

// Admin routes
router.use(protect, authorize("SUPER_ADMIN", "ADMIN"));

router.get("/", getAnalytics);
router.get("/dashboard", getDashboardStats);
router.get("/stats", getDashboardStats);

export default router;
