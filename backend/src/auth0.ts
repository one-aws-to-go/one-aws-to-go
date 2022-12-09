import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'
import jwt, { JwtHeader } from 'jsonwebtoken'
import JwksRsa from 'jwks-rsa'

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET

const getAccessToken = async () => {
  const body = {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: 'https://one-aws-to-go.eu.auth0.com/api/v2/',
    grant_type: 'client_credentials'
  }
  const { data } = await axios.post('https://one-aws-to-go.eu.auth0.com/oauth/token', body, {
    headers: { 'content-type': 'application/json' }
  })

  if (!data?.access_token || !data?.scope) {
    throw Error('Bad response from auth0 when requesting token.')
  }

  return { access_token: data.access_token, scope: data.scope }
}

const getGithubAccessTokenByUserId = async (userId: string) => {
  const token = await getAccessToken()

  const { data } = await axios.get(`https://one-aws-to-go.eu.auth0.com/api/v2/users/${userId}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token.access_token}`
    }
  })

  const ids: { access_token: string; connection: string }[] | any[] = Array.from(data.identities)
  const identity = ids.find((id) => id.connection === 'github')
  if (!identity) {
    console.error('No github connection found in auth0 user object')
    return
  }
  if (!identity.access_token) {
    console.error('No github access token found in auth0 user object')
    return
  }

  return identity.access_token
}

// TODO: env this url
const jwksClient = JwksRsa({ jwksUri: 'https://one-aws-to-go.eu.auth0.com/.well-known/jwks.json' })

const getSigningKeyFromHeader = async (header: JwtHeader) => {
  const key = await jwksClient.getSigningKey(header.kid)
  const publicKey = key?.getPublicKey()
  return publicKey
}

const verifyAccessToken = async (token: string) => {
  const unverifiedHeader = jwt.decode(token, { complete: true })?.header
  if (!unverifiedHeader) {
    console.warn("No header in jwt token")
    return
  }
  const signingKey = await getSigningKeyFromHeader(unverifiedHeader)
  if (!signingKey) {
    console.warn("No signing key in jwt token")
    return
  }
  const payload = await jwt.verify(token, signingKey, { audience: 'lambda' })
  return payload
}

const getUserIDFromEvent = async (event: APIGatewayEvent) => {
  const authHeader = event.headers.Authorization ?? event.headers.authorization
  if (!authHeader) {
    console.warn("No Auth header")
    return
  }
  // Cut the 'Bearer ' -part out
  const token = authHeader.split(' ')[1]

  try {
    const payload = await verifyAccessToken(token)
    if (!payload) {
      console.error('invalid payload')
      console.error(payload)
      return
    }
    if (typeof payload !== 'string') {
      return payload.sub
    }
    const parsedPayload = JSON.parse(payload)
    if (!parsedPayload.sub || typeof parsedPayload.sub !== 'string' || !String(parsedPayload.sub)) {
      return
    }
    return String(parsedPayload.sub)
  } catch (error) {
    console.error(error)
    return
  }
}

const getGithubAccessTokenFromEvent = async (event: APIGatewayEvent) => {
  const userId = await getUserIDFromEvent(event)
  if (!userId) {
    console.warn("No userId")
    return
  }
  const token = await getGithubAccessTokenByUserId(userId)
  if (!token) {
    console.warn("No Token")
    return
  }
  return `Bearer ${token}`
}

export { getGithubAccessTokenFromEvent }
