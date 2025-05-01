import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js'; // Add `.js` extension for ES modules

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/routes', routes);

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