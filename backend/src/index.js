import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "node:dns";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Use public DNS for MongoDB SRV resolution
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check / root route
app.get("/", (req, res) => {
  res.json({
    message: "Chat App Backend is running 🚀",
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running on PORT: ${PORT}`);
  connectDB();
});