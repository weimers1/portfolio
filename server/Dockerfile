# Use Node.js image
FROM node:22

# Define build args for non-secrets
ARG URL_CLIENT_ARG

# Set working directory
WORKDIR /app

# Set environment variables for runtime
ENV URL_CLIENT=${URL_CLIENT_ARG}

# Set secrets as environment variables.
# These values are populated during the build step because Cloud Build's secretEnv
# makes them available. The ENV instruction captures them into the final image.
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