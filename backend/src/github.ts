import { APIGatewayEvent } from 'aws-lambda'
import axios, { AxiosRequestHeaders } from 'axios'
import { GitHubUser } from './model'

const GITHUB_BASE_URL = 'https://api.github.com'

export const getAuthTokenFromEvent = (e: APIGatewayEvent): string | undefined => e.headers.Authorization

const createAuthHeader = (token: string): AxiosRequestHeaders => ({
  Authorization: token
})

const getUser = async (token: string): Promise<GitHubUser> => {
  const response = await axios.get(`${GITHUB_BASE_URL}/user`, { headers: createAuthHeader(token) })
  const user = response.data
  return {
    id: user.id,
    login: user.login,
    name: user.name,
    avatar: user.avatar_url
  }
}

export default {
  getUser
}