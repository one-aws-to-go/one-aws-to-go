module "cloudfront" {
  source = "./modules/cloudfront"

  appName      = var.appName
  frontend_url = module.s3.frontend_url
  backend_url  = module.api-gateway.backend_url
}
