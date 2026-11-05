
const express = require("express");
const db = require("./configs/db");
const propertyRoutes = require("./routes/propertyRoutes");

require("dotenv").config();

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "House Rental API is running successfully"
  });
});

// Property routes
app.use("/properties", propertyRoutes);

// Handle unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found"
  });
});

// Start the server after checking database connection
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await db.getConnection();

    console.log("Database connected successfully!");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
