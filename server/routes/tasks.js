// server/routes/tasks.js
import express from "express";
import Task from "../models/Task.js";
import Streak from "../models/Streak.js";
import CompletedTask from "../models/CompletedTask.js";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Task text required" });

  try {
    const newTask = new Task({ text });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle task done
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.done = !task.done;
    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Finish day
router.post("/finish-day", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks.length) return res.status(400).json({ error: "No tasks today" });

    const doneCount = tasks.filter((t) => t.done).length;
    const streakPoint = doneCount / tasks.length;

    const today = new Date();
    const dateString = today.toLocaleDateString("en-GB");
    const dayName = today.toLocaleDateString("en-US", { weekday: "short" });

    // Save streak
    await Streak.create({ date: `${dateString} (${dayName})`, score: streakPoint });

    // Save completed tasks
    await CompletedTask.create({
      date: `${dateString} (${dayName})`,
      tasks: tasks.filter((t) => t.done).map((t) => t.text),
    });

    // Clear today's tasks
    await Task.deleteMany();

    res.json({ message: "Day finished", streak: streakPoint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get completed tasks
router.get("/completed", async (req, res) => {
  try {
    const completed = await CompletedTask.find().sort({ date: -1 });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
