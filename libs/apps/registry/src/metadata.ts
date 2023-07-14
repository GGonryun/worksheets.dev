import { z } from '@worksheets/zod';

export const metadataSchema = z.object({
  enabled: z.boolean(),
  public: z.boolean(),
  gallery: z.boolean(),
  external: z.boolean(),
});

export type ApplicationMetadata = z.infer<typeof metadataSchema>;
