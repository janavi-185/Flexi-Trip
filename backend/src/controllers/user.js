import pool from "../config/db.js";

// GET logged-in user profile
export const getMyProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, skills_offered, skills_desired, trust_score FROM users WHERE id = $1",
      [req.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE skills
export const updateMySkills = async (req, res) => {
  try {
    const { skills_offered, skills_desired } = req.body;

    await pool.query(
      `UPDATE users
       SET skills_offered = $1,
           skills_desired = $2
       WHERE id = $3`,
      [skills_offered, skills_desired, req.userId]
    );

    res.json({ message: "Skills updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 