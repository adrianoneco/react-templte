import type { Express } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { SOCKET_EVENTS } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up Passport-based authentication
  setupAuth(app);

  // Initialize Socket.io
  const io = new SocketIOServer(httpServer, {
    path: "/socket.io",
    cors: {
      origin: "*", // Adjust in production
      methods: ["GET", "POST"]
    }
  });

  io.on(SOCKET_EVENTS.CONNECT, (socket) => {
    console.log('Client connected:', socket.id);

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('Client disconnected:', socket.id);
    });

    socket.on(SOCKET_EVENTS.MESSAGE, (data) => {
      // Echo message back
      socket.emit(SOCKET_EVENTS.MESSAGE, data);
    });
  });

  // Example protected route API
  app.get("/api/dashboard", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json({ message: "Welcome to the dashboard", user: req.user });
  });

  return httpServer;
}
