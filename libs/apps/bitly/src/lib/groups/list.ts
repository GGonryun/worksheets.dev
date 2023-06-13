import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { auth } from '../common';
import { fetcher } from '@worksheets/util/http';

const { composer, bearer, method } = fetcher;

export const groupsList = newMethod({
  path: 'bitly.groups.list',
  label: 'List Bitly groups',
  description: '',
  settings: { auth },
  input: null,
  output: z.array(
    z.object({
      created: z.string(),
      modified: z.string(),
      bsds: z.unknown(),
      guid: z.string(),
      organization_guid: z.string(),
      name: z.string(),
      is_active: z.boolean(),
      role: z.string(),
    })
  ),
  async call({ settings }) {
    const result = await composer()(
      method('GET'),
      bearer(settings.auth.accessToken)
    )(`https://api-ssl.bitly.com/v4/groups`);

    const data = await result.json();
    if (!result.ok) {
      const message = `bitly failed to list groups`;
      console.error(message, data);
      throw new MethodCallFailure({
        code: result.status,
        message,
        data: data,
      });
    }
    const { groups } = data;
    console.info(`bitly found ${groups.length} user groups`);
    return groups;
  },
});
