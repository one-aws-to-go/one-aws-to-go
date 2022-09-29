import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { PrismaClient } from '@prisma/client'
import github from './github'
import { GetForksResponse } from './model'

const prisma = new PrismaClient()

const getAuthTokenFromEvent = (e: APIGatewayEvent): string | undefined => e.headers.Authorization

const UNAUTHORIZED_RESPONSE: APIGatewayProxyResult = {
  statusCode: 401,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Invalid token' })
}

export const backendHandler = async (e: APIGatewayEvent, ctx: Context): Promise<APIGatewayProxyResult> => {
  ctx.callbackWaitsForEmptyEventLoop = false
  const token = getAuthTokenFromEvent(e)
  if (!token) {
    return UNAUTHORIZED_RESPONSE
  }

  const githubUser = await github.getUser(token)
  const user = await prisma.user.findFirst({ where: { githubId: githubUser.id } })

  // TODO: Find forks with user's GitHub ID
  console.log('GitHub ID:', githubUser.id)
  console.log('User:', user)
  

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ forks: [] } as GetForksResponse)
  }
}
