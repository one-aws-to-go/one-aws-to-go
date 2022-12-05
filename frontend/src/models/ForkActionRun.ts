import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
const ajv = new Ajv({ removeAdditional: 'all' });

export interface ForkActionRun {
  readonly key: string
  readonly name: string
  readonly runId: number
  readonly running: boolean
  readonly success: boolean | null
  readonly startedAt: string
  readonly updatedAt: string
}

export const forkActionRunSchema: JTDSchemaType<ForkActionRun> = {
  properties: {
    key: { type: 'string' },
    name: { type: 'string' },
    runId: { type: 'uint32' },
    running: { type: 'boolean' },
    success: { type: 'boolean', nullable: true },
    startedAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

const forkActionRunsSchema: JTDSchemaType<ForkActionRun[]> = {
  elements: forkActionRunSchema
};

export const validateForkActionsHistory = ajv.compile(forkActionRunsSchema)