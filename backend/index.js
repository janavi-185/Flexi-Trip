import "./loadenv.js";

import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5002;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`[BOOT] Server running on http://localhost:${PORT}`);
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
