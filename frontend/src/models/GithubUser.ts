import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
const ajv = new Ajv({ removeAdditional: 'all' });

export interface GithubUser {
  readonly id: number;
  readonly login: string;
}

const schema: JTDSchemaType<GithubUser> = {
  properties: {
    id: { type: 'int32' },
    login: { type: 'string' },
  },
};

export const validateGithubUser = ajv.compile(schema)
