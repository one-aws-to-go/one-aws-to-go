import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { getAuthTokenFromEvent } from './github'
import { AuthorizedEvent } from './model'
import { getRouteHandler } from './routes'
import { buildJsonResponse, PROD_ENV } from './util'

export const backendHandler = async (
  e: APIGatewayEvent,
  ctx: Context
): Promise<APIGatewayProxyResult> => {
  ctx.callbackWaitsForEmptyEventLoop = false
  // Check that GitHub token exists as the first thing
  const token = getAuthTokenFromEvent(e)
  if (!token) {
    return buildJsonResponse(401, { message: 'Invalid GitHub token' })
  }

  const authorizedEvent: AuthorizedEvent = {
    ...e,
    // In production, AWS Lambda name is appended to the path (e.g. "/lambda-name/user")
    path: PROD_ENV ? e.path.substring(e.path.indexOf('/', 1)) : e.path,
    // Add GitHub token to the event
    githubToken: token
  }

  // Handle the event
  const routeHandler = getRouteHandler(authorizedEvent)
  return await routeHandler(authorizedEvent)
}
