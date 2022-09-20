module "lambda" {
  source = "./modules/lambda"

  appName          = var.appName
  backend_bucket_id = module.s3.backend_bucket_id
}
