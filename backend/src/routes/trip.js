import { Router } from "express";
import { create, list, get, update, remove, chat, regenerate } from "../controllers/trip.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// All trip routes require authentication
router.use(requireAuth);

router.post("/", create);
router.get("/", list);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:id/chat", chat);
router.post("/:id/regenerate", regenerate);

export default router;
