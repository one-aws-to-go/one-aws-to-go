import axios from 'axios'
import { postActionHandler } from '../src/api/forks/forks.handler'
import { GitHubAction, GitHubUser } from '../src/model'
import { HttpStatus } from '../src/utils'
import {
  createMockFork,
  createMockUser,
  getMockAuthorizedEvent,
  getMockGithubUserFields,
  isForkStatePending,
  resetDb,
  setForkSecrets
} from './helpers'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Mock GitHub API
jest.mock('../src/github', () => {
  const getUser = (): GitHubUser => ({
    id: 1,
    login: 'test',
    name: 'Test'
  })

  const dispatchAction = (): number => 123

  const getActions = (): GitHubAction[] => [
    { id: 1, name: 'tf-setup-backend' },
    { id: 2, name: 'tf-up' },
    { id: 3, name: 'tf-setup' }
  ]

  return { getUser, dispatchAction, getActions }
})

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
              id: createdFork.id,
              name: 'tf-setup-backend'
            }
          ]
        }
      })
      const result = await postActionHandler(payload)
      expect(result.statusCode).toEqual(HttpStatus.ACCEPTED)
    })

    it('Fork state is set to pending after an action', async () => {
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
              id: createdFork.id,
              name: 'tf-setup-backend'
            }
          ]
        }
      })
      await postActionHandler(payload)
      const pending = await isForkStatePending(createdFork.id)
      expect(pending).toBe(true)
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
              id: createdFork.id,
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
