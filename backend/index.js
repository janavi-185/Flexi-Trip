import "./loadenv.js";

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FlexiTrip API");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
