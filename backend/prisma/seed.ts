import prisma from '../src/prisma'
import { ForkState, ForkTemplateProvider } from '../src/model'

const seed = async () => {
  const { id } = await prisma.forkTemplate.create({
    data: {
      owner: 'one-aws-to-go',
      repo: 'one-aws-to-go',
      provider: ForkTemplateProvider.AWS
    }
  })

  await prisma.forkAction.createMany({
    data: [
      { key: 'init', githubActionName: 'tf-setup-backend', toState: ForkState.INITIALIZED, templateId: id },
      { key: 'up', githubActionName: 'tf-up', toState: ForkState.UP, templateId: id },
      { key: 'down', githubActionName: 'tf-down', toState: ForkState.DOWN, templateId: id }
    ]
  })
}

seed()
