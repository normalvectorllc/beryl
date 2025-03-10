#!/bin/bash

# This script sets up environment variables for proper frontend-backend communication in Codespaces

# Create .env file from template if it doesn't exist
if [ ! -f ".env" ]; then
  cp .env.template .env
  echo "Created .env file from template"
fi

# Determine if we're running in Codespaces
if [ -n "$CODESPACES" ] && [ "$CODESPACES" = "true" ]; then
  echo "Running in GitHub Codespaces environment"
  
  # GitHub Codespaces uses different URL formats for port forwarding
  # Frontend port is embedded in the hostname: hostname-port.domain
  # Backend may use a different format
  
  # Format for frontend URL (port in hostname)
  FRONTEND_HOST="https://$CODESPACE_NAME-3000.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"
  
  # Format for backend URL (port in hostname)
  BACKEND_HOST="https://$CODESPACE_NAME-3001.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"
  
  echo "Frontend URL: $FRONTEND_HOST"
  echo "Backend URL: $BACKEND_HOST"
  
  # Add or update VITE_API_URL in .env file for frontend
  if grep -q "VITE_API_URL" .env; then
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=$BACKEND_HOST/api|g" .env
  else
    echo "VITE_API_URL=$BACKEND_HOST/api" >> .env
  fi
  
  # Add or update API_URL in .env file for other potential usages
  if grep -q "API_URL" .env; then
    sed -i "s|API_URL=.*|API_URL=$BACKEND_HOST/api|g" .env
  else
    echo "API_URL=$BACKEND_HOST/api" >> .env
  fi
  
  # Add FRONTEND_URL for CORS settings in backend
  if grep -q "FRONTEND_URL" .env; then
    sed -i "s|FRONTEND_URL=.*|FRONTEND_URL=$FRONTEND_HOST|g" .env
  else
    echo "FRONTEND_URL=$FRONTEND_HOST" >> .env
  fi
  
  # Add CODESPACES flag
  if grep -q "CODESPACES" .env; then
    sed -i "s|CODESPACES=.*|CODESPACES=true|g" .env
  else
    echo "CODESPACES=true" >> .env
  fi
  
  # Create a dedicated .env file in the backend directory
  echo "Creating backend environment file..."
  mkdir -p packages/backend
  cat > packages/backend/.env << EOL
FRONTEND_URL=$FRONTEND_HOST
CODESPACES=true
NODE_ENV=development
EOL
  
  echo "Environment configured for Codespaces"
else
  echo "Not running in Codespaces, using local development environment"
  
  # For local development
  if ! grep -q "VITE_API_URL" .env; then
    echo "VITE_API_URL=http://localhost:3001/api" >> .env
  fi
  
  if ! grep -q "API_URL" .env; then
    echo "API_URL=http://localhost:3001/api" >> .env
  fi
  
  if ! grep -q "FRONTEND_URL" .env; then
    echo "FRONTEND_URL=http://localhost:3000" >> .env
  fi
  
  # Create a .env file for backend directory in local dev too
  mkdir -p packages/backend
  cat > packages/backend/.env << EOL
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
EOL
fi

echo "Environment initialization complete" 