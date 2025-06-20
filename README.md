# My Portfolio

Welcome to my portfolio repo. Below you will find some information about the project.

### Stack

-   MongoDB
-   Express + Node
-   React + Vite
-   Tailwind CSS
-   Docker

### Instructions for local setup and use

First build server with `docker build -t mern-backend ./server`.  
Then build client with `docker build --build-arg VITE_BASE_URL_API_ARG=http://localhost:8080 -t mern-frontend ./client`.  
Ensure proper environment variables are configured for `TURNSTILE_SECRET_KEY`, `DB_CONNECTION_STRING`, and `GITHUB_API_KEY`.  
Run backend with `docker run -p 8080:8080 --name mern-backend-c -d -e GITHUB_API_KEY='<github_api_key>' -e DB_CONNECTION_STRING='<db_connection_string>' -e TURNSTILE_SECRET_KEY='<turnstile_secret_key>' mern-backend`.  
Run frontend with `docker run -p 80:8080 --name mern-frontend-c -d mern-frontend`.

### Instructions for production setup and use

First, create a `cloudbuild.yaml` file in the root of `client`.

Then build client with `gcloud builds submit ./client --config=./client/cloudbuild.yaml --substitutions _VITE_BASE_URL_API_ARG=<backend_url>`.

Then GCP secret manager must be set up with the proper secrets as seen in the `cloudbuild.yaml` file in the root of `server`

Then build server with `gcloud builds submit ./server --config=./server/cloudbuild.yaml`.

Run frontend container with:
`gcloud run deploy portfolio-frontend --region <region> --image <region>-docker.pkg.dev/samweimer-portfolio/portfolio-repo/frontend:latest --platform managed --allow-unauthenticated`

Then run backend container with:
`gcloud run deploy portfolio-backend --region <region> --image <region>-docker.pkg.dev/samweimer-portfolio/portfolio-repo/backend:latest --platform managed --allow-unauthenticated`

#### Disclaimers

With regard to the use of all product images and logos, I am not affiliated with these products, services, or organizations in any way. The use of these logos have been obtained legally or are within the logo usage guidelines.  
For specific logos such as Microsoft products and Oracle products, these logos are being used with permission from Microsoft and Oracle.
