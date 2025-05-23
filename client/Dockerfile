# --- Stage 1: Build the React Application ---
FROM node:22 as build

# Set working directory
WORKDIR /app

# Copy frontend package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the client for production
RUN npm run build

# --- Stage 2: Serve the Static Files with Nginx ---
FROM nginx:alpine

# Copy the built React app from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]