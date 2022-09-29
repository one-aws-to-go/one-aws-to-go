export interface GitHubUser {
  readonly id: number
  readonly login: string
  readonly name: string
  [key: string]: any
}

export interface GetForksResponse {
  readonly forks: any[] // TODO
}
