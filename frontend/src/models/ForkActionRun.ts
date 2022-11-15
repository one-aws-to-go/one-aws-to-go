import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
const ajv = new Ajv({ removeAdditional: 'all' });

export interface ForkActionRun {
  readonly key: string
  readonly name: string
  readonly logsId: number
  readonly running: boolean
  readonly success: boolean | null
  readonly startedAt: string
  readonly updatedAt: string
}

const forkActionsHistorySchema: JTDSchemaType<ForkActionRun[]> = {
  elements: {
    properties: {
      key: { type: 'string' },
      name: { type: 'string' },
      logsId: { type: 'uint32' },
      running: { type: 'boolean' },
      success: { type: 'boolean', nullable: true },
      startedAt: { type: 'string' },
      updatedAt: { type: 'string' },
    },
  }
};

export const validateForkActionsHistory = ajv.compile(forkActionsHistorySchema)