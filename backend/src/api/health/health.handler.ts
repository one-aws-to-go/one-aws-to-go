import { AuthorizedEventHandler } from '../../model'

export const getHealthHandler: AuthorizedEventHandler = async (_e) => {
  return { statusCode: 200, body: 'ok' }
}
