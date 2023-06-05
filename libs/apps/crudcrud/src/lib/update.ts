import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { key } from './common';

export const update = newMethod({
  path: 'crudcrud.update',
  label: 'cr(Update)d',
  description:
    'Update an entitiy with the JSON payload -- https://crudcrud.com/',
  settings: { key },
  input: z.object({
    payload: z.string(),
    id: z.string(),
    resource: z.string(),
  }),
  output: z.literal(true),
  async call({ input, settings }) {
    const { key } = settings;
    const { resource, payload, id } = input;

    console.log('data received', payload, typeof payload);
    const url = `https://crudcrud.com/api/${key}/${resource}`;

    const result = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });

    if (!result.ok) {
      throw new MethodCallFailure({
        code: result.status,
        message: `crud failed to update (/${resource}/${id}): ${result.statusText}`,
      });
    }

    console.info(`crud update operation completed`, result.status);

    return true as const;
  },
});
