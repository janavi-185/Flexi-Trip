import { query } from "../config/db.js";

export async function saveItinerary(tripId, days) {
  // Clear previous itinerary for this trip
  await query(`DELETE FROM itinerary_days WHERE trip_id = $1`, [tripId]);

  if (!days || days.length === 0) return [];

  // Build bulk insert
  const values = [];
  const placeholders = [];
  let idx = 1;

  for (const day of days) {
    placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3})`);
    values.push(tripId, day.day || day.day_number, day.title, JSON.stringify(day.activities || []));
    idx += 4;
  }

  const result = await query(
    `INSERT INTO itinerary_days (trip_id, day_number, title, activities)
     VALUES ${placeholders.join(', ')}
     RETURNING id, trip_id, day_number, title, activities, created_at`,
    values
  );

  return result.rows;
}

/**
 * Get all itinerary days for a trip, ordered by day number.
 */
export async function getItineraryByTrip(tripId) {
  const result = await query(
    `SELECT id, trip_id, day_number, title, activities, created_at
     FROM itinerary_days
     WHERE trip_id = $1
     ORDER BY day_number ASC`,
    [tripId]
  );
  return result.rows;
}

/**
 * Update a single itinerary day.
 */
export async function updateItineraryDay(dayId, { title, activities }) {
  const result = await query(
    `UPDATE itinerary_days
     SET title = COALESCE($1, title),
         activities = COALESCE($2, activities)
     WHERE id = $3
     RETURNING id, trip_id, day_number, title, activities, created_at`,
    [title || null, activities ? JSON.stringify(activities) : null, dayId]
  );
  return result.rows[0] || null;
}
