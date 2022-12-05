import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
const ajv = new Ajv({ removeAdditional: 'all' });

export interface ForkCommon {
  readonly id: number
  readonly owner: string
  readonly repo: string
  readonly provider: ForkTemplateProvider
}

export enum ForkTemplateProvider {
  AWS = 'aws',
  AZURE = 'azure', // TODO: Not used!
  GCP = 'gcp'      // TODO: Not used!
}

export interface GithubAction {
  readonly key: string
  readonly name: string
  readonly description: string | null
}

export enum ForkState {
  CREATED = 'created',
  INITIALIZED = 'initialized',
  UP = 'up',
  DOWN = 'down'
}

export interface Fork extends ForkCommon {
  readonly appName: string
  readonly templateId: number
}

export interface ExtendedFork extends Fork {
  readonly state: ForkState
  readonly secretsSet: boolean
  readonly actions: GithubAction[]
}

export interface ForkTemplate extends ForkCommon {
  readonly description: string | null
}

const GithubActionSchema: JTDSchemaType<GithubAction> = {
  properties: {
    key: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
  }
}

const forkSchema: JTDSchemaType<Fork> = {
  properties: {
    id: { type: 'int32' },
    appName: { type: 'string' },
    owner: { type: 'string' },
    repo: { type: 'string' },
    provider: {
      enum: [
        ForkTemplateProvider.AWS,
        ForkTemplateProvider.AZURE,
        ForkTemplateProvider.GCP
      ]
    },
    templateId: { type: 'int16' }
  },
};

const forksSchema: JTDSchemaType<Fork[]> = {
  elements: forkSchema
};


const forkTemplatesSchema: JTDSchemaType<ForkTemplate[]> = {
  elements: {
    properties: {
      id: { type: 'int32' },
      owner: { type: 'string' },
      repo: { type: 'string' },
      provider: {
        enum: [
          ForkTemplateProvider.AWS,
          ForkTemplateProvider.AZURE,
          ForkTemplateProvider.GCP
        ]
      },
      description: { type: 'string', nullable: true },
    },
  }
};

const extendedForkSchema: JTDSchemaType<ExtendedFork> = {
  properties: {
    id: { type: 'int32' },
    appName: { type: 'string' },
    owner: { type: 'string' },
    repo: { type: 'string' },
    state: {
      enum: [
        ForkState.CREATED,
        ForkState.INITIALIZED,
        ForkState.UP,
        ForkState.DOWN
      ]
    },
    provider: {
      enum: [
        ForkTemplateProvider.AWS,
        ForkTemplateProvider.AZURE,
        ForkTemplateProvider.GCP
      ]
    },
    secretsSet: { type: 'boolean' },
    actions: { elements: GithubActionSchema },
    templateId: { type: 'int16' }
  },
};


export const validateFork = ajv.compile(forkSchema)
export const validateForks = ajv.compile(forksSchema)
export const validateExtendedFork = ajv.compile(extendedForkSchema)
export const validateForkTemplates = ajv.compile(forkTemplatesSchema)