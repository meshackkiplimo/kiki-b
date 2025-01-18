import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoute';
import carRoutes from './routes/carRoute';
// s

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'], // Frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());





// Test route
app.get('/', (req, res) => {
  res.json({ message: ' API is running' });
});

// api rout
app.use("/api/user", userRoutes);
app.use("/api/cars", carRoutes);
// app.use("/api/admin", adminRoutes);


// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});