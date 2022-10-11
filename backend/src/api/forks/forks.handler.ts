import github from '../../github'
import { AuthorizedEventHandler, CreateForkArgs } from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../util'

export const getForksHandler: AuthorizedEventHandler = async (e) => {
  const githubUser = await github.getUser(e.githubToken)

  const user = await prisma.user.findFirst({
    where: { githubId: githubUser.id }
  })

  // TODO: Find forks with user's GitHub ID
  console.log('GitHub ID:', githubUser.id)
  console.log('User:', user)

  return buildJsonResponse(200, [])
}

export const postForkHandler: AuthorizedEventHandler = async (e) => {
  if (!e.body) {
    return buildJsonResponse(400, { message: 'Bad request' })
  }
  const forkArgs: CreateForkArgs = JSON.parse(e.body)
  if (!forkArgs.name) {
    return buildJsonResponse(400, { message: 'Name is required' })
  }
  const createdFork = await github.createFork(e.githubToken, forkArgs)
  return buildJsonResponse(201, createdFork)
}
