require("dotenv").config();
const dns = require("dns");

// Force Google DNS to bypass ISP DNS limitations (required for MongoDB Atlas SRV records)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

if (!process.env.MONGODB_URI) {
  console.log(
    "⚠️ No MONGODB_URI found, using local MongoDB: mongodb://localhost:27017/ecommerce",
  );
}

async function startServer() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    console.log(
      "💡 If using Atlas, check your connection string and network access.",
    );
    console.log(
      "💡 For local MongoDB, ensure MongoDB is running on localhost:27017",
    );
    process.exit(1);
  }
}

startServer();

// Schema & Model
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Endpoint to get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    console.error("Error retrieving items:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Endpoint for user signup
app.post("/api/signup", async (req, res) => {
  const { username, phone, email, password } = req.body;

  // Validate inputs
  if (!username || !phone || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    console.error("Full error:", err);
    res.status(500).json({
      error: "Server Error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// Endpoint for user signin
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("❌ Error during signin:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});
