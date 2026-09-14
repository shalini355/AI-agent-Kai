import express from "express";
import { sendChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", sendChat);
router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "kai-backend" });
});

export default router;
