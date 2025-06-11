# Use Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy .env file
COPY .env ./

# Copy backend package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose server port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]