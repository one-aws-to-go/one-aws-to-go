import { ForkTemplate } from '@prisma/client'
import { AuthorizedEventHandler, ForkTemplate as ApiTemplate, ForkTemplateProvider } from '../model'
import prisma from '../prisma'
import { buildJsonResponse } from '../utils'

const toApiTemplate = (t: ForkTemplate): ApiTemplate => ({
  id: t.id,
  owner: t.owner,
  repo: t.repo,
  provider: t.provider as ForkTemplateProvider,
  description: t.description
})

export const getTemplatesHandler: AuthorizedEventHandler = async (e) => {
  const templates = await prisma.forkTemplate.findMany()
  return buildJsonResponse(200, templates.map(toApiTemplate))
}

export const getTemplateHandler: AuthorizedEventHandler = async (e) => {
  const templateId = e.pathParameters?.id ? Number(e.pathParameters.id) : null
  if (templateId === null || isNaN(templateId)) {
    return buildJsonResponse(400, { message: 'Invalid template ID' })
  }

  const template = await prisma.forkTemplate.findUnique({ where: { id: templateId } })
  return template
    ? buildJsonResponse(200, template)
    : buildJsonResponse(404, { message: `Template not found with ID: ${templateId}` })
}
