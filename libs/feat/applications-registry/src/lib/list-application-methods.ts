import zodToJsonSchema from 'zod-to-json-schema';
import { createExample, db } from './util';

export const listApplicationMethods = (appId: string) => {
  return db.getApp(appId).methods.map((method) => ({
    id: method.id,
    label: method.label,
    description: method.description ?? undefined,
    input: method.input ? zodToJsonSchema(method.input) : undefined,
    output: method.output ? zodToJsonSchema(method.output) : undefined,
    example: createExample(appId, method),
  }));
};
