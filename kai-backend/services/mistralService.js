import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.warn("⚠️ MISTRAL_API_KEY is missing from environment variables.");
}

const client = apiKey ? new Mistral({ apiKey }) : null;

function inferMood(message) {
  const text = message.toLowerCase();

  if (
    /(happy|good|excited|great|energetic|joy|relieved|peaceful|calm)/i.test(text)
  ) {
    return "happy";
  }

  if (/(anxious|worried|stressed|overwhelmed|panic|nervous|tensed)/i.test(text)) {
    return "anxious";
  }

  if (/(sad|down|lonely|hurt|empty|depressed|crying)/i.test(text)) {
    return "sad";
  }

  if (/(calm|okay|fine|steady|grounded|peaceful|safe)/i.test(text)) {
    return "calm";
  }

  return "neutral";
}

function buildFallbackReply(message) {
  const mood = inferMood(message);
  const score = mood === "happy" ? 8 : mood === "calm" ? 7 : mood === "anxious" ? 4 : mood === "sad" ? 3 : 5;

  const fallbackReplies = {
    happy: "I’m really glad you’re feeling good today. Keep nurturing that momentum and take a moment to enjoy it.",
    calm: "That sounds steady and grounded. Keep protecting this calm energy and take it one gentle step at a time.",
    anxious: "I’m hearing that you’re feeling a bit overwhelmed. Try a slow breath in for 4, hold for 4, out for 6, and let’s take this one moment at a time.",
    sad: "I’m sorry you’re carrying that heaviness right now. You don’t have to handle it all at once — start with one small comforting step.",
    neutral: "Thanks for sharing that with me. I’m here with you, and we can take this conversation at your pace.",
  };

  return {
    reply: fallbackReplies[mood],
    mood,
    sentiment: { mood, score },
  };
}

function isRateLimited(error) {
  const body = error?.body ?? {};
  const bodyText = typeof body === "string" ? body : JSON.stringify(body);

  return (
    error?.statusCode === 429 ||
    bodyText.toLowerCase().includes("rate limit") ||
    bodyText.toLowerCase().includes("rate_limited")
  );
}

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

    if (isRateLimited(error)) {
      const fallback = buildFallbackReply(message);
      return {
        reply: `${fallback.reply} Kai’s AI service is temporarily rate-limited, but I’m still here to support you right now.`,
        mood: fallback.mood,
        sentiment: fallback.sentiment,
      };
    }

    return {
      reply:
        "I’m sorry, I’m having trouble generating a response right now. Please try again in a moment.",
      mood: "neutral",
      sentiment: { mood: "neutral", score: 5 },
    };
  }
}
