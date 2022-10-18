import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export type AuthorizedEventHandler = (
  event: AuthorizedEvent
) => Promise<APIGatewayProxyResult>

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

// TODO
export interface Fork {
  readonly id: number
}

export interface ExtendedFork extends Fork {
  readonly status: ForkStatus
  readonly htmlUrl: string
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
  CREATED,
  INITIALIZED,
  UP,
  DOWN
}

export interface ForkTemplate {
  readonly id: number
  readonly url: string
}
