import github from '../../github'
import {
  AuthorizedEventHandler,
  CreateForkArgs,
  ExtendedFork
} from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../util'

export const getForksHandler: AuthorizedEventHandler = async (e) => {
  const githubUser = await github.getUser(e.githubToken)
  const user = await prisma.user.findFirst({
    where: { githubId: githubUser.id },
    include: {
      forks: true
    }
  })
  return buildJsonResponse(200, { forks: user.forks })
}

export const postForkHandler: AuthorizedEventHandler = async (e) => {
  if (!e.body) {
    return buildJsonResponse(400, { message: 'Bad request' })
  }
  const forkArgs: CreateForkArgs = JSON.parse(e.body)
  if (!forkArgs.name) {
    return buildJsonResponse(400, { message: 'Name is required' })
  }

  const githubUser = await github.getUser(e.githubToken)
  const userInDb = await prisma.user.findFirst({
    where: { githubId: githubUser.id }
  })
  if (!userInDb) {
    await prisma.user.create({
      data: {
        githubId: githubUser.id
      }
    })
  }
  const createdFork: ExtendedFork = await github.createFork(
    e.githubToken,
    forkArgs
  )
  await prisma.created_fork.create({
    data: {
      creatorId: githubUser.id,
      url: createdFork.html_url
    }
  })
  return buildJsonResponse(201)
}
