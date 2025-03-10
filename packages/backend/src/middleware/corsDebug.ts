import { Request, Response, NextFunction } from 'express';

/**
 * Debug middleware for CORS in Codespaces
 * This adds CORS headers to all responses as a fallback
 */
export const corsDebugMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Force more prominent logging for every request
  console.log('\n\n==== CORS DEBUG MIDDLEWARE TRIGGERED ====');
  console.log(`${new Date().toISOString()} - Handling ${req.method} request to ${req.url}`);
  console.log('Request headers:');
  console.log(JSON.stringify(req.headers, null, 2));
  
  // Add CORS headers to the response for GitHub Codespaces
  if (process.env.CODESPACES === 'true') {
    console.log('🚨 Codespaces environment detected - applying CORS headers');
    
    // Get the origin from the request
    const origin = req.headers.origin || '*';
    console.log(`Setting Access-Control-Allow-Origin to: ${origin}`);
    
    // Add CORS headers - using * as a fallback 
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Add a custom header for debugging purposes
    res.header('X-CORS-Debug', 'Applied by corsDebugMiddleware');
    
    // Handle preflight requests immediately
    if (req.method === 'OPTIONS') {
      console.log('🚨 CORS Preflight request detected - responding with 200 OK');
      res.status(200).end();
      return;
    }
  } else {
    console.log('Not in Codespaces environment, skipping custom CORS headers');
  }
  
  // Intercept the response to ensure we can see when it completes
  const originalSend = res.send;
  res.send = function(body) {
    console.log(`Response status code: ${res.statusCode}`);
    console.log(`Response headers: ${JSON.stringify(res.getHeaders(), null, 2)}`);
    console.log('==== CORS DEBUG MIDDLEWARE COMPLETE ====\n\n');
    return originalSend.call(this, body);
  };
  
  next();
}; 