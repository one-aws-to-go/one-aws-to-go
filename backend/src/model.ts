import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export type AuthorizedEventHandler = (event: AuthorizedEvent) => Promise<APIGatewayProxyResult>

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

export interface GetForksResponse {
  readonly forks: any[] // TODO
}
