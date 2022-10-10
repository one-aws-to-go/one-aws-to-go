resource "aws_lambda_function" "backend" {
  function_name = "${var.appName}-backend"

  s3_bucket        = var.backend_bucket_id
  s3_key           = var.backend_bucket_key
  runtime          = "nodejs16.x"
  handler          = "index.handler"
  source_code_hash = var.backend_source_hash
  role             = aws_iam_role.backend_role.arn
  environment {
    variables = {
      DATABASE_URL = var.db_url
    }
  }
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

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.backend_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
