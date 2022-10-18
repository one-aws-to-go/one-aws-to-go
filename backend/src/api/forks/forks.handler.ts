import github from '../../github'
import {
  AuthorizedEventHandler,
  CreateForkArgs,
  ExtendedFork,
  ForkSecretArgs
} from '../../model'
import prisma from '../../prisma'
import { getTemplate } from '../../templates'
import { buildJsonResponse } from '../../util'
import { createSecrets } from './forks.utils'

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
  await github.createFork(e.githubToken, forkArgs.name, templateToUse)
  const forkInDb = await prisma.fork.create({
    data: {
      appName: forkArgs.name,
      owner: githubUser.login,
      userId: githubUser.id,
      templateId: templateToUse.id
    }
  })
  return buildJsonResponse(201, forkInDb)
}

export const putSecretsHandler: AuthorizedEventHandler = async (e) => {
  const secretArgs: ForkSecretArgs = e.body as ForkSecretArgs
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork: ExtendedFork = await prisma.fork.findFirst({
    where: { userId: githubUser.id, id: forkId }
  })
  if (!fork) {
    return buildJsonResponse(404, { message: 'No such repo' })
  }
  await createSecrets(
    {
      awsAccessKey: secretArgs.awsAccessKey,
      awsDefaultRegion: secretArgs.awsDefaultRegion,
      awsSecretKey: secretArgs.awsSecretKey
    },
    e.githubToken,
    githubUser.login,
    fork.appName
  )
  return { statusCode: 201, body: '' }
}

export const getSecretsHandler: AuthorizedEventHandler = async (e) => {
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork: ExtendedFork = await prisma.fork.findFirst({
    where: { userId: githubUser.id, id: forkId }
  })
  if (!fork) {
    return buildJsonResponse(404, { message: 'No such repo' })
  }
  return buildJsonResponse(
    200,
    await github.getRepoSecrets(e.githubToken, githubUser.login, fork.appName)
  )
}
