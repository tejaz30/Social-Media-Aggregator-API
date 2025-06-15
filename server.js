const path = require("path");
const express = require("express");               // Express framework for creating routes
const connectDB = require("./config/db");        // Import DB connection
const authRoutes = require("./routes/auth");     // Import auth routes
const postRoutes = require("./routes/post");

const http = require('http');
const socketIo = require('socket.io');
const app = express();                           // Create an Express app


const server = http.createServer(app); // create server for socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("⚡ New client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

app.set("io", io); // Make io available globally


const cors = require("cors");                    // Allow frontend to make requests
require("dotenv").config();                      // Load variables from .env file


connectDB();                                     // Connect to MongoDB

app.use(cors());                                 // Enable CORS for frontend
app.use(express.json());                         // Enable JSON request parsing
app.use("/api/posts", postRoutes);
app.use("/api", authRoutes);                     // Route prefix for auth APIs

// Serve static files from the frontend folder (adjust path if needed)
app.use(express.static(path.join(__dirname, "frontend")));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} `));

