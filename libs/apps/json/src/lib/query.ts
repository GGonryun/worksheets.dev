import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import * as jq from 'json-query';

export const query = newMethod({
  path: 'json.query',
  label: 'Format JSON',
  description: 'https://www.npmjs.com/package/json-query',
  input: z.object({
    data: z.any(),
    selector: z.string(),
  }),
  output: z.unknown(),
  call: async function ({ input }) {
    const { selector, data } = input;
    const result = jq(selector, { data, allowRegexp: true });
    return result.value;
  },
});
