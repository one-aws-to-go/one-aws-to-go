output "backend_bucket_id" {
  value = aws_s3_bucket.backend.id
}

output "frontend_bucket_id" {
  value = aws_s3_bucket.frontend.id
}
