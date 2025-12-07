const express = require("express");
const cors = require("cors");
const http = require("http"); // Needed for WebSocket server
const WebSocket = require("ws");
require("dotenv").config();
const connectDB = require("./config/db.js");

const userRoutes = require("./routes/userRoutes.js");
const workerRoutes = require("./routes/workerRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const app = express();

// ✅ CORS configuration – includes your deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      "https://worker-hub-frontendui.onrender.com", // 🔥 deployed frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Optional: handle preflight requests explicitly
app.options("*", cors());

// Parse JSON request bodies
app.use(express.json());

// 📝 Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.headers.authorization) {
    console.log(
      "Auth header present:",
      req.headers.authorization.substring(0, 20) + "..."
    );
  }
  next();
});

// ✅ Connect to MongoDB
connectDB();

// Base route
app.get("/", (req, res) => {
  res.send("Backend with MongoDB Atlas, .env, and config is running 🚀");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ✅ API routes (all prefixed with /api)
app.use("/api/users", userRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;

// Create HTTP server for WebSocket + Express
const server = http.createServer(app);

// WebSocket server on the same port as HTTP server
const wss = new WebSocket.Server({ server, path: "/ws" });

console.log(`🔌 WebSocket server will be available at ws://localhost:${PORT}/ws`);

wss.on("connection", (ws) => {
  console.log("✅ New WebSocket client connected");
  ws.send("Hello from WebSocket server!");

  ws.on("message", (message) => {
    console.log("📩 Message received:", message.toString());
    ws.send(`You said: ${message}`);
  });

  ws.on("close", () => {
    console.log("❌ WebSocket client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
