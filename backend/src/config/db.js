import pkg from "pg";
const { Pool } = pkg;

// Debug: Check if DATABASE_URL is loaded
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Loaded" : "❌ NOT FOUND");
console.log("First 30 chars:", process.env.DATABASE_URL?.substring(0, 30));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL error:", err.message);
  process.exit(1);
});

export default pool; 
