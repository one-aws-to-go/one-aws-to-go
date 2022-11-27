import axios from 'axios'
import { postActionHandler } from '../src/api/forks/forks.handler'
import { HttpStatus } from '../src/utils'
import {
  createMockFork,
  createMockUser,
  getMockAuthorizedEvent,
  getMockGithubUserFields,
  resetDb,
  setForkSecrets
} from './helpers'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Actions', () => {
  beforeEach(async () => {
    await resetDb()
  })
  describe('Happy', () => {
    it('Should be able initialize a fork', async () => {
      const createdUser = await createMockUser()
      const createdFork = await createMockFork(createdUser.githubId)
      await setForkSecrets(createdFork.id)
      const payload = getMockAuthorizedEvent(
        {},
        { id: createdFork.id, actionName: 'init' }
      )
      mockedAxios.get.mockResolvedValue({
        data: {
          ...getMockGithubUserFields(),
          workflows: [
            {
              id: 1,
              name: 'tf-setup-backend'
            }
          ]
        }
      })
      const result = await postActionHandler(payload)
      expect(result.statusCode).toEqual(HttpStatus.ACCEPTED)
    })
  })
  describe('Evil', () => {
    it('Should not be able to post actions without secrets being set', async () => {
      const createdUser = await createMockUser()
      const createdFork = await createMockFork(createdUser.githubId)
      const payload = getMockAuthorizedEvent(
        {},
        { id: createdFork.id, actionName: 'init' }
      )
      mockedAxios.get.mockResolvedValue({
        data: getMockGithubUserFields()
      })
      const response = await postActionHandler(payload)
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
    })
    it('Should not be able to post actions without repo being initialized', async () => {
      const createdUser = await createMockUser()
      const createdFork = await createMockFork(createdUser.githubId)
      await setForkSecrets(createdFork.id)
      const payload = getMockAuthorizedEvent(
        {},
        { id: createdFork.id, actionName: 'up' }
      )
      mockedAxios.get.mockResolvedValue({
        data: getMockGithubUserFields()
      })
      const response = await postActionHandler(payload)
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
    })
    it('Should not be able to initalize twice', async () => {
      const createdUser = await createMockUser()
      const createdFork = await createMockFork(createdUser.githubId)
      await setForkSecrets(createdFork.id)
      const payload = getMockAuthorizedEvent(
        {},
        { id: createdFork.id, actionName: 'init' }
      )
      mockedAxios.get.mockResolvedValue({
        data: {
          ...getMockGithubUserFields(),
          workflows: [
            {
              id: 1,
              name: 'tf-setup-backend'
            }
          ]
        }
      })
      await postActionHandler(payload)
      const response = await postActionHandler(payload)
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
    })
  })
})
