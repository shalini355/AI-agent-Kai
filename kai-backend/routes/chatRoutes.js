import express from "express";
import { sendChat } from "../controllers/chatController.js";
import { validateBody } from "../middleware/validation.js";
import { chatRequestSchema } from "../validators/chat.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import env from "../config/env.js";

const router = express.Router();

const authInProduction = env.NODE_ENV === "production" ? requireAuth : optionalAuth;

router.post("/", authInProduction, validateBody(chatRequestSchema), sendChat);
router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "kai-backend" });
});

export default router;
