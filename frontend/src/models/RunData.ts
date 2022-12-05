import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
import { ForkActionRun, forkActionRunSchema } from "./ForkActionRun"

const ajv = new Ajv({ removeAdditional: 'all' });


export interface ActionStepLog {
  name: string
  data: string
}

export interface RunData {
  actionRun: ForkActionRun
  logFiles: ActionStepLog[]
}

const actionStepLogSchema: JTDSchemaType<ActionStepLog> = {
  properties: {
    name: { type: 'string' },
    data: { type: 'string' },
  },
};

const runDataSchema: JTDSchemaType<RunData> = {
  properties: {
    actionRun: forkActionRunSchema,
    logFiles: {
      elements: actionStepLogSchema
    },
  },
};

export const validateRunData = ajv.compile(runDataSchema)