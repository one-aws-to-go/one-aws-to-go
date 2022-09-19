terraform {
  required_version = ">=0.12.13"
  backend "s3" {
    bucket         = "github-actions-ci"
    key            = "terraform-development.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "github-actions-ci-locks"
  }
}
