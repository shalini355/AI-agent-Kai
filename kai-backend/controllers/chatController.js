import { getKaiReply } from "../services/mistralService.js";
import { pool } from "../db/pool.js";

export async function sendChat(req, res) {
  const result = await getKaiReply(req.body.message);

  if (req.user && pool) {
    await pool.query(
      "INSERT INTO mood_entries (user_id, mood, score, note, source) VALUES ($1, $2, $3, $4, 'chat')",
      [req.user.sub, result.sentiment.mood, result.sentiment.score, req.body.message]
    );
  }

  return res.json(result);
}
