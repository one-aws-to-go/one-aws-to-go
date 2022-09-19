module "lambda" {
  source = "./modules/lambda"

  appName          = var.appName
  lambda_bucket_id = module.s3.bucket_id
}
