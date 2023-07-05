import { newMethod } from '@worksheets/apps/framework';
import { settings, gistSchema } from '../common';
import { Octokit } from 'octokit';
import { TypeOf, boolean, object, string, z } from 'zod';

export const gistsCreate = newMethod({
  id: 'gists_create',
  label: 'Create Gist',
  description:
    'Allows you to add a new gist with one or more files.\nNote: Don\'t name your files "gistfile" with a numerical suffix. This is the format of the automatic naming scheme that Gist uses internally.',
  settings,
  input: object({
    description: string(),
    public: boolean().optional(),
    file: z.string().describe('README.md'),
    content: z.string(),
  }),
  output: gistSchema,
  async call({ settings, input }) {
    const { description, file, content } = input;
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    const response = await octokit.request('POST /gists', {
      description,
      public: input.public ?? false,
      files: {
        [file]: {
          content: content,
        },
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    console.info(`created a gist in github`, response.data);

    return response.data as TypeOf<typeof gistSchema>;
  },
});
