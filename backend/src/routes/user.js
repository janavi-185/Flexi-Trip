import express from "express";
import protect from "../middlewares/auth.js";
import {
  getMyProfile,
  updateMySkills
} from "../controllers/user.js";

const router = express.Router();

// Protected routes
router.get("/me", protect, getMyProfile);
router.put("/me/skills", protect, updateMySkills);
router.get("/test", (req, res) => {
  res.send("User routes working");
});
 

export default router;
 