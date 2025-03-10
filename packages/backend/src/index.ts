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
console.log('\n\n==== SERVER STARTUP ====');
console.log('Environment variables:');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CODESPACES:', process.env.CODESPACES);
console.log('==== END SERVER STARTUP LOGS ====\n\n');

// Handle OPTIONS requests first, before any other middleware
// This ensures preflight requests bypass authentication
app.options('*', (req, res) => {
  console.log('Preflight OPTIONS request received - setting headers and responding with 200');
  
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', '*');  // Allow all headers
  res.header('Access-Control-Max-Age', '86400');  // Cache preflight response for 24 hours
  
  // Respond with 200 OK
  res.status(200).end();
});

// Use the cors middleware with maximum permissiveness
// This handles non-OPTIONS requests
console.log('Setting up wildcard CORS with the cors middleware');
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: '*',  // Allow all headers
  credentials: false,   // Must be false with wildcard origin
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Regular middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Add some direct test routes outside the /api prefix for easier testing
app.get('/test', (req, res) => {
  console.log('Test route hit!');
  console.log('Request headers:', req.headers);
  res.json({ 
    message: 'Backend is working!',
    cors: 'If you see this in the browser, CORS is working properly',
    timestamp: new Date().toISOString()
  });
});

app.get('/cors-test', (req, res) => {
  console.log('CORS test route hit');
  res.json({ 
    message: 'CORS test successful', 
    headers: req.headers
  });
});

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