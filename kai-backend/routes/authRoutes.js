import express from "express";
import { login, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validation.js";
import { loginSchema, registerSchema } from "../validators/auth.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", requireAuth, me);

export default router;
