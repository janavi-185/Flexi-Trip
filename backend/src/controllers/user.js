// import { findUserById } from "../models/user.js";
import { query } from "../config/db.js";

export async function updateProfile(req, res) {
  try {
    const { name, email } = req.body;
    const userId = req.userId;

    if (!name && !email) {
      return res.status(400).json({ success: false, message: "name or email is required" });
    }

    const sets = [];
    const values = [];
    let idx = 1;

    if (name) {
      sets.push(`name = $${idx}`);
      values.push(name.trim());
      idx++;
    }

    if (email) {
      sets.push(`email = $${idx}`);
      values.push(email.toLowerCase().trim());
      idx++;
    }

    sets.push(`updated_at = NOW()`);
    values.push(userId);

    const result = await query(
      `UPDATE users SET ${sets.join(', ')} WHERE id = $${idx}
       RETURNING id, name, email, created_at`,
      values
    );

    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ success: false, message: "email is already in use" });
    }
    console.error("[USER] Update profile error:", error.message);
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}
