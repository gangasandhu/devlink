import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
// Configure CORS
const allowedOrigins = ['http://localhost:5173']; // Add your frontend's origin here

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
