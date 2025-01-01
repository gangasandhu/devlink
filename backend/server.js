import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import commentsRouter from './routes/commentsRouter.js';
import followersRouter from './routes/followersRouter.js';
import codesRouter from './routes/codesRouter.js';
import likesRouter from './routes/likesRouter.js';

const app = express();

// Middleware
// Configure CORS
const clientURL = process.env.CLIENT_URL;
const allowedOrigins = [`${clientURL}:8000`,  `${clientURL}:5173`, clientURL]; // Add your frontend's origin here

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
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/followers', followersRouter);
app.use('/codes', codesRouter);



// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
