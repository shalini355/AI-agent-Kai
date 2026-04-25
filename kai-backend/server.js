import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Google Gemini SDK

dotenv.config();

const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini client
const googleApiKey = process.env.GOOGLE_API_KEY;
if (!googleApiKey) {
  console.error("❌ GOOGLE_API_KEY not found in .env file");
  process.exit(1);
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

  // Simple keyword-based mood detection
  const happyKeywords = ["happy", "good", "excited", "great", "joy"];
  const sadKeywords = ["sad", "depressed", "unhappy", "bad", "down"];
  const angryKeywords = ["angry", "frustrated", "mad", "upset"];

  let mood = "neutral";
  if (happyKeywords.some((word) => msg.includes(word))) mood = "happy";
  else if (sadKeywords.some((word) => msg.includes(word))) mood = "sad";
  else if (angryKeywords.some((word) => msg.includes(word))) mood = "angry";

  try {
    const aiPrompt = `The user is feeling ${mood}. Respond in a friendly, empathetic way to their message: "${message}"`;

    // ✅ Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(aiPrompt);

    const aiReply = result.response.text();

    res.json({ mood, reply: aiReply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.json({
      mood,
      reply: "Sorry, I couldn't process your request. Please try again later.",
    });
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
