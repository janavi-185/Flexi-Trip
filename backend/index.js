import "./loadenv.js";

import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import tripRoutes from "./src/routes/trip.js";

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.ALLOWED_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 5002;

async function startServer() {
  try {
    app.listen(PORT, () => {
      // Changed the log to be more generic since it won't always be localhost
      console.log(`[BOOT] Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("[BOOT] Failed to start server:", error.message);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("FlexiTrip API");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

startServer();