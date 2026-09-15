import { z } from "zod";

export const createMoodSchema = z.object({
  mood: z.string().trim().min(1).max(40),
  score: z.coerce.number().int().min(1).max(10),
  note: z.string().trim().max(4000).default(""),
  source: z.enum(["check-in", "chat"]).default("check-in"),
});
