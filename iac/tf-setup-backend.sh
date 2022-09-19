#!/bin/sh

set -e
set -x

terraform -chdir=backend init -reconfigure -input=false
terraform -chdir=backend plan -input=false #-var-file="../variables/$ENV_NAME.tfvars"
terraform -chdir=backend apply -auto-approve -input=false #-var database_password=$TF_VAR_database_password -var-file="../variables/$ENV_NAME.tfvars"
