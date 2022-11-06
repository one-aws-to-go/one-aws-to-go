import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
const ajv = new Ajv({ removeAdditional: 'all' });

export interface Fork {
  readonly id: number
  readonly appName: string
  readonly owner: string
  readonly repo: string
}

export interface ExtendedFork extends Fork {
  readonly state: ForkState
  readonly secretsSet: boolean
}

export enum ForkState {
  CREATED = 'created',
  INITIALIZED = 'initialized',
  UP = 'up',
  DOWN = 'down'
}

const forkSchema: JTDSchemaType<Fork> = {
  properties: {
    id: { type: 'int32' },
    appName: { type: 'string' },
    owner: { type: 'string' },
    repo: { type: 'string' },
  },
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
    secretsSet: { type: 'boolean' }
  },
};

const innerArraySchema: JTDSchemaType<Fork[]> = {
  elements: forkSchema
}

export const validateFork = ajv.compile(forkSchema)
export const validateExtendedFork = ajv.compile(extendedForkSchema)
export const validateForks = ajv.compile(innerArraySchema)