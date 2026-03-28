import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/user.js";
 
const JWT_EXPIRES_IN = "7d";

function signToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("[AUTH] Register attempt:", { email });

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 characters",
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "email is already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });
    const token = signToken(user.id);

    console.log("[AUTH] Register success:", { userId: user.id, email: user.email });

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("[AUTH] Register error:", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log("[AUTH] Login attempt:", { email });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const userWithPassword = await findUserByEmail(email);
    if (!userWithPassword) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userWithPassword.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const token = signToken(userWithPassword.id);

    const user = {
      id: userWithPassword.id,
      name: userWithPassword.name,
      email: userWithPassword.email,
      created_at: userWithPassword.created_at,
    };

    console.log("[AUTH] Login success:", { userId: user.id, email: user.email });

    return res.status(200).json({
      success: true,
      message: "login successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("[AUTH] Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function me(req, res) {
  try {
    const user = await findUserById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("[AUTH] Me endpoint error:", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}
