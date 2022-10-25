import { APIGatewayEvent } from 'aws-lambda'
import axios, { AxiosRequestHeaders } from 'axios'
import sodium from 'libsodium-wrappers'
import {
  ExtendedFork,
  ForkStatus,
  ForkTemplate,
  GithubPublicKey,
  GitHubUser
} from './model'
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
    appName: newForkName,
    status: ForkStatus.CREATED,
    owner: data.owner.login,
    repo: data.name
  }
}

const getRepoSecrets = async (
  token: string,
  repoOwner: string,
  repoName: string
) => {
  const response = await axios.get(
    `${GITHUB_BASE_URL}/repos/${repoOwner}/${repoName}/actions/secrets`,
    { headers: createGithubHeaders(token) }
  )
  return response.data
}

const createSecret = async (
  token: string,
  repoOwner: string,
  repoName: string,
  secretName: string,
  secretValue: string
) => {
  const key = await getRepoPublicKey(token, repoOwner, repoName)
  const crypted = await encrypt(secretValue, key)
  return (
    await axios.put(
      `${GITHUB_BASE_URL}/repos/${repoOwner}/${repoName}/actions/secrets/${secretName}`,
      { encrypted_value: crypted, key_id: key.keyId },
      {
        headers: createGithubHeaders(token)
      }
    )
  ).data
}

const getRepoPublicKey = async (
  token: string,
  repoOwner: string,
  repoName: string
): Promise<GithubPublicKey> => {
  const url = `${GITHUB_BASE_URL}/repos/${repoOwner}/${repoName}/actions/secrets/public-key`
  const data = (
    await axios.get(url, {
      headers: createGithubHeaders(token)
    })
  ).data
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
  getRepoSecrets
}
