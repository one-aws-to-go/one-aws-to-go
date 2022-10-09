import { APIGatewayEvent } from 'aws-lambda';
import github, { getAuthTokenFromEvent } from '../../github';
import prisma from '../../prisma';

export async function getForksHandler(event: APIGatewayEvent) {
  const token = await getAuthTokenFromEvent(event);
  if (!token) throw new Error('No github token');
  const githubUser = await github.getUser(token);

  const user = await prisma.user.findFirst({
    where: { githubId: githubUser.id },
  });

  // TODO: Find forks with user's GitHub ID
  console.log('GitHub ID:', githubUser.id);
  console.log('User:', user);

  return [];
}
