# One AWS To Go: IaC

## Prerequisites
- AWS IAM role with the following permissions:
    - `AmazonDynamoDBFullAccess` 
    - `AmazonS3FullAccess`
    - `IAMFullAccess`
    - `AWSLambda_FullAccess`
    - `AmazonRDSFullAccess`
    - `AmazonVPCFullAccess`
    - `AmazonAPIGatewayAdministrator`
    - `CloudFrontFullAccess`
    - `AWSBudgetsActionsWithAWSResourceControlAccess`

## Env

IaC requires the environment variables specified in [`.env.template`](./.env.template).

### GitHub Actions

Set the env variables in the workflow `yml`-files using GitHub Secrets.

### Env in Local Development

1. Copy `.env.template` and rename it to `.env`.
2. Fill the env variable values
3. Run Terraform scripts with the following prefix:
    ```
    source env-local.sh && ./<tf-script>
    ```
