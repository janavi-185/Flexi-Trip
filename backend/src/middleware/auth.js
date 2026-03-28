import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "authorization token is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    console.log("[AUTH] Token verified for user:", req.userId);
    next();
  } catch (error) {
    console.error("[AUTH] Token verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "invalid or expired token",
    });
  }
}
