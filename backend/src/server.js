import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = env.PORT || 5001;

// ─── CONNECT TO DATABASE ───
await connectDB();

// ─── CORS CONFIGURATION ───
const allowedOrigins = [
  "https://admin-mobilehealth.vercel.app",
  "https://mobilehealth-malawi.vercel.app",
  "http://localhost:5173", // Local development
  "http://localhost:3000", // Local website
  "http://localhost:5001", // Local API
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      process.env.NODE_ENV === "development"
    ) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};

// ─── MIDDLEWARE ───
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// ─── OPTIONS PRE-FLIGHT ───
app.options("*", cors(corsOptions));

// ─── ROUTES ───
app.use("/api", routes);

// ─── HEALTH CHECK ───
app.get("/", (req, res) => {
  res.json({
    name: "MobileHealth Website API",
    version: "1.0.0",
    status: "running",
    environment: env.NODE_ENV,
  });
});

// ─── ERROR HANDLING ───
app.use(notFound);
app.use(errorHandler);

// ─── START SERVER ───
app.listen(PORT, () => {
  console.log(`🚀 MobileHealth Website API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Environment: ${env.NODE_ENV}`);
  console.log(`🔗 CORS allowed origins:`);
  allowedOrigins.forEach((origin) => console.log(`   - ${origin}`));
});
