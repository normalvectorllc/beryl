import { Request, Response, NextFunction } from 'express';

/**
 * Debug middleware for CORS in Codespaces
 * This adds CORS headers to all responses as a fallback
 */
export const corsDebugMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Log the request details
  console.log('CORS Debug Middleware:');
  console.log('  Method:', req.method);
  console.log('  URL:', req.url);
  console.log('  Origin:', req.headers.origin);
  console.log('  Host:', req.headers.host);
  console.log('  Referer:', req.headers.referer);
  
  // Add CORS headers to the response for GitHub Codespaces
  // This is a fallback in case the CORS middleware doesn't work properly
  if (process.env.CODESPACES === 'true') {
    const origin = req.headers.origin || '';
    
    // Allow the origin that made the request
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  }
  
  next();
}; 