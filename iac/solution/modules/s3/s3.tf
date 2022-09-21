resource "aws_s3_bucket" "backend" {
  bucket = "${var.appName}-backend"
}

resource "aws_s3_bucket" "frontend" {
  bucket = "${var.appName}-frontend"
  
}

data "archive_file" "backend" {
  type = "zip"

  source_dir  = "${path.cwd}/../backend/build"
  output_path = "${path.cwd}/../backend.zip"
}

resource "aws_s3_object" "backend_bucket" {
  bucket = aws_s3_bucket.backend.id

  key    = "backend.zip"
  source = data.archive_file.backend.output_path
  etag   = filemd5(data.archive_file.backend.output_path)
}
