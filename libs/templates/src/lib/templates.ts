import { readFilesInFolder } from '@worksheets/util/hardware';
import { z } from 'zod';

const dirPath = 'libs/templates/examples';

export function templates(): Template[] {
  const raw = readFilesInFolder(dirPath);
  const templates: Template[] = [];
  for (const key in raw) {
    const v = raw[key];
    templates.push({ id: key, text: v });
  }
  return templates;
}

export const templateSchema = z.object({ id: z.string(), text: z.string() });
export type Template = z.infer<typeof templateSchema>;
