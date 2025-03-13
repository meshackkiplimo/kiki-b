import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoute';
import carRoutes from './routes/carRoute';
// s

dotenv.config();

console.log('Environment Variables Loaded:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
});


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
app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.status(200).json({ message: "Test route works!" });
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