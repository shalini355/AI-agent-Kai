import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini client
// const googleApiKey = process.env.GOOGLE_API_KEY;
// if (!googleApiKey) {
//   console.error("❌ GOOGLE_API_KEY not found");
//   process.exit(1);
// }
const googleApiKey = process.env.GOOGLE_API_KEY;
if (!googleApiKey) {
  console.warn("⚠️ GOOGLE_API_KEY not found, using fallback responses");
}

const genAI = new GoogleGenerativeAI(googleApiKey);

// Mood + AI endpoint
app.post("/ai-mood", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({
      mood: "neutral",
      reply: "Please send some text!",
    });
  }

  const msg = message.toLowerCase();

  const happyKeywords = ["happy", "good", "excited", "great", "joy"];
  const sadKeywords = ["sad", "depressed", "unhappy", "bad", "down"];
  const angryKeywords = ["angry", "frustrated", "mad", "upset"];

  let mood = "neutral";
  if (happyKeywords.some((word) => msg.includes(word))) mood = "happy";
  else if (sadKeywords.some((word) => msg.includes(word))) mood = "sad";
  else if (angryKeywords.some((word) => msg.includes(word))) mood = "angry";

  try {
    const aiPrompt = `The user is feeling ${mood}. Respond in a friendly, empathetic way to their message: "${message}"`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(aiPrompt);

    const aiReply = result.response.text();

    res.json({ mood, reply: aiReply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.json({
      mood,
      reply: "Sorry, I couldn't process your request.",
    });
  }
});

// Serve frontend (optional)
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
