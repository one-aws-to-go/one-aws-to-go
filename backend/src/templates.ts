import { GITHUB_BASE_URL } from './github'
import { ForkTemplate } from './model'

export async function getTemplate(_templateId: number): Promise<ForkTemplate> {
  return {
    id: 1,
    url: `${GITHUB_BASE_URL}/repos/one-aws-to-go/one-aws-to-go/forks`
  }
}
