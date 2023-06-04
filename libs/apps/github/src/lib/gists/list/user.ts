import { newMethod } from '@worksheets/apps/framework';
import { auth, gistSchema } from '../../common';
import { Octokit } from 'octokit';
import { TypeOf, z } from 'zod';

export const gistsListUser = newMethod({
  path: 'github.gists.list.user',
  label: 'List gists for the authenticated user',
  description:
    "Lists the authenticated user's gists or if called anonymously, this endpoint returns all public gists",
  settings: { auth },
  input: null,
  output: z.array(gistSchema),
  async call({ settings }) {
    const { accessToken } = settings.auth;

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
