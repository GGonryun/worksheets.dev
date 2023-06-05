import { z } from 'zod';

import { gmail } from '../examples/gmail';
import { github } from '../examples/github';
import { system } from '../examples/system';
import { dropbox } from '../examples/dropbox';
import { bitly } from '../examples/bitly';
import { crudcrud } from '../examples/crudcrud';
import { openai } from '../examples/openai';

export type Templates = Record<string, Record<string, string>>;

const templates: Templates = {
  system,
  gmail,
  github,
  dropbox,
  bitly,
  crudcrud,
  openai,
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
