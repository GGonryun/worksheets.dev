import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { key } from './common';
import { StatusCodes } from 'http-status-codes';

export const read = newMethod({
  id: 'read',
  label: 'c(Read)ud',
  description:
    'Get a single entity (id) or all entities from the resource -- https://crudcrud.com/',

  settings: { key },

  input: z.object({
    id: z.string().optional(),
    resource: z.string(),
  }),

  output: z.unknown(),

  async call({ input, settings }) {
    const { key } = settings;
    const { resource } = input;
    if (!resource) {
      throw new MethodCallFailure({
        code: StatusCodes.PRECONDITION_FAILED,
        message: 'missing required parameter resource',
      });
    }

    const url = `https://crudcrud.com/api/${key}/${resource}`;

    const reqUrl = input.id ? `${url}/${input.id}` : url;

    const result = await fetch(reqUrl, {
      method: 'GET',
    });

    if (!result.ok) {
      throw new MethodCallFailure({
        code: result.status,
        message: `crud failed to read (/${input.resource}/${input.id}): ${result.statusText}`,
      });
    }

    const data = await result.json();

    console.info(`crud read operation completed`, data);

    return data;
  },
});
