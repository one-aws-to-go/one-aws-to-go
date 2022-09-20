module "s3" {
  source = "./modules/s3"

  appName = var.appName
}
