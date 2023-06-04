import { z } from 'zod';

import { gmail } from '../examples/gmail';
import { github } from '../examples/github';
import { system } from '../examples/system';

export type Templates = Record<string, Record<string, string>>;

const templates: Templates = {
  system,
  gmail,
  github,
};

export function listTemplates(): Templates {
  return templates;
}

export function listNumTemplates(): number {
  let i = 0;
  for (const folder in templates) {
    i = i + Object.keys(templates[folder]).length;
  }
  return i;
}

export const templateSchema = z.object({ id: z.string(), text: z.string() });
export type Template = z.infer<typeof templateSchema>;
