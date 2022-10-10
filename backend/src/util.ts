import { APIGatewayProxyResult } from 'aws-lambda'

export const JSON_CONTENT_TYPE_HEADER = { 'Content-Type': 'application/json' }

export const buildJsonResponse = (status: number, body?: object): APIGatewayProxyResult => ({
  statusCode: status,
  headers: JSON_CONTENT_TYPE_HEADER,
  body: JSON.stringify(body)
})
