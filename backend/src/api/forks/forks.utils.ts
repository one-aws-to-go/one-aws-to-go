import github from '../../github'
import { ForkSecretArgs } from '../../model'

type DefaultAWSSecrets = Omit<ForkSecretArgs, 'appName'>
export const createSecrets = async (
  secretsToPlace: DefaultAWSSecrets,
  token: string,
  login: string,
  appName: string
): Promise<void> => {
  for (const [key, value] of Object.entries(secretsToPlace)) {
    await github.createSecret(token, login, appName, key, value as string)
  }
}
