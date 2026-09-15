import test from "node:test";
import assert from "node:assert/strict";

import { loginSchema, registerSchema } from "../validators/auth.js";
import { chatRequestSchema } from "../validators/chat.js";
import { createMoodSchema } from "../validators/mood.js";
import { supportRequestSchema } from "../validators/support.js";

test("auth schemas accept valid credentials and reject short passwords", () => {
  const valid = { email: "Person@Example.com", password: "long-password" };

  assert.equal(registerSchema.safeParse(valid).success, true);
  assert.equal(loginSchema.safeParse(valid).success, true);
  assert.equal(registerSchema.safeParse({ ...valid, password: "short" }).success, false);
});

test("chat schema trims messages and enforces the request boundary", () => {
  const parsed = chatRequestSchema.parse({ message: "  I feel steady today  " });

  assert.equal(parsed.message, "I feel steady today");
  assert.equal(chatRequestSchema.safeParse({ message: "" }).success, false);
  assert.equal(chatRequestSchema.safeParse({ message: "x".repeat(4001) }).success, false);
});

test("mood schema coerces score and applies safe defaults", () => {
  const parsed = createMoodSchema.parse({ mood: "calm", score: "7" });

  assert.deepEqual(parsed, {
    mood: "calm",
    score: 7,
    note: "",
    source: "check-in",
  });
  assert.equal(createMoodSchema.safeParse({ mood: "calm", score: 11 }).success, false);
  assert.equal(createMoodSchema.safeParse({ mood: "calm", score: 7, source: "unknown" }).success, false);
});

test("support schema requires contact identity and bounded message text", () => {
  const valid = {
    name: "Kai User",
    email: "user@example.com",
    message: "I need help with my account.",
  };

  assert.equal(supportRequestSchema.safeParse(valid).success, true);
  assert.equal(supportRequestSchema.safeParse({ ...valid, email: "bad-email" }).success, false);
  assert.equal(supportRequestSchema.safeParse({ ...valid, message: "" }).success, false);
});
