import express from "express";
import protect from "../middleware/auth.js";
import Ride from "../models/Ride.js";

const router = express.Router();

// POST /api/rides
router.post("/", protect, async (req, res) => {
  const { startLocation, destination, departureTime, availableSeats, price } = req.body;

  try {
    const newRide = new Ride({
      driver: req.user.id,
      startLocation,
      destination,
      departureTime,
      availableSeats,
      price
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (error) {
    res.status(500).json({ message: "Failed to post ride", error: error.message });
  }
});
// GET /api/rides
router.get("/", async (req, res) => {
  try {
    const rides = await Ride.find().populate("driver", "fullName email");
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error: error.message });
  }
});

export default router;
