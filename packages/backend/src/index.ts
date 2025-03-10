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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
    
    // Start server
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
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