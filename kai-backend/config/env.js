import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  MISTRAL_API_KEY: z.string().min(1).optional(),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32).optional(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  API_RATE_LIMIT: z.coerce.number().int().positive().default(60),
  AI_TIMEOUT_MS: z.coerce.number().int().positive().default(20000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;

if (env.NODE_ENV === "production" && !env.JWT_SECRET) {
  console.error("JWT_SECRET is required in production.");
  process.exit(1);
}

export default env;
