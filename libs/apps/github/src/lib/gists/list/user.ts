import { newMethod } from '@worksheets/apps/framework';
import { settings, gistSchema } from '../../common';
import { Octokit } from 'octokit';
import { TypeOf, z } from 'zod';

export const gistsListUser = newMethod({
  id: 'list.user',
  label: 'List gists for the authenticated user',
  description:
    "Lists the authenticated user's gists or if called anonymously, this endpoint returns all public gists",
  settings,
  input: null,
  output: z.array(gistSchema),
  async call({ settings }) {
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const response = await octokit.request('GET /gists', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const rawGists = response.data;

    console.info(`listed user's gists in github`, rawGists.length);
    return rawGists as TypeOf<typeof gistSchema>[];
  },
});
