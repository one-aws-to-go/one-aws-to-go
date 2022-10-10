import github from '../../github'
import { AuthorizedEventHandler } from '../../model'
import { buildJsonResponse } from '../../util'

export const getUserHandler: AuthorizedEventHandler = async e => {
  try {
    const user = await github.getUser(e.githubToken)
    return buildJsonResponse(200, user)
  } catch (err) {
    return buildJsonResponse(404, { message: 'GitHub user not found' })
  }
}
