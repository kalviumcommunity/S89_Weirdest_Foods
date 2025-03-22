const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

app.get('/ping', (req, res) => {
  res.send('pong');
});

async function connectDataBase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Backend connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Re-throw to handle gracefully elsewhere
  }
}

app.get('/', async (req, res) => {
  try {
    await connectDataBase();
    res.send("Database connection successful!");
  } catch (error) {
    res.status(500).send("Failed to connect to the database.");
  }
});

app.listen(8080, () => {
  console.log("Server Connected Successfully on port 8080");
});