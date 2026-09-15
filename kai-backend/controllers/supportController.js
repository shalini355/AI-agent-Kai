import { pool } from "../db/pool.js";
import { AppError } from "../middleware/errors.js";

export async function createSupportRequest(req, res) {
  if (!pool) throw new AppError(503, "Support request storage is not configured.");

  const { name, email, message } = req.body;
  await pool.query(
    "INSERT INTO support_requests (user_id, name, email, message) VALUES ($1, $2, $3, $4)",
    [req.user?.sub || null, name, email.toLowerCase(), message]
  );

  res.status(201).json({ accepted: true, message: "Your support request has been received." });
}
