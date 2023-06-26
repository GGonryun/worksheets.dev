import { newMethod } from '@worksheets/apps/framework';
import { settings, gistSchema } from '../../common';
import { Octokit } from 'octokit';
import { TypeOf, z } from 'zod';

export const gistsListStarred = newMethod({
  id: 'gists.list.starred',
  label: 'List Gists',
  description:
    'Allows you to add a new gist with one or more files.\nNote: Don\'t name your files "gistfile" with a numerical suffix. This is the format of the automatic naming scheme that Gist uses internally.',
  settings,
  input: null,
  output: z.array(gistSchema),
  async call({ settings }) {
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const response = await octokit.request('GET /gists/starred', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const rawGists = response.data;

    console.info(`listed user's starred gists in github`, rawGists.length);

    return rawGists as TypeOf<typeof gistSchema>[];
  },
});
