import express from "express";
import { createMood, deleteMoods, listMoods } from "../controllers/moodController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validation.js";
import { createMoodSchema } from "../validators/mood.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", listMoods);
router.post("/", validateBody(createMoodSchema), createMood);
router.delete("/", deleteMoods);

export default router;
