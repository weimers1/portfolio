# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies for server
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy client package.json and install client dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy all app files
COPY . .

# Build the client (React) for production
RUN cd client && npm run build

# Expose server port
EXPOSE 8080

# Start the server
CMD ["node", "server/index.js"]
