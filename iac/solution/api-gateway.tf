module "api-gateway" {
  source = "./modules/api-gateway"

  appName = var.appName
  lambda  = module.lambda.lambda
}
