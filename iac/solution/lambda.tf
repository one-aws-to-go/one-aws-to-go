module "lambda" {
  source = "./modules/lambda"

  appName             = var.appName
  backend_bucket_id   = module.s3.backend_bucket_id
  backend_bucket_key  = module.s3.backend_bucket_key
  backend_source_hash = module.s3.backend_source_hash
}
