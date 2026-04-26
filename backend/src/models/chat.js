import { query } from "../config/db.js";

/**
 * Save a chat message for a trip.
 */
export async function saveChatMessage(tripId, role, content) {
  const result = await query(
    `INSERT INTO chat_messages (trip_id, role, content)
     VALUES ($1, $2, $3)
     RETURNING id, trip_id, role, content, created_at`,
    [tripId, role, content]
  );
  return result.rows[0];
}

/**
 * Get all chat messages for a trip, ordered chronologically.
 */
export async function getChatHistory(tripId) {
  const result = await query(
    `SELECT id, role, content, created_at
     FROM chat_messages
     WHERE trip_id = $1
     ORDER BY created_at ASC`,
    [tripId]
  );
  return result.rows;
}

/**
 * Delete all chat messages for a trip.
 */
export async function clearChatHistory(tripId) {
  await query(`DELETE FROM chat_messages WHERE trip_id = $1`, [tripId]);
}
