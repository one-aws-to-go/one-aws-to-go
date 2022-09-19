terraform {
  required_version = ">=0.12.13"
  backend "s3" {
    key = "tf-state-key"
  }
}
