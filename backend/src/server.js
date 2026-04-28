import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { setSocketServer } from "./socket.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
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
  console.error("Failed to start server", error);
  process.exit(1);
});

