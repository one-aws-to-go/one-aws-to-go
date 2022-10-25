import { APIGatewayProxyResult } from 'aws-lambda'

export const PROD_ENV = process.env.NODE_ENV === 'production'

export const JSON_CONTENT_TYPE_HEADER = { 'Content-Type': 'application/json' }

export const buildJsonResponse = (
  status: number,
  body?: object
): APIGatewayProxyResult => ({
  statusCode: status,
  headers: JSON_CONTENT_TYPE_HEADER,
  body: body ? JSON.stringify(body) : ''
})
