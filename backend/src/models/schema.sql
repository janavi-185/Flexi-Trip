-- FlexiTrip auth schema boilerplate
-- Safe to run multiple times due to IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS users (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(120) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at DESC);
