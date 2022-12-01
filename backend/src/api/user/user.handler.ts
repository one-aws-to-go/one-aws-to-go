import github from '../../github'
import { AuthorizedEventHandler } from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../utils'

export const getUserHandler: AuthorizedEventHandler = async (e) => {
  try {
    const user = await github.getUser(e.githubToken)
    const forkAmount = await prisma.fork.count({
      where: { userId: user.id }
    })

    return buildJsonResponse(200, { ...user, forkAmount })
  } catch (err) {
    return buildJsonResponse(404, { message: 'GitHub user not found' })
  }
}
