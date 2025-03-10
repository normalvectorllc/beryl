import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import dbConnection from './db';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// CORS configuration with more flexible options
const corsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Get allowed origins from environment variable
    const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:3000'];
    
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Log the origin for debugging
    console.log(`Received request from origin: ${origin}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
    
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin) || origin.includes('github.dev')) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

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