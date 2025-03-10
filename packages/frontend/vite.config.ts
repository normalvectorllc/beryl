import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Vite environment variables:', {
    VITE_API_URL: env.VITE_API_URL,
    API_URL: env.API_URL,
    CODESPACES: env.CODESPACES
  });
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true, // This allows connections from outside of the container
      cors: true, // Enable CORS for development server
      
      // Add proxy configuration for API requests
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          ws: true,
          // Log proxy requests for debugging
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Expose all environment variables to the client with VITE_ prefix
    define: {
      // Properly define environment variables for Vite
      'import.meta.env.VITE_API_URL': JSON.stringify('/api'),
      'import.meta.env.CODESPACES': JSON.stringify(env.CODESPACES || 'false'),
    },
  };
});