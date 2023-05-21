import { OfficialRegistry } from '@worksheets/apps/registry';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodAny } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const registry = new OfficialRegistry();
  const catalog = registry.library.catalog();

  const results: MethodWithSchema[] = [];
  for (const method of catalog) {
    const { input, output, ...other } = method;
    results.push({
      ...other,
      input: printSchema(input),
      output: printSchema(output),
    });
  }

  res.status(200).json(results);
}

export type MethodWithSchema = {
  path: string;
  label: string;
  description?: string;
  input?: object;
  output?: object;
};

function printSchema(type: unknown): object {
  if (!type) {
    return {};
  }
  const schema = zodToJsonSchema(type as ZodAny, 'schema');
  if (!schema.definitions) {
    return {};
  }

  return schema.definitions['schema'];
}
