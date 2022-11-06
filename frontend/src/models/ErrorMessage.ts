import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
const ajv = new Ajv({ removeAdditional: 'all' });

export interface ErrorMessage {
  readonly message: string;
}

const schema: JTDSchemaType<ErrorMessage> = {
  properties: {
    message: { type: 'string' },
  },
};

export const validateErrorMessage = ajv.compile(schema)
