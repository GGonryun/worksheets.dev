import {
  searchForFunctions,
  splitFunctionDeclaration,
} from '@worksheets/util/worksheets';
import {
  TemplateDefinition,
  templateDefinitionSchema,
} from '@worksheets/apps/framework';
import { sendEmail } from './google-gmail/sendEmail';
import {
  newApplicationsDatabase,
  convertApplicationDefinition,
  applicationDetailsSchema,
} from '@worksheets/data-access/applications';
import { onlyUnique } from '@worksheets/util/functional';
import { createImage } from './openai/createImage';
import { createCompletion } from './openai/createCompletion';
import { z } from 'zod';

export const templateDetailsSchema = z
  .object({ apps: z.array(applicationDetailsSchema) })
  .and(templateDefinitionSchema);
export type TemplateDetails = z.infer<typeof templateDetailsSchema>;

const apps = newApplicationsDatabase();

const templates: TemplateDefinition[] = [
  sendEmail,
  createImage,
  createCompletion,
];

export type ListTemplatesFilters = {
  appIds?: string[];
};

export function listTemplates(
  filter?: ListTemplatesFilters
): TemplateDetails[] {
  const details: TemplateDetails[] = [];
  for (const template of templates) {
    const d = createTemplateDetails(template, filter);
    if (d) details.push(d);
  }

  return details;
}

export function getTemplate(templateId: string): TemplateDetails | undefined {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;
  return createTemplateDetails(template);
}

function createTemplateDetails(
  template: TemplateDefinition,
  filter?: ListTemplatesFilters
): TemplateDetails | undefined {
  // scan template text for possible apps.
  const appIds = searchForFunctions(template.text)
    .map((declaration) => splitFunctionDeclaration(declaration).app)
    .filter(Boolean)
    .filter(onlyUnique);

  // ignore templates that don't match the filter apps
  if (
    filter?.appIds?.length &&
    !appIds.some((app) => filter?.appIds?.includes(app))
  )
    return;

  const appDetails = apps
    .list()
    .filter((app) => appIds.includes(app.id))
    .map(convertApplicationDefinition);

  return { ...template, text: template.text.trim(), apps: appDetails };
}
