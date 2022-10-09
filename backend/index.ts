import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { getAuthTokenFromEvent } from './github';
import { handleRequest } from './routes';

const UNAUTHORIZED_RESPONSE: APIGatewayProxyResult = {
  statusCode: 401,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Invalid token' }),
};

export const backendHandler = async (
  e: APIGatewayEvent,
  ctx: Context
): Promise<APIGatewayProxyResult> => {
  ctx.callbackWaitsForEmptyEventLoop = false;
  const token = getAuthTokenFromEvent(e);
  if (!token) {
    return UNAUTHORIZED_RESPONSE;
  }

  const response = await handleRequest(e);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
