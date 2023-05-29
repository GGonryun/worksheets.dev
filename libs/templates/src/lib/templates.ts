import { z } from 'zod';
import { accumulator } from '../examples/accumulator';
import { add } from '../examples/add';
import { http } from '../examples/http';
import { loops } from '../examples/loops';
import { max } from '../examples/max';

const templates: Record<string, string> = {
  add,
  accumulator,
  http,
  loops,
  max,
};

export function listTemplates(): Template[] {
  const list: Template[] = [];
  for (const id in templates) {
    const text = templates[id].trim();
    list.push({ id, text });
  }
  return list;
}

export const templateSchema = z.object({ id: z.string(), text: z.string() });
export type Template = z.infer<typeof templateSchema>;
