import axios from 'axios'
import {
  getForkHandler,
  getForksHandler,
  postForkHandler,
  putSecretsHandler
} from '../src/api/forks/forks.handler'
import { AuthorizedEvent, ForkAwsSecretArgs, ForkState } from '../src/model'
import prisma from '../src/prisma'
import { HttpStatus } from '../src/utils'
import {
  createMockFork,
  createMockUser,
  getMockAuthorizedEvent,
  getMockGithubUserFields,
  resetDb
} from './helpers'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Forks handlers', () => {
  beforeEach(async () => {
    await resetDb()
  })
  describe('Post', () => {
    describe('Happy', () => {
      it('Should be able to create a fork', async () => {
        await createMockUser()
        mockedAxios.get.mockResolvedValue({
          data: getMockGithubUserFields()
        })

        const payload: AuthorizedEvent = getMockAuthorizedEvent({
          name: 'test',
          templateId: 1
        })
        const result = await postForkHandler(payload)
        const body = JSON.parse(result.body)
        expect(result.statusCode).toEqual(HttpStatus.CREATED)
        expect(body.appName).toEqual('test')
        expect(body.state).toEqual(ForkState.CREATED)
      })
      it('Should create user when creating fork', async () => {
        mockedAxios.get.mockResolvedValue({
          data: getMockGithubUserFields()
        })
        const payload: AuthorizedEvent = getMockAuthorizedEvent({
          name: 'test',
          templateId: 1
        })
        expect(await prisma.user.findFirst()).toBe(null)
        await postForkHandler(payload)
        const userInDb = await prisma.user.findFirst({})
        expect(userInDb).not.toBe(null)
      })
      it('Should be able to get created fork', async () => {
        const createdUser = await createMockUser()
        const createdFork = await createMockFork(createdUser.githubId)
        mockedAxios.get.mockResolvedValue({
          data: getMockGithubUserFields()
        })
        const payload = getMockAuthorizedEvent({}, { id: createdFork.id })

        const result = await getForkHandler(payload)
        const body = JSON.parse(result.body)
        expect(result.statusCode).toEqual(HttpStatus.OK)
        expect(body.appName).toEqual('test')
      })
      it('Should be able to get all created forks', async () => {
        const createdUser = await createMockUser()
        await createMockFork(createdUser.githubId)
        await createMockFork(createdUser.githubId, 1, {
          appName: 'test2',
          owner: 'test2'
        })
        mockedAxios.get.mockResolvedValue({
          data: getMockGithubUserFields()
        })
        const payload = getMockAuthorizedEvent()

        const result = await getForksHandler(payload)
        const body = JSON.parse(result.body)
        expect(result.statusCode).toEqual(HttpStatus.OK)
        expect(body.length).toEqual(2)
      })
      it('Should be able to set secrets for fork', async () => {
        const createdUser = await createMockUser()
        const createdFork = await createMockFork(createdUser.githubId)
        const secretsPayload: ForkAwsSecretArgs = {
          awsAccessKey: 'ASD',
          awsDefaultRegion: 'ASD',
          awsSecretKey: 'ASD'
        }
        const payload = getMockAuthorizedEvent(secretsPayload, {
          id: createdFork.id
        })
        mockedAxios.get.mockResolvedValue({
          data: {
            ...getMockGithubUserFields(),
            // These are real public keys, they are ok to leak
            key: 'iXTwtNVkfNENdbMINv0Iqn90jgtJBEk0Hs7bILQ7S0k=',
            key_id: '568250167242549743'
          }
        })
        mockedAxios.put.mockResolvedValue({})
        const result = await putSecretsHandler(payload)
        expect(result.statusCode).toEqual(HttpStatus.NO_CONTENT)

        const forkInDb = await prisma.fork.findFirst({
          where: {
            id: createdFork.id
          }
        })
        expect(forkInDb?.secretsSet).toEqual(true)
      })
    })
  })
})
