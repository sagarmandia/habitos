import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import habitRoutes from './routes/habit.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import errorHandler from './middleware/error.middleware.js';

dotenv.config();

const app = express();

// Trust proxy, reverse proxy 
app.set('trust proxy', 1);

// Security rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 authentication requests per windowMs (brute force block)
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again after 15 minutes' }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());

// Apply rate limiting globally to API routes
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Habit routes
app.use('/api/habits', habitRoutes);

// Analytics routes
app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Centralized error handler
app.use(errorHandler);

export default app;



