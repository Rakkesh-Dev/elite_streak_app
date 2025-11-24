// server/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Task", taskSchema);
