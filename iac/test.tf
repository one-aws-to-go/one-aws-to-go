terraform {
  cloud {
    organization = "one-aws-to-go"

    workspaces {
      name = "test-testing-eu"
    }
  }
}
