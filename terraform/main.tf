provider "google" {
  project = "samweimer-portfolio"
  region  = "us-central1"
}
resource "google_cloud_run_service" "backend" {
  name     = "portfolio-backend"
  location = "us-central1"
  template {
    spec {
      containers {
        image = "us-central1-docker.pkg.dev/samweimer-portfolio/portfolio-repo/backend:latest"
      }
    }
  }
}
resource "google_cloud_run_service" "frontend" {
  name     = "portfolio-frontend"
  location = "us-central1"
  template {
    spec {
      containers {
        image = "us-central1-docker.pkg.dev/samweimer-portfolio/portfolio-repo/frontend:latest"
      }
    }
  }
}
