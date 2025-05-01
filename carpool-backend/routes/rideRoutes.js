import express from "express";
import protect from "../middleware/auth.js";
import Ride from "../models/Ride.js";

const router = express.Router();

// POST /api/rides (Only accessible to logged-in drivers)
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

// GET /api/rides (Public - filter by startLocation, destination, and date)
router.get("/", async (req, res) => {
  try {
    const { destination, date, startLocation } = req.query;

    let query = {};

    if (destination) {
      query.destination = { $regex: new RegExp(destination, "i") };
    }

    if (startLocation) {
      query.startLocation = { $regex: new RegExp(startLocation, "i") };
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.departureTime = { $gte: startOfDay, $lte: endOfDay };
    }

    const rides = await Ride.find(query).populate("driver", "fullName email");
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter rides", error: error.message });
  }
});

export default router;
