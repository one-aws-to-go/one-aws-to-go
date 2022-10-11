import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export type AuthorizedEventHandler = (
  event: AuthorizedEvent
) => Promise<APIGatewayProxyResult>

/**
 * Contains the GitHub token in addition to API Gateway properties.
 */
export interface AuthorizedEvent extends APIGatewayEvent {
  readonly githubToken: string
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

// TODO
export interface ExtendedFork extends Fork {
  readonly status: any // TODO: Fork status?
  html_url: string
}

/**
 * `POST /forks` request body
 */
export interface CreateForkArgs {
  readonly name: string
  templateId: number
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
