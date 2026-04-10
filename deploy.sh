#!/bin/bash
set -e

cd /var/www/clarivive/frontend

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm_config_legacy_peer_deps=true npm install --legacy-peer-deps

echo "Building frontend..."
npm run build

echo "Reloading PM2..."
pm2 reload nextjs-app || pm2 start ecosystem.config.js
pm2 save

echo "Deployment complete."
