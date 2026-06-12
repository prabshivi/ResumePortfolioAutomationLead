terraform {
  required_version = ">= 1.0.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  type        = string
  description = "The GCP Project ID where resources will be created"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "The region for local resources"
}

variable "domain_name" {
  type        = string
  description = "Your custom domain name (e.g. shiviprabhakar.com)"
}

# 1. Google Cloud Storage Bucket for website hosting
resource "google_storage_bucket" "website_bucket" {
  name          = var.domain_name
  location      = "US"
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# 2. Make the Bucket Publicly Readable
resource "google_storage_bucket_iam_member" "public_rule" {
  bucket = google_storage_bucket.website_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# 3. Backend Bucket for Load Balancing + Cloud CDN
resource "google_compute_backend_bucket" "website_backend" {
  name        = "${replace(var.domain_name, ".", "-")}-backend-bucket"
  bucket_name = google_storage_bucket.website_bucket.name
  enable_cdn  = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    max_ttl           = 86400
    client_ttl        = 3600
  }
}

# 4. HTTPS/HTTP URL Map routing
resource "google_compute_url_map" "url_map" {
  name            = "${replace(var.domain_name, ".", "-")}-url-map"
  default_service = google_compute_backend_bucket.website_backend.id
}

# 5. SSL Certificate for HTTPS
resource "google_compute_managed_ssl_certificate" "ssl_cert" {
  name = "${replace(var.domain_name, ".", "-")}-ssl-cert"

  managed {
    domains = [var.domain_name]
  }
}

# 6. Target HTTPS Proxy
resource "google_compute_target_https_proxy" "https_proxy" {
  name             = "${replace(var.domain_name, ".", "-")}-https-proxy"
  url_map          = google_compute_url_map.url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.ssl_cert.id]
}

# 7. Global External Static IP Address
resource "google_compute_global_address" "lb_ip" {
  name = "${replace(var.domain_name, ".", "-")}-lb-ip"
}

# 8. Global HTTPS Forwarding Rule
resource "google_compute_global_forwarding_rule" "https_forwarding_rule" {
  name                  = "${replace(var.domain_name, ".", "-")}-https-forwarding"
  target                = google_compute_target_https_proxy.https_proxy.id
  port_range            = "443"
  ip_address            = google_compute_global_address.lb_ip.address
  load_balancing_scheme = "EXTERNAL"
}

# 9. HTTP Redirect to HTTPS - Target HTTP Proxy & URL Map
resource "google_compute_url_map" "http_redirect_map" {
  name = "${replace(var.domain_name, ".", "-")}-http-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_target_http_proxy" "http_proxy" {
  name    = "${replace(var.domain_name, ".", "-")}-http-proxy"
  url_map = google_compute_url_map.http_redirect_map.id
}

# 10. Global HTTP Forwarding Rule (to catch port 80 and redirect to HTTPS)
resource "google_compute_global_forwarding_rule" "http_forwarding_rule" {
  name                  = "${replace(var.domain_name, ".", "-")}-http-forwarding"
  target                = google_compute_target_http_proxy.http_proxy.id
  port_range            = "80"
  ip_address            = google_compute_global_address.lb_ip.address
  load_balancing_scheme = "EXTERNAL"
}

# Outputs
output "load_balancer_ip" {
  value       = google_compute_global_address.lb_ip.address
  description = "The external IP address of your GCP Load Balancer. Point your custom domain's A Record to this IP."
}

output "gcs_bucket_name" {
  value       = google_storage_bucket.website_bucket.name
  description = "The name of the GCS Bucket hosting your static assets."
}
