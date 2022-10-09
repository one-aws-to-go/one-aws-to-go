import { APIGatewayEvent } from 'aws-lambda';
import github, { getAuthTokenFromEvent } from '../../github';

export async function getUserHandler(event: APIGatewayEvent) {
  const token = getAuthTokenFromEvent(event);
  if (!token) throw new Error('No github token');

  return await github.getUser(token);
}
