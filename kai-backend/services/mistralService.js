import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.warn("⚠️ MISTRAL_API_KEY is missing from environment variables.");
}

const client = apiKey ? new Mistral({ apiKey }) : null;

export async function getKaiReply(message) {
  if (!client) {
    return {
      reply:
        "Kai is currently unavailable because the Mistral API key is missing. Please add MISTRAL_API_KEY to your environment.",
      mood: "neutral",
      sentiment: { mood: "neutral", score: 5 },
    };
  }

  const systemPrompt = `You are Kai, an empathetic, culturally aware wellness companion for the "Kai — Empathetic AI Wellness Agent" project. Respond naturally and warmly in English or Hinglish, switching fluidly based on the user's tone and language. Be supportive, non-judgmental, practical, and concise. Encourage healthy self-reflection, gently validate feelings, and provide useful next steps when appropriate. Always append a JSON sentiment metadata block at the end of every response in this exact format: [[SENTIMENT:{"mood":"happy|calm|anxious|sad|neutral","score":1-10}]]. Keep the main response user-friendly and conversational.\n\nUser message: ${message}`;

  try {
    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    let rawReply = response.choices?.[0]?.message?.content ?? "";
    let sentiment = { mood: "neutral", score: 5 };

    const sentimentMatch = rawReply.match(/\[\[SENTIMENT:(\{.*?\})\]\]/i);

    if (sentimentMatch?.[1]) {
      try {
        sentiment = JSON.parse(sentimentMatch[1]);
      } catch (error) {
        console.warn("Failed to parse sentiment metadata:", error);
      }
    }

    rawReply = rawReply.replace(/\[\[SENTIMENT:\{.*?\}\]\]/i, "").trim();

    return {
      reply: rawReply || "I’m here with you. Tell me what’s on your mind.",
      mood: sentiment.mood || "neutral",
      sentiment,
    };
  } catch (error) {
    console.error("Mistral API error:", error);

    return {
      reply:
        "I’m sorry, I’m having trouble generating a response right now. Please try again in a moment.",
      mood: "neutral",
      sentiment: { mood: "neutral", score: 5 },
    };
  }
}
