import { ForkTemplate } from '@prisma/client'
import { APIGatewayEvent } from 'aws-lambda'
import axios, { AxiosRequestHeaders } from 'axios'
import sodium from 'libsodium-wrappers'
import {
  GitHubAction,
  GithubPublicKey,
  GitHubUser
} from './model'

export const GITHUB_BASE_URL = 'https://api.github.com'

// Cloud API Gateway uses "authorization"!
export const getAuthTokenFromEvent = (e: APIGatewayEvent): string | undefined => {
  return e.headers.Authorization || e.headers.authorization
}

const toGithubRepoUrl = (owner: string, name: string) => `${GITHUB_BASE_URL}/repos/${owner}/${name}`

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

const createFork = async (token: string, newForkName: string, template: ForkTemplate) => {
  await axios.post(
    `${toGithubRepoUrl(template.owner, template.repo)}/forks`,
    { name: newForkName },
    { headers: createGithubHeaders(token) }
  )
}

const getRepoSecrets = async (token: string, repoOwner: string, repoName: string) => {
  const response = await axios.get(
    `${GITHUB_BASE_URL}/repos/${repoOwner}/${repoName}/actions/secrets`,
    { headers: createGithubHeaders(token) }
  )

  return response.data
}

const createSecret = async (
  token: string,
  owner: string,
  name: string,
  secretName: string,
  secretValue: string
) => {
  const key = await getRepoPublicKey(token, owner, name)
  const crypted = await encrypt(secretValue, key)
  const { data } = await axios.put(
    `${toGithubRepoUrl(owner, name)}/actions/secrets/${secretName}`,
    { encrypted_value: crypted, key_id: key.keyId },
    { headers: createGithubHeaders(token) }
  )

  return data
}

const getActions = async (token: string, owner: string, repo: string): Promise<GitHubAction[]> => {
  const url = `${toGithubRepoUrl(owner, repo)}/actions/workflows`
  const response = await axios.get(url, { headers: createGithubHeaders(token) })
  return response.data.workflows || []
}

const dispatchAction = async (
  token: string,
  owner: string,
  repo: string,
  actionId: number,
  ref: string
) => {
  const url = `${toGithubRepoUrl(owner, repo)}/actions/workflows/${actionId}/dispatches`
  await axios.post(url, { ref }, { headers: createGithubHeaders(token) })
}

const enableActions = async (token: string, owner: string, repo: string) => {
  // TODO: Find out why this does not work?
  const url = `${toGithubRepoUrl(owner, repo)}/actions/permissions`
  await axios.put(url, { enabled: true }, { headers: createGithubHeaders(token)})
}

const getRepoPublicKey = async (
  token: string,
  repoOwner: string,
  repoName: string
): Promise<GithubPublicKey> => {
  const url = `${GITHUB_BASE_URL}/repos/${repoOwner}/${repoName}/actions/secrets/public-key`
  const { data } = await axios.get(url, { headers: createGithubHeaders(token) })
  return {
    key: data.key,
    keyId: data.key_id
  }
}

const encrypt = async (valueToEncrypt: string, key: GithubPublicKey) => {
  await sodium.ready
  const binkey = sodium.from_base64(key.key, sodium.base64_variants.ORIGINAL)
  const binsec = sodium.from_string(valueToEncrypt)
  const encBytes = sodium.crypto_box_seal(binsec, binkey)
  const output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL)
  return output
}

export default {
  getUser,
  createFork,
  createSecret,
  getRepoSecrets,
  getActions,
  dispatchAction,
  enableActions
}
