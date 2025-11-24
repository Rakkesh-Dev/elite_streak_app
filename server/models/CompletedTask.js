// server/models/CompletedTask.js
import mongoose from "mongoose";

const completedTaskSchema = new mongoose.Schema({
  date: String,
  tasks: [String],
});

export default mongoose.model("CompletedTask", completedTaskSchema);
