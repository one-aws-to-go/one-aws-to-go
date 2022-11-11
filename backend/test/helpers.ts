import { ForkState, ForkTemplateProvider } from '../src/model'
import prisma from '../src/prisma'

async function testSeed() {
  console.log('Seeding db for tests...')
  const { id } = await prisma.forkTemplate.create({
    data: {
      id: 1,
      owner: 'one-aws-to-go',
      repo: 'one-aws-to-go',
      provider: ForkTemplateProvider.AWS,
      description: 'One AWS To Go Default Template'
    }
  })

  await prisma.forkAction.createMany({
    data: [
      {
        key: 'init',
        githubActionName: 'tf-setup-backend',
        toState: ForkState.INITIALIZED,
        name: 'Initialize',
        description: 'Initializes the IaC backend.',
        templateId: id
      },
      {
        key: 'up',
        githubActionName: 'tf-up',
        toState: ForkState.UP,
        name: 'Deploy',
        description: 'Deploys the IaC infrastructure to AWS.',
        templateId: id
      },
      {
        key: 'down',
        githubActionName: 'tf-down',
        toState: ForkState.DOWN,
        name: 'Destroy',
        description: 'Destroys the IaC infrastrucure deployed to AWS.',
        templateId: id
      }
    ]
  })
}

export async function resetDb() {
  console.log('Clearing database...')
  await prisma.fork.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.forkAction.deleteMany({})
  await prisma.forkTemplate.deleteMany({})
  await testSeed()
}
