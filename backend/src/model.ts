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

export interface ForkCommon {
  readonly id: number
  readonly owner: string
  readonly repo: string
  readonly provider: ForkTemplateProvider
}

export interface ForkTemplate extends ForkCommon {
  readonly description: string | null
}

export interface Fork extends ForkCommon {
  readonly appName: string
}

export interface ExtendedFork extends Fork {
  readonly state: ForkState
  readonly secretsSet: boolean
  readonly actions: {
    readonly key: string
    readonly name: string
    readonly description: string | null
  }[]
  // readonly actionsEnabled: boolean
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
export interface ForkAwsSecretArgs {
  readonly awsDefaultRegion: string
  readonly awsAccessKey: string
  readonly awsSecretKey: string
}

/**
 * Error message template
 */
export interface ErrorMessage {
  readonly message: string
}

export enum ForkState {
  CREATED = 'created',
  INITIALIZED = 'initialized',
  UP = 'up',
  DOWN = 'down'
}

export enum ForkTemplateProvider {
  AWS = 'aws',
  AZURE = 'azure', // TODO: Not used!
  GCP = 'gcp'      // TODO: Not used!
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

export interface CommonActionSecrets {
  readonly APP_NAME: string
}

export interface AwsActionSecrets extends CommonActionSecrets {
  readonly AWS_DEFAULT_REGION: string
  readonly AWS_ACCESS_KEY_ID: string
  readonly AWS_SECRET_ACCESS_KEY: string
}
