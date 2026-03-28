import "./loadenv.js";

import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FlexiTrip API");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

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

startServer();
