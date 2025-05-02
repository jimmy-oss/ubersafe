import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import protect from "../middleware/auth.js";
const router = express.Router();

// Update profile picture
router.put('/profile-pic', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profilePic = req.body.profilePic;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated', profilePic: user.profilePic });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile picture', error: error.message });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  const { fullName, email, password, isDriver } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      isDriver,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      isDriver: savedUser.isDriver,
      profilePic: savedUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isDriver: user.isDriver },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isDriver: user.isDriver
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ PROTECTED ROUTE (outside login!)
router.get("/protected", protect, (req, res) => {
  res.json({ message: "Access granted ✅", user: req.user });
});

export default router;
