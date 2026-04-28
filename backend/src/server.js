import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { setSocketServer } from "./socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  console.log("Starting server...");
  console.log("Environment check:", {
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    hasJwtSecret: Boolean(process.env.JWT_SECRET),
    clientUrl: process.env.CLIENT_URL || "missing",
    port: PORT,
  });
  await connectDB();

  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
      credentials: true,
    },
  });

  setSocketServer(io);

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});

