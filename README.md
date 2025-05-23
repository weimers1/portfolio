# My Portfolio

Welcome to my portfolio repo. Below you will find some information about the project.

### Stack
- MongoDB
- Express + Node
- React + Vite
- Tailwind CSS
- Docker

### Instructions for local setup and use
First build server with `docker build -t mern-backend ./server`.
Then build client with `docker build --build-arg REACT_APP_API_URL=http://host.docker.internal:8080 -t mern-frontend ./client`.
Ensure proper environment variables are configured for `TURNSTILE_SECRET_KEY`, `DB_CONNECTION_STRING`, and `GITHUB_API_KEY`.
Run backend with `docker run -p 8080:8080 --name mern-backend-c -d -e GITHUB_API_KEY='<github_api_key>' -e DB_CONNECTION_STRING='<db_connection_string>' -e TURNSTILE_SECRET_KEY='<turnstile_secret_key>' mern-backend`.
Run frontend with `docker run -p 80:80 --name mern-frontend-c -d mern-frontend`.