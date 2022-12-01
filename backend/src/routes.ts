import { pathToRegexp } from 'path-to-regexp'
import {
  deleteForkHandler,
  getForkHandler,
  getForkHistoryHandler,
  getForksHandler,
  getSecretsHandler,
  postActionHandler,
  postForkHandler,
  putSecretsHandler
} from './api/forks/forks.handler'
import { getHealthHandler } from './api/health/health.handler'
import { getRunHandler } from './api/runs/runs.handler'
import { getUserHandler } from './api/user/user.handler'
import { AuthorizedEvent, AuthorizedEventHandler } from './model'
import { getTemplateHandler, getTemplatesHandler } from './templates/templates.handler'
import { buildJsonResponse } from './utils'

const routes: Record<string, Record<string, AuthorizedEventHandler>> = {
  '/api/health': {
    GET: getHealthHandler
  },
  '/api/user': {
    GET: getUserHandler
  },
  '/api/templates': {
    GET: getTemplatesHandler
  },
  '/api/templates/:id': {
    GET: getTemplateHandler
  },
  '/api/forks': {
    GET: getForksHandler,
    POST: postForkHandler
  },
  '/api/forks/:id': {
    GET: getForkHandler,
    DELETE: deleteForkHandler
  },
  '/api/forks/:id/secrets': {
    GET: getSecretsHandler,
    PUT: putSecretsHandler
  },
  '/api/forks/:id/actions/:actionName': {
    POST: postActionHandler
  },
  '/api/forks/:id/history': {
    GET: getForkHistoryHandler
  },
  '/api/forks/:forkId/history/:runId': {
    GET: getRunHandler
  }
}

export const getRouteHandler = (event: AuthorizedEvent): AuthorizedEventHandler | null => {
  const path = event.path
  const method = event.httpMethod
  for (const route of Object.keys(routes)) {
    const regexp = pathToRegexp(route)
    if (regexp.exec(path)) {
      return routes[route][method] ?? null
    }
  }

  return async (_e) =>
    buildJsonResponse(404, {
      message: `Illegal "${method}" - "${path}"`
    })
}
