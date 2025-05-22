# Docker Setup for SvelteKit Project

This README explains how to run the SvelteKit project using Docker, which isolates the application from any shell-related issues.

## Prerequisites

- Docker installed on your machine

## Docker Files

The project includes several Docker-related files:

- `Dockerfile` - For production builds
- `Dockerfile.dev` - Optimized for development with hot-reloading
- `docker-compose.yml` - Defines both production and development services
- `.dockerignore` - Excludes unnecessary files from the Docker image
- `docker-run.sh` - Helper script to run Docker commands

## Running the Application

You can use the helper script `docker-run.sh` to manage Docker operations:

```bash
# Make the script executable (one-time setup)
chmod +x docker-run.sh

# Development mode with hot-reloading
./docker-run.sh dev

# Production mode
./docker-run.sh prod

# Build the production Docker image
./docker-run.sh build

# Stop all containers
./docker-run.sh stop
```

## Development Mode

When running in development mode:

- The application runs on port 5173
- Changes to source files are immediately reflected (hot-reloading)
- The following directories are mounted as volumes:
  - `./src`
  - `./static`
  - `./svelte.config.js`
  - `./vite.config.js`

Access the application at: http://localhost:5173

## Production Mode

When running in production mode:

- The application runs on port 3000
- The application is built during Docker image creation
- The SvelteKit preview server is used to serve the built application
- No hot-reloading is available

Access the application at: http://localhost:3000

## Manual Docker Commands

If you prefer to use Docker commands directly:

```bash
# Development mode
docker compose up dev

# Production mode
docker compose up app

# Build production image
docker compose build app

# Stop all containers
docker compose down
```

## Troubleshooting

If you encounter permission issues with the script:
```bash
chmod +x docker-run.sh
```

If you get "Module not found" errors:
- Make sure the build process completed successfully 
- Check if the SvelteKit adapter settings in `svelte.config.js` are correct
- Verify that the Docker container has access to the build directory

If ports are already in use, modify the port mappings in `docker-compose.yml`.

## Note About SvelteKit Static Adapter

If you're using the `@sveltejs/adapter-static`, make sure the output directory in `svelte.config.js` matches the path in the Docker CMD. The current configuration uses the `preview` command to serve the built application. 