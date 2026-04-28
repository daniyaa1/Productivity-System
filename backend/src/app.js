import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/insights", insightRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Server error" });
});

