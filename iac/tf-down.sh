#!/bin/sh

set -e
set -x

terraform -chdir=solution init \
  -backend-config="bucket=${TF_VAR_APP_NAME}-tf-state" \
  -backend-config="dynamodb_table=${TF_VAR_APP_NAME}-tf-state-table" \
  -backend-config="region=${AWS_DEFAULT_REGION}" \
  -reconfigure -input=false

terraform -chdir=solution plan -destroy -input=false
terraform -chdir=solution destroy -auto-approve
