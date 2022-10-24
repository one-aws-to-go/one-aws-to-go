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

  let body: object | null = null
  try {
    if (e.body) {
      body = JSON.parse(e.body)
    }
  } catch (e) {
    // Do nothing here
  }

  // Add GitHub token to the event
  const authorizedEvent: AuthorizedEvent = {
    ...e,
    // Add GitHub token to the event
    githubToken: token,
    body
  }

  // Handle the event
  const routeHandler = getRouteHandler(authorizedEvent)
  return await routeHandler(authorizedEvent)
}
