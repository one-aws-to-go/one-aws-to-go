import github from '../../github'
import { AuthorizedEventHandler } from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../util'

export const getForksHandler: AuthorizedEventHandler = async e => {
  const githubUser = await github.getUser(e.githubToken)

  const user = await prisma.user.findFirst({
    where: { githubId: githubUser.id }
  })

  // TODO: Find forks with user's GitHub ID
  console.log('GitHub ID:', githubUser.id)
  console.log('User:', user)

  return buildJsonResponse(200, [])
}

export const postForkHandler: AuthorizedEventHandler = async _e => {
  // TODO
  return buildJsonResponse(501, { message: 'Not yet implemented' })
}
