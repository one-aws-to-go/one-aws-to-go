import { pathToRegexp } from 'path-to-regexp'
import {
  getForksHandler,
  getSecretsHandler,
  postForkHandler,
  putSecretsHandler
} from './api/forks/forks.handler'
import { getHealthHandler } from './api/health/health.handler'
import { getUserHandler } from './api/user/user.handler'
import { AuthorizedEvent, AuthorizedEventHandler } from './model'
import { buildJsonResponse } from './util'

const routes: Record<string, Record<string, AuthorizedEventHandler>> = {
  '/api/health': {
    GET: getHealthHandler
  },
  '/api/user': {
    GET: getUserHandler
  },
  '/api/forks': {
    GET: getForksHandler,
    POST: postForkHandler
  },
  '/api/forks/:id/secrets': {
    GET: getSecretsHandler,
    PUT: putSecretsHandler
  }
}

export const getRouteHandler = (
  event: AuthorizedEvent
): AuthorizedEventHandler => {
  const path = event.path
  const method = event.httpMethod
  for (const route of Object.keys(routes)) {
    const regexp = pathToRegexp(route)
    if (regexp.exec(path)) {
      return routes[route][method]
    }
  }

  return async (_e) =>
    buildJsonResponse(404, {
      message: `Illegal  "${method}"  "${path}"`
    })
}
