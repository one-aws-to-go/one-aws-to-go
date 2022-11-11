import axios from 'axios'
import { postForkHandler } from '../src/api/forks/forks.handler'
import { AuthorizedEvent, ForkState } from '../src/model'
import { resetDb } from './helpers'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Forks handlers', () => {
  beforeEach(async () => {
    await resetDb()
  })
  describe('Post', () => {
    describe('Happy', () => {
      it('Should be able to create a fork', async () => {
        mockedAxios.get.mockResolvedValue({
          data: { id: 1, login: 'test', name: 'test', avatar_url: 'Vittu' }
        })

        const payload: AuthorizedEvent = {
          body: {
            name: 'test',
            templateId: 1
          },
          githubToken: 'asd'
        } as any
        const result = await postForkHandler(payload)
        const body = JSON.parse(result.body)
        expect(body.appName).toEqual('test')
        expect(body.state).toEqual(ForkState.CREATED)
      })
    })
  })
})
