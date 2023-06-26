import { newMethod } from '@worksheets/apps/framework';
import { settings, gistFileSchema, gistSchema } from '../common';
import { Octokit } from 'octokit';
import { TypeOf, z } from 'zod';

export const gistsUpdate = newMethod({
  id: 'gists.update',
  label: 'Update a gist',
  description:
    "Allows you to update a gist's description and to update, delete, or rename gist files. Files from the previous version of the gist that aren't explicitly changed during an edit are unchanged.",
  settings,
  input: z.object({
    gist_id: z.string(),
    description: z.string().optional(),
    files: z.record(z.string(), gistFileSchema.partial()).optional(),
  }),
  output: gistSchema,
  async call({ input, settings }) {
    const { gist_id, description, files } = input;
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const response = await octokit.request(`PATCH /gists/{gist_id}`, {
      gist_id,
      description,
      files,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return response.data as TypeOf<typeof gistSchema>;
  },
});
