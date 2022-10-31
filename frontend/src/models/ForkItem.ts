import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
const ajv = new Ajv({ removeAdditional: 'all' });

export interface GithubUser {
  readonly id: number;
  readonly login: string;
}

const schema: JTDSchemaType<Fork> = {
  properties: {
    id: { type: 'int32' },
    appName: { type: 'string' },
    owner: { type: 'string' },
    repo: { type: 'string' },
  },
};

export const validateFork = ajv.compile(schema)
export const parseFork = ajv.compileParser(schema);

export interface Fork {
  readonly id: number
  readonly appName: string
  readonly owner: string
  readonly repo: string
}

export interface ExtendedFork extends Fork {
  readonly state: ForkState
  readonly secretsSet: boolean
  // readonly actionsEnabled: boolean
}

export interface ErrorMessage {
  readonly message: string
}

export enum ForkState {
  CREATED = 'created',
  INITIALIZED = 'initialized',
  UP = 'up',
  DOWN = 'down'
}

export interface ForkItem {
  readonly img: any;
  readonly title: string;
}