import { newMethod } from '@worksheets/apps/framework';
import { auth } from '../common';
import { Octokit } from 'octokit';
import { z } from 'zod';

export const gistsDelete = newMethod({
  path: 'github.gists.delete',
  label: 'Delete a gist',
  description: null,
  settings: { auth },
  input: z.string().describe('gist id'),
  output: z.boolean(),
  async call({ input, settings }) {
    const { accessToken } = settings.auth;

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
