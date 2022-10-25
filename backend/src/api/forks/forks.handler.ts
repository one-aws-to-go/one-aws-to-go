import { Fork } from '@prisma/client'
import github from '../../github'
import { AuthorizedEventHandler, CreateForkArgs, ExtendedFork, Fork as ApiFork, ForkSecretArgs, ForkStatus } from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../util'
import { createSecrets } from './forks.utils'

const toApiFork = (f: Fork): ApiFork => ({
  id: f.id,
  appName: f.appName,
  owner: f.owner,
  repo: f.appName
})

const toExtendedFork = (f: Fork): ExtendedFork => ({
  id: f.id,
  appName: f.appName,
  owner: f.owner,
  repo: f.appName,
  status: f.status as ForkStatus
})

export const getForksHandler: AuthorizedEventHandler = async (e) => {
  const githubUser = await github.getUser(e.githubToken)
  const forks = await prisma.fork.findMany({ where: { userId: githubUser.id } })
  return buildJsonResponse(200, forks.map(toApiFork))
}

export const getForkHandler: AuthorizedEventHandler = async (e) => {
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
    where: { id: forkId, userId: githubUser.id }
  })

  return fork
    ? buildJsonResponse(200, toExtendedFork(fork))
    : buildJsonResponse(404, { message: `Fork not found with ID: ${forkId}` })
}

export const postForkHandler: AuthorizedEventHandler = async (e) => {
  const { name, templateId } = e.body as CreateForkArgs
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
  const template = await prisma.forkTemplate.findUnique({ where: { id: templateId } })
  if (!template) {
    return buildJsonResponse(404, { message: `Template not found with ID: ${templateId}` })
  }

  const existing = await prisma.fork.findFirst({ where: { userId: githubUser.id, templateId } })
  if (existing) {
    return buildJsonResponse(400, { message: `Fork already exists with template ID: ${templateId}` })
  }

  await github.createFork(e.githubToken, name, template)
  const fork = await prisma.fork.create({
    data: {
      appName: name,
      owner: githubUser.login,
      userId: githubUser.id,
      status: ForkStatus.CREATED,
      templateId: template.id
    }
  })
  return buildJsonResponse(201, toExtendedFork(fork))
}

export const putSecretsHandler: AuthorizedEventHandler = async (e) => {
  const secretArgs: ForkSecretArgs = e.body as ForkSecretArgs
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
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
  return { statusCode: 204, body: '' }
}

export const getSecretsHandler: AuthorizedEventHandler = async (e) => {
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
    where: { userId: githubUser.id, id: forkId }
  })
  if (!fork) {
    return buildJsonResponse(404, { message: `Fork not found with ID: ${forkId}` })
  }
  return buildJsonResponse(
    200,
    await github.getRepoSecrets(e.githubToken, githubUser.login, fork.appName)
  )
}

export const postActionHandler: AuthorizedEventHandler = async (e) => {
  const forkId = Number(e.pathParameters?.id)
  const actionName = e.pathParameters?.actionName
  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
    where: { userId: githubUser.id, id: forkId },
    include: {
      template: {
        include: { actions: true }
      }
    }
  })

  if (!fork) {
    return buildJsonResponse(404, { message: `Fork not found with ID: ${forkId}` })
  }

  const forkAction = fork.template.actions.find((a) => a.key === actionName)
  if (!forkAction) {
    return buildJsonResponse(404, { message: `Fork action not found with name: ${actionName}` })
  }

  const actions = await github.getActions(e.githubToken, fork.owner, fork.appName)
  const actionId = actions.find((a) => a.name === forkAction.githubActionName)?.id
  if (!actionId) {
    return buildJsonResponse(404, { message: `GitHub Action not found with name: ${actionName}` })
  }

  try {
    await github.dispatchAction(e.githubToken, fork.owner, fork.appName, actionId, fork.ref)
    return buildJsonResponse(202, {})
  } catch (err) {
    return buildJsonResponse(500, { message: 'Could not trigger GitHub Action' })
  }
}
