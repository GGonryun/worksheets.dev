import { newMethod } from '@worksheets/apps/framework';
import { settings } from '../common';
import { Octokit } from 'octokit';
import { z } from 'zod';

export const gistsStar = newMethod({
  id: 'gists.star',
  label: 'Star a gist',
  description:
    'Allows you to add a new gist with one or more files.\nNote: Don\'t name your files "gistfile" with a numerical suffix. This is the format of the automatic naming scheme that Gist uses internally.',
  settings,
  input: z.string().describe('gist_id'),
  output: z.boolean().describe('success'),
  async call({ settings, input }) {
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const { status } = await octokit.request('PUT /gists/{gist_id}/star', {
      gist_id: input,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    console.info(`github.gist.star: starred a gist`, input, status);

    return status > 199 && status < 300;
  },
});
