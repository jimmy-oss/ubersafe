import express from "express";
import protect from "../middleware/auth.js";
import Ride from "../models/Ride.js";

const router = express.Router();

// POST /api/rides (Driver only)
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

// GET /api/rides/my - Get rides posted by the logged-in driver
router.get("/my", protect, async (req, res) => {
  try {
    const myRides = await Ride.find({ driver: req.user.id })
      .populate("bookedBy", "fullName email")
      .sort({ departureTime: 1 });
    res.status(200).json(myRides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your rides", error: error.message });
  }
});


// GET /api/rides
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

router.post("/book", protect, async (req, res) => {
  const { rideId } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (ride.availableSeats <= 0) return res.status(400).json({ message: "No available seats" });

    ride.availableSeats -= 1;
    await ride.save();

    res.status(200).json({ message: "Booking successful" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});


// ✅ NEW: Book a ride
router.post("/:id/book", protect, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    ride.availableSeats -= 1;
    await ride.save();

    res.status(200).json({ message: "Booking successful", ride });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

export default router;
