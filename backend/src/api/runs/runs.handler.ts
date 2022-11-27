import github from '../../github'
import { AuthorizedEventHandler, RunData } from '../../model'
import prisma from '../../prisma'
import { buildJsonResponse } from '../../utils'
import { githubActionRunToForkActionRun } from '../forks/forks.utils'
import { unzipLogFiles } from './runs.utils'

export const getRunHandler: AuthorizedEventHandler = async (e) => {
  console.log(e.pathParameters)
  const forkId = Number(e.pathParameters?.forkId)
  if (isNaN(forkId)) {
    return buildJsonResponse(400, { message: `Invalid forkId: ${forkId}` })
  }
  const runId = Number(e.pathParameters?.runId)
  if (isNaN(runId)) {
    return buildJsonResponse(400, { message: `Invalid runId: ${runId}` })
  }

  const githubUser = await github.getUser(e.githubToken)
  const fork = await prisma.fork.findFirst({
    where: { userId: githubUser.id, id: forkId },
    include: {
      template: {
        include: { actions: true }
      }
    }
  })
  if (!fork) {
    return buildJsonResponse(404, { message: `No fork with id ${forkId}` })
  }

  const zippedLogs = await github.getZippedLogData(
    e.githubToken,
    fork.owner,
    fork.appName,
    runId
  )
  const logFiles = await unzipLogFiles(zippedLogs)
  const githubActionRun = await github.getActionRun(
    e.githubToken,
    fork.owner,
    fork.appName,
    runId
  )
  const actionRun = await githubActionRunToForkActionRun(githubActionRun, fork)

  const body: RunData = { actionRun, logFiles }
  return buildJsonResponse(200, body)
}
