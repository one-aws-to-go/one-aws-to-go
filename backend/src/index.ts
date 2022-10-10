import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { getAuthTokenFromEvent } from './github'
import { AuthorizedEvent } from './model'
import { getRouteHandler } from './routes'
import { buildJsonResponse } from './util'

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

  // Add GitHub token to the event
  const authorizedEvent: AuthorizedEvent = { ...e, githubToken: token }

  // Handle the event
  const routeHandler = getRouteHandler(e)
  return await routeHandler(authorizedEvent)
}
