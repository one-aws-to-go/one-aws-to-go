locals {
  frontend_origin_id = "frontend_origin_id"
  backend_origin_id  = "backend_origin_id"
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "Bucket access control"
  description                       = ""
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "default" {
  enabled = true
  origin {
    origin_id                = local.frontend_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    domain_name              = var.frontend_url
  }
  origin {
    origin_id   = local.backend_origin_id
    domain_name = var.backend_url
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }

  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id = local.frontend_origin_id
    allowed_methods  = ["HEAD", "GET"]
    cached_methods   = ["HEAD", "GET"]

    viewer_protocol_policy = "https-only"

    forwarded_values {
      query_string = true
      headers      = []
      cookies {
        forward = "all"
      }
    }
  }

  ordered_cache_behavior {
    target_origin_id = local.backend_origin_id
    path_pattern     = "/api/*"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["HEAD", "GET"]

    viewer_protocol_policy = "https-only"

    forwarded_values {
      headers      = ["authorization"]
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }

  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
