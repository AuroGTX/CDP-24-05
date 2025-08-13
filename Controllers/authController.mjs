import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, nic, email, password } = req.body;
    if (!name || !nic || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ⬇️ check both email and NIC
    const exists = await User.findOne({ $or: [{ email }, { nic }] });
    if (exists) {
      const field = exists.email === email ? "Email" : "NIC";
      return res.status(400).json({ message: `${field} in use` });
    }

    const user = new User({ name, nic, email });
    await user.setPassword(password);
    await user.save();

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { nic, password } = req.body;               // ⬅️ NIC instead of email
    const user = await User.findOne({ nic });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user._id);
    return res.json({
      token,
      user: { id: user._id, nic: user.nic, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

// Optional: a /auth/me endpoint handler
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-passwordHash" // exclude passwordHash
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (e) {
    console.error("Profile load error:", e);
    res.status(500).json({ message: "Failed to load profile" });
  }
};
