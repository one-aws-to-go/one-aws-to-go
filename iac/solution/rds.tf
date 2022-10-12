module "rds" {
  source = "./modules/rds"

  appName = var.appName
}
