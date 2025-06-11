# Use Node.js image
FROM node:22

# Define build arguments for all variables, including secrets
ARG URL_CLIENT_ARG
ARG DB_CONNECTION_STRING
ARG GITHUB_API_KEY
ARG TURNSTILE_SECRET_KEY
ARG BREVO_API_KEY

# Set working directory
WORKDIR /app

# Set environment variables inside the final image for runtime access
ENV URL_CLIENT=${URL_CLIENT_ARG}
ENV DB_CONNECTION_STRING=${DB_CONNECTION_STRING}
ENV GITHUB_API_KEY=${GITHUB_API_KEY}
ENV TURNSTILE_SECRET_KEY=${TURNSTILE_SECRET_KEY}
ENV BREVO_API_KEY=${BREVO_API_KEY}

# Copy backend package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Expose server port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]