import { z } from 'zod';

export const templateCategorySchema = z.union([
  z.literal('email'),
  z.literal('google'),
  z.literal('a.i.'),
]);

export type TemplateCategory = z.infer<typeof templateCategorySchema>;

export const templateDefinitionSchema = z.object({
  id: z.string(),
  description: z.string(),
  inputs: z.array(z.record(z.unknown())),
  outputs: z.array(z.record(z.unknown())),
  text: z.string(),
  categories: z.array(templateCategorySchema),
});

export type TemplateDefinition = z.infer<typeof templateDefinitionSchema>;
