import { z } from 'zod';

export const entitySchema = z.object({ id: z.string() });
export type Entity = z.infer<typeof entitySchema>;
