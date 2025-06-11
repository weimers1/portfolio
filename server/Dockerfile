# Use Node.js image
FROM node:22

# Define build args
ARG URL_CLIENT_ARG

# Set working directory
WORKDIR /app

# Set environment variables
ENV URL_CLIENT=${URL_CLIENT_ARG}

# Copy backend package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose server port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]