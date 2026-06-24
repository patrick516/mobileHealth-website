import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // ─── FIX: Trust proxy for Render ───
  trustProxy: true,
  // ─── FIX: Handle X-Forwarded-For validation ───
  validate: { trustProxy: false },
  // ─── Handle X-Forwarded-For header ───
  keyGenerator: (req) => {
    // Use X-Forwarded-For header if present (Render uses this)
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      // Get the first IP from the comma-separated list
      return forwarded.split(",")[0].trim();
    }
    // Fallback to request IP
    return req.ip || req.connection?.remoteAddress || "unknown";
  },
});

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 login requests per 5 minutes
  message: {
    success: false,
    message: "Too many login attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,

  trustProxy: true,

  validate: { trustProxy: false },

  keyGenerator: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
    return req.ip || req.connection?.remoteAddress || "unknown";
  },
});
