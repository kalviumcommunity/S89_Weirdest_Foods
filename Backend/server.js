const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
dotenv.config();

const cors = require('cors');
app.use(cors());

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); 
app.use('/routes', routes); 

try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database connected successfully');
} catch (error) {
  console.error('Database connection error:', error.message);
  process.exit(1); 
}

app.get('/', (req, res) => {
    res.send('Welcome! Server and Database are up and running.');
});

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});