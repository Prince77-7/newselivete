FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 4545

# Add a host flag to make it accessible from outside the container
ENV HOST=0.0.0.0

# Set the command to run the app in production mode
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4545"] 