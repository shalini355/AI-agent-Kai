import pg from "pg";
import env from "../config/env.js";

const { Pool } = pg;

export const pool = env.DATABASE_URL
  ? new Pool({
      connectionString: env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    })
  : null;

export async function checkDatabase() {
  if (!pool) return { configured: false, connected: false };

  try {
    await pool.query("SELECT 1");
    return { configured: true, connected: true };
  } catch (error) {
    return { configured: true, connected: false, error: error.message };
  }
}
