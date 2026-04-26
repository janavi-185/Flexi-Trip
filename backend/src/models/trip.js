import { query } from "../config/db.js";

export async function createTrip({ userId, destination, budget, duration, travelers, tripStyle }) {
  const result = await query(
    `INSERT INTO trips (user_id, destination, budget, duration, travelers, trip_style)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, user_id, destination, budget, duration, travelers, trip_style, status, created_at, updated_at`,
    [userId, destination.trim(), budget || null, duration || null, travelers || '1', tripStyle || null]
  );
  return result.rows[0];
}

export async function getTripsByUser(userId) {
  const result = await query(
    `SELECT id, destination, budget, duration, travelers, trip_style, status, created_at, updated_at
     FROM trips
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function getTripById(id) {
  const result = await query(
    `SELECT id, user_id, destination, budget, duration, travelers, trip_style, status, created_at, updated_at
     FROM trips
     WHERE id = $1
     LIMIT 1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function updateTrip(id, fields) {
  const allowed = ['destination', 'budget', 'duration', 'travelers', 'trip_style', 'status'];
  const sets = [];
  const values = [];
  let idx = 1;

  for (const key of allowed) {
    if (fields[key] !== undefined) {
      // Convert camelCase to snake_case for DB column
      const col = key;
      sets.push(`${col} = $${idx}`);
      values.push(fields[key]);
      idx++;
    }
  }

  if (sets.length === 0) return getTripById(id);

  sets.push(`updated_at = NOW()`);
  values.push(id);

  const result = await query(
    `UPDATE trips SET ${sets.join(', ')} WHERE id = $${idx}
     RETURNING id, user_id, destination, budget, duration, travelers, trip_style, status, created_at, updated_at`,
    values
  );
  return result.rows[0] || null;
}

export async function deleteTrip(id) {
  const result = await query(`DELETE FROM trips WHERE id = $1 RETURNING id`, [id]);
  return result.rows[0] || null;
}
