output "backend_bucket_id" {
  value = aws_s3_bucket.backend.id
}

output "backend_bucket_key" {
  value = aws_s3_object.backend_bucket.key
}

output "backend_source_hash" {
  value = data.archive_file.backend.output_base64sha256
}

output "frontend_bucket_id" {
  value = aws_s3_bucket.frontend.id
}
