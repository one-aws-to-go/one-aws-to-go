output "backend_url" {
  value = replace(aws_apigatewayv2_api.lambda.api_endpoint, "https://", "")
}
