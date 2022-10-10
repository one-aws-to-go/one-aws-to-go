import { APIGatewayEvent } from 'aws-lambda'
import { getForksHandler, postForkHandler } from './api/forks/forks.handler'
import { getUserHandler } from './api/user/user.handler'
import { AuthorizedEventHandler } from './model'
import { buildJsonResponse } from './util'

const routes: Record<string, Record<string, AuthorizedEventHandler>> = {
  '/user': {
    GET: getUserHandler
  },
  '/forks': {
    GET: getForksHandler,
    POST: postForkHandler
  }
}

export const getRouteHandler = (event: APIGatewayEvent): AuthorizedEventHandler => {
  const { path, httpMethod } = event
  const route = routes[path]
  if (!route) {
    return async _e => buildJsonResponse(404, { message: `Illegal path "${path}"` })
  }

  const handler = route[httpMethod]
  if (!handler) {
    return async _e => buildJsonResponse(404, { message: `Illegal method "${httpMethod}" for "${route}"` })
  }

  return handler
}
