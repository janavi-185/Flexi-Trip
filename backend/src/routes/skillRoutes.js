import express from "express";
import protect from "../middlewares/auth.js";
import {
  createSkillRequest,
  acceptSkillRequest
} from "../controllers/skillRequest.js";

const router = express.Router();

// Send request
router.post("/", protect, createSkillRequest);
router.get("/test", (req, res) => {
  res.send("skill routes working");
});

// Accept request
router.put("/:id/accept", protect, acceptSkillRequest);
 
export default router;
