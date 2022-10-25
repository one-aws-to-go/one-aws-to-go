import prisma from '../src/prisma'

const seed = async () => {
  const { id } = await prisma.forkTemplate.create({
    data: {
      owner: 'one-aws-to-go',
      repo: 'one-aws-to-go'
    }
  })

  await prisma.forkAction.createMany({
    data: [
      { key: 'init', githubActionName: 'tf-setup', templateId: id },
      { key: 'up', githubActionName: 'tf-up', templateId: id },
      { key: 'down', githubActionName: 'tf-down', templateId: id }
    ]
  })
}

seed()
