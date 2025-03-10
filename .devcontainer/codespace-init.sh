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
  
  # Calculate the backend URL based on Codespaces environment
  BACKEND_HOST="https://$CODESPACE_NAME-$GITHUB_REPOSITORY_OWNER-$GITHUB_REPOSITORY_NAME.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"
  FRONTEND_HOST="https://$CODESPACE_NAME-$GITHUB_REPOSITORY_OWNER-$GITHUB_REPOSITORY_NAME.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"
  
  # Add or update VITE_API_URL in .env file for frontend
  if grep -q "VITE_API_URL" .env; then
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=$BACKEND_HOST:3001/api|g" .env
  else
    echo "VITE_API_URL=$BACKEND_HOST:3001/api" >> .env
  fi
  
  # Add or update API_URL in .env file for other potential usages
  if grep -q "API_URL" .env; then
    sed -i "s|API_URL=.*|API_URL=$BACKEND_HOST:3001/api|g" .env
  else
    echo "API_URL=$BACKEND_HOST:3001/api" >> .env
  fi
  
  # Add FRONTEND_URL for CORS settings in backend
  if grep -q "FRONTEND_URL" .env; then
    sed -i "s|FRONTEND_URL=.*|FRONTEND_URL=$FRONTEND_HOST:3000|g" .env
  else
    echo "FRONTEND_URL=$FRONTEND_HOST:3000" >> .env
  fi
  
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
fi

echo "Environment initialization complete" 