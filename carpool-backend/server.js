import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple Test Route
app.get('/', (req, res) => {
  res.send('Carpool Backend API is Running 🚗');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully ✅'))
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err.message);
  });

