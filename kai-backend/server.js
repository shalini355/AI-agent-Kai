import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pino from "pino";
import pinoHttp from "pino-http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import env from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import { checkDatabase } from "./db/pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const logger = pino({ level: env.NODE_ENV === "production" ? "info" : "debug" });
const buildPath = path.join(__dirname, "build");
const indexPath = path.join(buildPath, "index.html");
const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS."));
  },
}));
app.use(express.json({ limit: "32kb" }));

app.use("/api", rateLimit({
  windowMs: 60 * 1000,
  limit: env.API_RATE_LIMIT,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "RateLimitExceeded", message: "Too many requests. Please try again shortly." },
}));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/support", supportRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "kai-backend", environment: env.NODE_ENV });
});

app.get("/api/readiness", async (_req, res) => {
  const database = await checkDatabase();
  const ready = Boolean(env.MISTRAL_API_KEY) && (env.NODE_ENV !== "production" || database.connected);
  res.status(ready ? 200 : 503).json({
    ok: ready,
    dependencies: {
      mistral: env.MISTRAL_API_KEY ? "configured" : "missing",
      database: database.connected ? "connected" : database.configured ? "unavailable" : "not-configured",
    },
  });
});

if (fs.existsSync(buildPath) && fs.existsSync(indexPath)) {
  app.use(express.static(buildPath));

  app.get(/^(?!\/api\/).*/, (req, res) => {
    return res.sendFile(indexPath);
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, environment: env.NODE_ENV }, "Kai backend started");
});
