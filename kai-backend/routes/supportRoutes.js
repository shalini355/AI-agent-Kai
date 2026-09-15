import express from "express";
import { createSupportRequest } from "../controllers/supportController.js";
import { optionalAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validation.js";
import { supportRequestSchema } from "../validators/support.js";

const router = express.Router();

router.post("/", optionalAuth, validateBody(supportRequestSchema), createSupportRequest);

export default router;
