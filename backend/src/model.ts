import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export type AuthorizedEventHandler = (event: AuthorizedEvent) => Promise<APIGatewayProxyResult>

/**
 * Contains the GitHub token in addition to API Gateway properties.
 */
export interface AuthorizedEvent extends Omit<APIGatewayEvent, 'body'> {
  readonly githubToken: string
  readonly body: JSON | null
}

type JSON = {
  [key: string]: any
}

export interface GitHubUser {
  readonly id: number
  readonly login: string
  readonly name: string
  [key: string]: any
}

export interface Fork {
  readonly id: number
  readonly appName: string
  readonly owner: string
  readonly repo: string
}

export interface ExtendedFork extends Fork {
  readonly status: ForkStatus
}

/**
 * `POST /forks` request body
 */

export interface CreateForkArgs {
  readonly name: string
  readonly templateId: number
}

/**
 * `PUT /forks/<fork_id>/secrets` request body
 */
export interface ForkSecretArgs {
  readonly appName: string
  readonly awsAccessKey: string
  readonly awsSecretKey: string
  readonly awsDefaultRegion: string
}

/**
 * Error message template
 */
export interface ErrorMessage {
  readonly message: string
}

export enum ForkStatus {
  CREATED = 'created',
  INITIALIZED = 'initialized',
  UP = 'up',
  DOWN = 'down'
}

export interface ForkTemplate {
  readonly id: number
  readonly url: string
}

// INTERNAL DATA MODELS

export interface GithubPublicKey {
  readonly keyId: string
  readonly key: string
}

export interface GitHubAction {
  readonly id: number
  readonly name: string
  readonly [key: string]: any
}
