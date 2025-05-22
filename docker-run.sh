#!/bin/bash

# Make the script executable with: chmod +x docker-run.sh

# Function to display usage
show_usage() {
  echo "Usage: ./docker-run.sh [dev|prod|build|stop]"
  echo ""
  echo "Commands:"
  echo "  dev   - Run in development mode with hot-reloading"
  echo "  prod  - Run in production mode"
  echo "  build - Build the production Docker image"
  echo "  stop  - Stop all containers"
}

# Check if a command was provided
if [ $# -eq 0 ]; then
  show_usage
  exit 1
fi

# Process the command
case "$1" in
  dev)
    echo "Starting in development mode..."
    docker compose up dev
    ;;
  prod)
    echo "Starting in production mode..."
    docker compose up app
    ;;
  build)
    echo "Building production image..."
    docker compose build app
    ;;
  stop)
    echo "Stopping all containers..."
    docker compose down
    ;;
  *)
    show_usage
    exit 1
    ;;
esac 