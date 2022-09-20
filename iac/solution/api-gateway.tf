module "api-gateway" {
  source = "./modules/api-gateway"

  appName = var.appName
  backend_lambda = module.lambda.backend_lambda
}
