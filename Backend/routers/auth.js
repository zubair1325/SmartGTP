import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ExpressError("Name, email and password are required.", 400);
    }
    if (password.length < 6) {
      throw new ExpressError("Password must be at least 6 characters.", 400);
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      throw new ExpressError("An account with this email already exists.", 409);
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: safeUser(user),
    });
  }),
);
router.post(
  "/login",
  wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ExpressError("Email and password are required.", 400);
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      throw new ExpressError("Invalid email or password.", 401);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ExpressError("Invalid email or password.", 401);
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Logged in successfully.",
      token,
      user: safeUser(user),
    });
  }),
);

import protect from "../middleware/protect.js";

router.get(
  "/me",
  protect,
  wrapAsync(async (req, res) => {
    res.json({ user: safeUser(req.user) });
  }),
);

export default router;
export { safeUser };
