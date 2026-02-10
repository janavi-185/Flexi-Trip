import pool from "../config/db.js";

// CREATE skill request
export const createSkillRequest = async (req, res) => {
  console.log("📩 Skill request API HIT");

  const requesterId = req.userId;
  const { provider_id, skill_name } = req.body;

  console.log("➡️ requester:", requesterId);
  console.log("➡️ provider:", provider_id);
  console.log("➡️ skill:", skill_name);

  if (!provider_id || !skill_name) {
    console.log("❌ Missing provider_id or skill_name");
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await pool.query(
      `INSERT INTO skill_requests (requester_id, provider_id, skill_name)
       VALUES ($1, $2, $3)`,
      [requesterId, provider_id, skill_name]
    );

    console.log("✅ Skill request created");
    res.status(201).json({ message: "Skill request sent" });

  } catch (error) {
    console.log("🔥 DB ERROR in createSkillRequest:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptSkillRequest = async (req, res) => {
  console.log("🤝 Accept skill request API HIT");

  const requestId = req.params.id;
  const providerId = req.userId;

  console.log("➡️ requestId:", requestId);
  console.log("➡️ provider:", providerId);

  try {
    // First, check if the request exists and who the provider is
    const checkRequest = await pool.query(
      `SELECT * FROM skill_requests WHERE id = $1`,
      [requestId]
    );

    if (checkRequest.rows.length === 0) {
      console.log("❌ Request not found with ID:", requestId);
      return res.status(404).json({ message: "Request not found" });
    }

    const request = checkRequest.rows[0];
    console.log("📋 Found request:", {
      id: request.id,
      requester_id: request.requester_id,
      provider_id: request.provider_id,
      skill_name: request.skill_name,
      status: request.status
    });
    console.log("🔍 Comparing provider_id:", request.provider_id, "with logged-in user:", providerId);

    const result = await pool.query(
      `UPDATE skill_requests
       SET status = 'ACCEPTED'
       WHERE id = $1 AND provider_id = $2
       RETURNING *`,
      [requestId, providerId]
    );

    if (result.rows.length === 0) {
      console.log("❌ Unauthorized: You are not the provider for this request");
      return res.status(403).json({ 
        message: "Not allowed - you are not the provider for this request" 
      });
    }

    console.log("✅ Skill request accepted");
    res.json({ message: "Request accepted" });

  } catch (error) {
    console.log("🔥 DB ERROR in acceptSkillRequest:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
