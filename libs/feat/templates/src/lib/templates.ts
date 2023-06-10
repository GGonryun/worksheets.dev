import { z } from 'zod';

import { gmail } from '../examples/gmail';
import { github } from '../examples/github';
import { system } from '../examples/system';
import { dropbox } from '../examples/dropbox';
import { bitly } from '../examples/bitly';
import { crudcrud } from '../examples/crudcrud';
import { openai } from '../examples/openai';
import { screenshotone } from '../examples/screenshotone';
import { google_cloud_storage } from '../examples/google-cloud-storage';
import { json } from '../examples/json';
import { applyFunctionToKeys } from '@worksheets/util/objects';

export type Templates = Record<string, Record<string, string>>;

const templates: Templates = {
  system,
  gmail,
  github,
  dropbox,
  bitly,
  crudcrud,
  openai,
  screenshotone,
  google_cloud_storage,
  json,
};

export function listTemplates(): Templates {
  return applyFunctionToKeys(templates, (group) =>
    applyFunctionToKeys(group, (template) => template.trim())
  );
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
