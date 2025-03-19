const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.get('/ping', (req, res) => {
  res.send('pong');
});


app.listen(8080, async() => {
  try {
    await mongoose.connect("mongodb+srv://kakihari03:Khss2007@cluster0.wy8lt.mongodb.net/");
    console.log("Server Connected Sucessfully");
  } catch (error) {
    console.log(error);
  }
});