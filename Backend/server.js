import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes.js'; // Add `.js` extension for ES modules
import authRoutes from './authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configure CORS to allow credentials
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware
app.use('/routes', routes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Database connection error:', error.message));

app.get('/', (req, res) => {
    res.send('Welcome! Server and Database are up and running.');
});

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
});