#!/bin/bash

# This script initializes the environment for the Task Management System

# Create .env file from template if it doesn't exist
if [ ! -f ".env" ]; then
  cp .env.template .env
  echo "Created .env file from template"
fi

# Create a basic .env file for the backend
mkdir -p packages/backend
cat > packages/backend/.env << EOL
NODE_ENV=development
EOL

echo "Environment initialization complete" 