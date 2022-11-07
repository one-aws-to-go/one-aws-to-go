output "db_url" {
  value = module.rds.pg_db_url
  sensitive = true
}
