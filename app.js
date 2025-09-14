const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// In-memory storage for demo purposes
const users = [];

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    usersCount: users.length,
  });
});

app.post("/register", (req, res) => {
  const { fullName, email, phone, age, country } = req.body;

  // Basic validation
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters long");
  }

  if (!email || !email.includes("@")) {
    errors.push("Please provide a valid email address");
  }

  if (!phone || phone.length < 10) {
    errors.push("Phone number must be at least 10 digits");
  }

  if (!age || age < 18 || age > 120) {
    errors.push("Age must be between 18 and 120");
  }

  if (!country || country === "select") {
    errors.push("Please select a country");
  }

  // Check for duplicate email
  if (users.find((user) => user.email === email)) {
    errors.push("Email already registered");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  // Save user
  const newUser = {
    id: users.length + 1,
    fullName: fullName.trim(),
    email: email.toLowerCase(),
    phone,
    age: parseInt(age),
    country,
    registeredAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.json({
    success: true,
    message: "Registration successful!",
    userId: newUser.id,
  });
});

app.get("/users", (req, res) => {
  res.json({
    users: users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      country: user.country,
      registeredAt: user.registeredAt,
    })),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Page not found" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(
      `🚀 User Registration Demo running on http://localhost:${PORT}`
    );
  });
}

module.exports = app;
