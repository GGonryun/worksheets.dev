import { newMethod } from '@worksheets/apps/framework';
import { Octokit } from 'octokit';
import { z } from 'zod';
import { settings } from '../common';

export const gistsDelete = newMethod({
  id: 'gists_delete',
  label: 'Delete a gist',
  description: null,
  settings,
  input: z.string().describe('gist id'),
  output: z.boolean(),
  async call({ input, settings }) {
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const response = await octokit.request(`DELETE /gists/{gist_id}`, {
      gist_id: input,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return response.status < 300 && response.status > 199;
  },
});
