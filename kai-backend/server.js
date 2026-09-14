import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import chatRoutes from "./routes/chatRoutes.js";
import { sendChat } from "./controllers/chatController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "build");
const indexPath = path.join(buildPath, "index.html");

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/chat", chatRoutes);
app.post("/ai-mood", sendChat);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "kai-backend" });
});

if (fs.existsSync(buildPath) && fs.existsSync(indexPath)) {
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.sendFile(indexPath);
  });
}

app.listen(PORT, () => {
  console.log(`✅ Kai backend running on http://localhost:${PORT}`);
});
