const express = require("express");               // Express framework for creating routes
const connectDB = require("./config/db");        // Import DB connection
const authRoutes = require("./routes/auth");     // Import auth routes
const cors = require("cors");                    // Allow frontend to make requests
require("dotenv").config();                      // Load variables from .env file

const app = express();                           // Create an Express app

connectDB();                                     // Connect to MongoDB

app.use(cors());                                 // Enable CORS for frontend
app.use(express.json());                         // Enable JSON request parsing

app.use("/api", authRoutes);                     // Route prefix for auth APIs

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
