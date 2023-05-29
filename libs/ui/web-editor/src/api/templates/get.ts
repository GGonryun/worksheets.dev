import { templateSchema, templates } from '@worksheets/templates';
import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';

const output = z.array(templateSchema);
export type GetTemplatesResponse = z.infer<typeof output>;
export const get = newPublicHandler({ output })(async () => {
  const list = templates();
  return list;
});
