// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Create a User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  mobile: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: String,
  gender: String,
  email: String,
  profession: String,
});

// Create a Mongoose Model
const User = mongoose.model("User", userSchema);

// Checking if email exists
app.post('/check-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }

  try {
      const emailExists = await User.findOne({ email });
      res.json({ exists: !!emailExists });
  } catch (err) {
      console.error("Error checking email:", err.message);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Checking if username exists
app.post('/check-username', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    const usernameExists = await User.findOne({ username });
    res.json({ exists: !!usernameExists });
  } catch (err) {
    console.error("Error checking username:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User registration
app.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  const userData = new User(req.body);

  try {
    await userData.save();
    res.status(200).send({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error Saving Data:", err.message);
    res.status(500).send({ message: "Error registering user: " + err.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Username and password are required" });
  }
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    res.status(200).send({ message: "Login successful!" });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));