import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { key } from './common';

export const create = newMethod({
  path: 'crudcrud.create',
  label: '(Create)rud',
  description:
    'Create an entity represented by the JSON payload -- https://crudcrud.com/',
  settings: { key },
  input: z.object({
    json: z.string(),
    resource: z.string(),
  }),
  output: z.string(),
  async call({ input, settings }) {
    const { key } = settings;
    const { resource, json } = input;

    const url = `https://crudcrud.com/api/${key}/${resource}`;
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });

    if (!result.ok) {
      throw new MethodCallFailure({
        code: result.status,
        message: `crud failed to create (/${input.resource}): ${result.statusText}`,
      });
    }

    const data = await result.json();

    console.info(`crud: create operation completed`, data);

    return data._id;
  },
});
