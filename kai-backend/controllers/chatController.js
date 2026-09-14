import { getKaiReply } from "../services/mistralService.js";

export async function sendChat(req, res) {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please share a message so Kai can support you.",
        mood: "neutral",
        sentiment: { mood: "neutral", score: 5 },
      });
    }

    const result = await getKaiReply(message.trim());

    return res.json(result);
  } catch (error) {
    console.error("Chat controller error:", error);

    return res.status(500).json({
      reply:
        "I’m having trouble connecting right now. Please try again in a moment.",
      mood: "neutral",
      sentiment: { mood: "neutral", score: 5 },
    });
  }
}
