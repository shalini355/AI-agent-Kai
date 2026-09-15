import { pool } from "../db/pool.js";
import { AppError } from "../middleware/errors.js";

function ensureDatabase() {
  if (!pool) throw new AppError(503, "Persistent mood storage is not configured.");
}

export async function listMoods(req, res) {
  ensureDatabase();
  const result = await pool.query(
    "SELECT id, mood, score, note, source, created_at AS timestamp FROM mood_entries WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100",
    [req.user.sub]
  );
  res.json({ entries: result.rows });
}

export async function createMood(req, res) {
  ensureDatabase();
  const { mood, score, note, source } = req.body;
  const result = await pool.query(
    "INSERT INTO mood_entries (user_id, mood, score, note, source) VALUES ($1, $2, $3, $4, $5) RETURNING id, mood, score, note, source, created_at AS timestamp",
    [req.user.sub, mood, score, note, source]
  );
  res.status(201).json({ entry: result.rows[0] });
}

export async function deleteMoods(req, res) {
  ensureDatabase();
  await pool.query("DELETE FROM mood_entries WHERE user_id = $1", [req.user.sub]);
  res.status(204).send();
}
