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

-- ─────────────────────────────────────────────
-- Trips table — stores each trip a user creates
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trips (
	id BIGSERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	destination VARCHAR(255) NOT NULL,
	budget VARCHAR(100),
	duration VARCHAR(100),
	travelers VARCHAR(20) DEFAULT '1',
	trip_style VARCHAR(100),
	status VARCHAR(30) NOT NULL DEFAULT 'planned',
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips (user_id);
CREATE INDEX IF NOT EXISTS idx_trips_created_at ON trips (created_at DESC);

-- ──────────────────────────────────────────────────
-- Itinerary days — stores the day-by-day plan for a trip
-- ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS itinerary_days (
	id BIGSERIAL PRIMARY KEY,
	trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
	day_number INTEGER NOT NULL,
	title VARCHAR(255) NOT NULL,
	activities JSONB NOT NULL DEFAULT '[]',
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_itinerary_days_trip_id ON itinerary_days (trip_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_itinerary_days_trip_day ON itinerary_days (trip_id, day_number);

-- ──────────────────────────────────────────────────
-- Chat messages — stores conversation history per trip
-- ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
	id BIGSERIAL PRIMARY KEY,
	trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
	role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
	content TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_trip_id ON chat_messages (trip_id, created_at ASC);
