// server/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();

// ---- ESM-safe __dirname ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- CORS setup ----
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://your-production-frontend.com" // replace with your production URL
    : "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// ---- API routes ----
app.use("/api/tasks", taskRoutes);

// ---- MongoDB connection ----
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ---- Serve React frontend in production ----
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  // ESM-safe catch-all route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

// ---- Start server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
