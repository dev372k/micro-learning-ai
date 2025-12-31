const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");

require("dotenv").config();

const app = express();
// Middlewares
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Database Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Default Route
app.get("/", (req, res) => {
  res.json({ status: "Server is running." });
});

// Health Check Route 
app.get("/health", (req, res) => {
  res.json({ status: "Server is healthy." });
});

app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
