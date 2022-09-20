resource "aws_s3_bucket" "backend" {
  bucket = "${var.appName}-backend"
}

resource "aws_s3_bucket" "frontend" {
  bucket = "${var.appName}-frontend"
}
