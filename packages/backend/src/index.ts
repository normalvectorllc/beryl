import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { corsDebugMiddleware } from './middleware/corsDebug';
import routes from './routes';
import dbConnection from './db';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// Log all environment variables for debugging
console.log('Environment variables:');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CODESPACES:', process.env.CODESPACES);

// CORS configuration with more direct approach for Codespaces
const corsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log('Incoming request from origin:', origin);
    
    // For Codespaces or development, be very permissive
    if (process.env.CODESPACES === 'true' || process.env.NODE_ENV === 'development') {
      // Allow any origin in Codespaces for now (for debugging)
      return callback(null, true);
    }
    
    // For production, use a stricter check
    const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('CORS not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Add the CORS debug middleware as a fallback
app.use(corsDebugMiddleware);

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
const startServer = async (): Promise<void> => {
  try {
    // Initialize database connection
    await dbConnection.initialize();
    logger.info('Database connection initialized successfully');
    
    // Start server - listen on all interfaces
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, '0.0.0.0', () => {
        logger.info(`Server running on port ${PORT}`);
        logger.info(`CORS configured to allow: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      });
    }
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
if (process.env.NODE_ENV !== 'test') {
  startServer().catch(error => {
    logger.error('Unhandled error during server startup:', error);
    process.exit(1);
  });
}

// For testing purposes
export default app;