// server/models/Streak.js
import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
  date: String,
  score: Number,
});

export default mongoose.model("Streak", streakSchema);
