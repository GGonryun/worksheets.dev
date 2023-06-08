import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

import * as jp from 'jsonpath';

export const query = newMethod({
  path: 'json.query',
  label: 'JSON Query',
  description:
    'Query JavaScript objects with JSONPath expressions. Robust / safe JSONPath engine for Node.js — https://www.npmjs.com/package/jsonpath',
  settings: null,
  input: z.object({ data: z.unknown(), query: z.string() }),
  output: z.unknown(),
  async call({ input }) {
    return jp.query(input.data, input.query);
  },
});
