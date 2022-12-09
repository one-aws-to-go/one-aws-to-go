import { Fork, ForkAction, ForkTemplate } from '@prisma/client'
import github from '../../github'
import {
  AuthorizedEventHandler,
  CreateForkArgs,
  ExtendedFork,
  Fork as ApiFork,
  ForkAwsSecretArgs,
  ForkState,
  ForkTemplateProvider
} from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../utils'
import { createProviderSecrets, createSecrets } from './forks.utils'

type ForkWithTemplate = Fork & { template: ForkTemplate }

const toApiFork = (f: ForkWithTemplate): ApiFork => ({
  id: f.id,
  appName: f.appName,
  owner: f.owner,
  repo: f.appName,
  provider: f.template.provider as ForkTemplateProvider
})

const toExtendedFork = (f: ForkWithTemplate, actions: ForkAction[]): ExtendedFork => ({
  id: f.id,
  appName: f.appName,
  owner: f.owner,
  repo: f.appName,
  provider: f.template.provider as ForkTemplateProvider,
  state: f.state as ForkState,
  secretsSet: f.secretsSet,
  actions: actions.map((a) => ({
    key: a.key,
    name: a.key, // TODO
    description: null // TODO
  }))
})

export const getForksHandler: AuthorizedEventHandler = async (e) => {
  const githubUser = await github.getUser(e.githubToken)
  const forks = await prisma.fork.findMany({
    where: { userId: githubUser.id },
    include: { template: true }
  })

  return buildJsonResponse(200, forks.map(toApiFork))
}

export const getForkHandler: AuthorizedEventHandler = async (e) => {
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
    where: { id: forkId, userId: githubUser.id },
    include: {
      template: {
        include: { actions: true }
      }
    }
  })

  return fork
    ? buildJsonResponse(200, toExtendedFork(fork, fork.template.actions))
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
    return buildJsonResponse(400, {
      message: `Fork already exists with template ID: ${templateId}`
    })
  }

  await github.createFork(e.githubToken, name, template)
  const fork = await prisma.fork.create({
    data: {
      appName: name,
      owner: githubUser.login,
      userId: githubUser.id,
      state: ForkState.CREATED,
      templateId: template.id
    },
    include: {
      template: {
        include: { actions: true }
      }
    }
  })

  return buildJsonResponse(201, toExtendedFork(fork, fork.template.actions))
}

export const putSecretsHandler: AuthorizedEventHandler = async (e) => {
  const secretArgs: ForkAwsSecretArgs = e.body as ForkAwsSecretArgs
  const forkId = Number(e.pathParameters!.id)
  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
    where: { userId: githubUser.id, id: forkId },
    include: { template: true }
  })

  if (!fork) {
    return buildJsonResponse(404, { message: `Fork not found with ID: ${forkId}` })
  }

  const secrets = createProviderSecrets(
    fork.template.provider as ForkTemplateProvider,
    fork.appName,
    secretArgs
  )

  if (!secrets) {
    return buildJsonResponse(400, { message: 'Invalid secrets' })
  }

  await createSecrets(e.githubToken, githubUser.login, fork.appName, secrets)

  await prisma.fork.update({
    where: { id: forkId },
    data: { secretsSet: true }
  })

  return buildJsonResponse(204)
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

  if (!fork.secretsSet) {
    return buildJsonResponse(400, { message: 'Fork secrets must first be set!' })
  }

  const forkAction = fork.template.actions.find((a: any) => a.key === actionName)
  if (!forkAction) {
    return buildJsonResponse(404, { message: `Fork action not found with name: ${actionName}` })
  }

  if (fork.state === ForkState.CREATED && forkAction.toState !== ForkState.INITIALIZED) {
    return buildJsonResponse(400, { messsage: 'Fork must first be initialized!' })
  }

  if (!fork.actionsEnabled) {
    // TODO
    // await github.enableActions(e.githubToken, fork.owner, fork.appName)
    // await prisma.fork.update({
    //   where: { id: forkId },
    //   data: { actionsEnabled: true }
    // })
    // console.log(`Enabled GitHub Actions for Fork with ID: ${forkId}`)
  }

  const actions = await github.getActions(e.githubToken, fork.owner, fork.appName)
  const actionId = actions.find((a) => a.name === forkAction.githubActionName)?.id
  if (!actionId) {
    return buildJsonResponse(404, {
      message: `GitHub Action not found with name: ${forkAction.githubActionName}`
    })
  }

  try {
    await github.dispatchAction(e.githubToken, fork.owner, fork.appName, actionId, fork.ref)
    await prisma.fork.update({
      where: { id: forkId },
      data: { state: forkAction.toState }
    })

    return buildJsonResponse(202)
  } catch (err) {
    return buildJsonResponse(503, { message: 'Could not trigger GitHub Action' })
  }
}
