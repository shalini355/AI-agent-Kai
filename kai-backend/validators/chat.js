import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1, "Message is required.").max(4000, "Message must be 4000 characters or fewer."),
});
