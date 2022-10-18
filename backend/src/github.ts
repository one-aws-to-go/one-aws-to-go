import { APIGatewayEvent } from 'aws-lambda'
import axios, { AxiosRequestHeaders } from 'axios'
import { ExtendedFork, ForkStatus, ForkTemplate, GitHubUser } from './model'

export const GITHUB_BASE_URL = 'https://api.github.com'

// Cloud API Gateway uses "authorization"!
export const getAuthTokenFromEvent = (
  e: APIGatewayEvent
): string | undefined => {
  return e.headers.Authorization || e.headers.authorization
}

const createGithubHeaders = (token: string): AxiosRequestHeaders => ({
  Authorization: token,
  Accept: 'application/vnd.github+json'
})

const getUser = async (token: string): Promise<GitHubUser> => {
  const response = await axios.get(`${GITHUB_BASE_URL}/user`, {
    headers: createGithubHeaders(token)
  })
  const user = response.data
  return {
    id: user.id,
    login: user.login,
    name: user.name,
    avatar: user.avatar_url
  }
}

const createFork = async (
  token: string,
  newForkName: string,
  template: ForkTemplate
): Promise<ExtendedFork> => {
  const data = (
    await axios.post(
      template.url,
      { name: newForkName },
      {
        headers: createGithubHeaders(token)
      }
    )
  ).data
  return {
    id: data.id,
    htmlUrl: data.html_url,
    status: ForkStatus.CREATED
  }
}

export default {
  getUser,
  createFork
}
