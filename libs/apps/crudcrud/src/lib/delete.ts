import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { key } from './common';

export const del = newMethod({
  id: 'delete',
  label: 'cru(Delete)',
  description: 'Delete an entity -- https://crudcrud.com/',
  settings: { key },
  input: z.object({
    id: z.string(),
    resource: z.string(),
  }),
  output: z.boolean(),
  async call({ input, settings }) {
    const { key } = settings;
    const { resource } = input;

    const url = `https://crudcrud.com/api/${key}/${resource}`;

    const result = await fetch(`${url}/${input.id}`, {
      method: 'DELETE',
    });

    if (!result.ok) {
      throw new MethodCallFailure({
        code: result.status,
        message: `crud failed to delete (/${input.resource}/${input.id}): ${result.statusText}`,
      });
    }

    console.info(`crud delete operation completed`, result.status);

    return true;
  },
});
