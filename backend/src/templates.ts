import { GITHUB_BASE_URL } from './github'
import { ForkTemplate } from './model'
import prisma from './prisma'

export async function getTemplate(_templateId: number): Promise<ForkTemplate> {
  const fork = await prisma.ForkTemplate.findFirst({
    where: { id: _templateId }
  })
  if (!fork) {
    console.log('No such template, creating default template')
    return createDefaultTemplate()
  }
  return fork
}

//TODO: remove this when default branch already exists
async function createDefaultTemplate() {
  return prisma.ForkTemplate.create({
    data: {
      url: `${GITHUB_BASE_URL}/repos/one-aws-to-go/one-aws-to-go/forks`,
      owner: 'one-aws-to-go',
      repo: 'one-aws-to-go'
    }
  })
}
