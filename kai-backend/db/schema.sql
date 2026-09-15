CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 10),
  note TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'check-in' CHECK (source IN ('check-in', 'chat')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 4000),
  mood TEXT,
  score INTEGER CHECK (score BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS mood_entries_user_created_idx ON mood_entries(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS conversations_user_updated_idx ON conversations(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS messages_conversation_created_idx ON messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS support_requests_status_created_idx ON support_requests(status, created_at DESC);
