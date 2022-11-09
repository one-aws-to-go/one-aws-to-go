import github from '../../github'
import { AwsActionSecrets, ForkAwsSecretArgs, ForkTemplateProvider } from '../../model'

const FORK_NAME_REGEX = /^[a-z0-9]+$/i

/**
 * Fork name must be lower-case, alphanumeric and between 3-10 characters.
 */
export const isValidForkName = (name: string): boolean => {
  if (name.length < 3 || name.length > 10) {
    return false
  }

  return FORK_NAME_REGEX.test(name)
}

export const createProviderSecrets = (
  provider: ForkTemplateProvider,
  appName: string,
  secrets: ForkAwsSecretArgs
): AwsActionSecrets | null => {
  switch (provider) {
    case ForkTemplateProvider.AWS:
      const { awsDefaultRegion, awsAccessKey, awsSecretKey } = secrets
      return awsDefaultRegion && awsAccessKey && awsSecretKey
        ? {
          APP_NAME: appName,
          AWS_DEFAULT_REGION: awsDefaultRegion,
          AWS_ACCESS_KEY_ID: awsAccessKey,
          AWS_SECRET_ACCESS_KEY: awsSecretKey
        }
        : null
    default:
      throw new Error(`Provider not supported: ${provider}`)
  }
}

export const createSecrets = async (
  token: string,
  owner: string,
  repo: string,
  secrets: object
): Promise<void> => {
  for (const [key, value] of Object.entries(secrets)) {
    await github.createSecret(token, owner, repo, key, value as string)
  }
}
