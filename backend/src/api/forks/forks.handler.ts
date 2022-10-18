import github from '../../github'
import {
  AuthorizedEventHandler,
  CreateForkArgs,
  ExtendedFork
} from '../../model'
import prisma from '../../prisma'
import { getTemplate } from '../../templates'
import { buildJsonResponse } from '../../util'

export const getForksHandler: AuthorizedEventHandler = async (e) => {
  const githubUser = await github.getUser(e.githubToken)
  const user = await prisma.user.findFirst({
    where: { githubId: githubUser.id },
    include: {
      forks: true
    }
  })
  return buildJsonResponse(200, { forks: user?.forks })
}

export const postForkHandler: AuthorizedEventHandler = async (e) => {
  const forkArgs: CreateForkArgs = e.body as CreateForkArgs
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
  const templateToUse = await getTemplate(forkArgs.templateId)
  const createdFork: ExtendedFork = await github.createFork(
    e.githubToken,
    forkArgs.name,
    templateToUse
  )
  const forkInDb = await prisma.fork.create({
    data: {
      appName: forkArgs.name,
      url: createdFork.htmlUrl,
      userId: githubUser.id,
      templateId: templateToUse.id
    }
  })
  return buildJsonResponse(201, forkInDb)
}
