import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { settings } from './common';

export const del = newMethod({
  id: 'delete',
  label: 'cru(Delete)',
  description: 'Delete an entity -- https://crudcrud.com/',
  settings,
  input: z.object({
    id: z.string(),
    resource: z.string(),
  }),
  output: z.boolean(),
  async call({ input: { resource, id }, settings: { key } }) {
    const url = `https://crudcrud.com/api/${key}/${resource}`;

    const result = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    if (!result.ok) {
      throw new MethodCallFailure({
        code: result.status,
        message: `crud failed to delete (/${resource}/${id}): ${result.statusText}`,
      });
    }

    console.info(`crud delete operation completed`, result.status);

    return true;
  },
});
