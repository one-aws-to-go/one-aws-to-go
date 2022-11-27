import yauzl from 'yauzl'
import { ActionStepLog } from '../../model'

export const unzipLogFiles = (input: Buffer): Promise<ActionStepLog[]> => {
  return new Promise((resolve, reject) => {
    const logFiles: ActionStepLog[] = []
    yauzl.fromBuffer(input, { lazyEntries: false }, (err, file) => {
      if (err) reject(err)
      file.on('entry', async (entry: yauzl.Entry) => {
        if (isFolder(entry)) return
        const logFile = await extractZipFileData(file, entry)
        logFiles.push(logFile)
      })
      file.on('end', () => resolve(logFiles))
    })
  })
}

const isFolder = (entry: yauzl.Entry) => /\$/.test(entry.fileName)

export const extractZipFileData = (
  file: yauzl.ZipFile,
  entry: yauzl.Entry
): Promise<ActionStepLog> => {
  return new Promise((resolve, reject) => {
    file.openReadStream(entry, (err, readStream) => {
      if (err) reject(err)
      let logData = ''
      readStream.on('data', (data) => {
        logData += data
      })
      readStream.on('end', () => {
        resolve({
          name: entry.fileName,
          data: logData
        })
      })
    })
  })
}