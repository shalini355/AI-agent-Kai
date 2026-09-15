import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { pool } from "../db/pool.js";
import { AppError } from "../middleware/errors.js";

function ensureDatabase() {
  if (!pool) throw new AppError(503, "Persistent authentication is not configured.");
}

function createToken(user) {
  if (!env.JWT_SECRET) throw new AppError(503, "Authentication is not configured.");
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn: "1h" });
}

export async function registerUser(email, password) {
  ensureDatabase();
  const normalizedEmail = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, role, created_at",
      [normalizedEmail, passwordHash]
    );
    const user = result.rows[0];
    return { user, token: createToken(user) };
  } catch (error) {
    if (error.code === "23505") throw new AppError(409, "An account with that email already exists.");
    throw error;
  }
}

export async function loginUser(email, password) {
  ensureDatabase();
  const result = await pool.query("SELECT id, email, role, password_hash, created_at FROM users WHERE email = $1", [email.toLowerCase()]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new AppError(401, "Email or password is incorrect.");
  }

  const safeUser = { id: user.id, email: user.email, role: user.role, created_at: user.created_at };
  return { user: safeUser, token: createToken(safeUser) };
}
