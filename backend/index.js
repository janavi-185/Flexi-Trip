import "./loadenv.js";

import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/user.js";
import skillRoutes from "./src/routes/skillRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", skillRoutes);

app.get("/",(req,res)=>{
  res.send("hello world")
})
 
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
