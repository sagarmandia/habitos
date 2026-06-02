#!/bin/bash

set -e

echo "===== Starting Deployment ====="

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "Pulling latest code..."
git pull

echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd server
npm install

echo "Installing frontend dependencies..."
cd ../client
npm install

echo "Building frontend..."
npm run build

echo "Restarting API..."
pm2 restart habitos-api

echo "Restarting Frontend..."
pm2 restart habitos-web

echo "Running health check..."
curl -f https://api.habitos.sagarm.online/health

echo "Deployment successful."