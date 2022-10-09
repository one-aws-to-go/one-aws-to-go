import { APIGatewayEvent } from 'aws-lambda';
import { getForksHandler } from './api/forks/forks.handler';
import { getUserHandler } from './api/user/user.handler';

export type LambdaHandler = (event: APIGatewayEvent) => Promise<unknown>;

const routes: Record<string, Record<string, LambdaHandler>> = {
  '/user': {
    GET: getUserHandler,
  },
  '/forks': {
    GET: getForksHandler,
  },
};

export function handleRequest(event: APIGatewayEvent) {
  const endpointHandler = getHandler(event);
  return endpointHandler(event);
}

function getHandler(event: APIGatewayEvent): Function {
  const { path, httpMethod } = event;
  const route = routes[path];
  if (!route) throw new Error(`Illegal path "${path}"`);
  const handler = route[httpMethod];
  if (!handler)
    throw new Error(`Illegal method "${httpMethod}" for "${route}"`);
  return handler;
}
