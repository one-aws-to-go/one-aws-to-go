data "archive_file" "lambda_backend" {
  type = "zip"

  source_dir  = "${path.cwd}/../backend"
  output_path = "${path.cwd}/../backend.zip"
}

resource "aws_s3_object" "lambda_bucket" {
  bucket = var.lambda_bucket_id

  key    = "backend.zip"
  source = data.archive_file.lambda_backend.output_path
  etag   = filemd5(data.archive_file.lambda_backend.output_path)
}

resource "aws_lambda_function" "lambda" {
  function_name = "${var.appName}-lambda"

  s3_bucket        = var.lambda_bucket_id
  s3_key           = aws_s3_object.lambda_bucket.key
  runtime          = "nodejs16.x"
  handler          = "backend.handler"
  source_code_hash = data.archive_file.lambda_backend.output_base64sha256
  role             = aws_iam_role.backend_role.arn
}

resource "aws_iam_role" "backend_role" {
  name = "backend_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}
