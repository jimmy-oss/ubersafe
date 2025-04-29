import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './routes/authRoutes.js';
import rideRoutes from "./routes/rideRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // this comes before the routes

// Routes
app.use("/api", authRoutes);
app.use("/api/rides", rideRoutes);
// Test Route
app.get('/', (req, res) => {
  res.send('Carpool Backend API is Running 🚗');
});

// Connect to MongoDB and then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully ✅');
    
    // Start server only after DB is ready
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err.message);
  });
