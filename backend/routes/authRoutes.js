import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET; // Use a strong secret key from environment variables

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set JWT in HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Register Endpoint
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const [users] = await db.query("SELECT id, username, email FROM users WHERE id = ?", [result.insertId]);
    const user = users[0];

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set JWT in HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
    // Clear the authToken cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Helps mitigate CSRF
    });
    return res.status(200).json({ message: 'Logout successful' });
  });

router.get('/check-session', (req, res) => {
    const token = req.cookies.authToken;
  
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.status(200).json({ user: decoded });
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  });

// Middleware to Authenticate JWT
export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};



export default router;
