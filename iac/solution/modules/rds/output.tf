output "db_user" {
  value = aws_db_instance.db.username
}

output "db_password" {
  value = aws_db_instance.db.password
}

output "db_endpoint" {
  value = aws_db_instance.db.endpoint
}

output "db_name" {
  value = aws_db_instance.db.db_name
}

output "pg_db_url" {
  value = "postgresql://${aws_db_instance.db.username}:${aws_db_instance.db.password}@${aws_db_instance.db.endpoint}/${aws_db_instance.db.db_name}"
}
