import { newMethod } from '@worksheets/apps/framework';
import { settings, webhook } from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksGet = newMethod({
  id: 'webhooks_get',
  label: 'Get a repository webhook',
  description: null,
  settings,
  input: z.object({
    owner: z.string(),
    repo: z.string(),
    hook_id: z.number(),
  }),
  output: webhook,

  async call({ settings, input }) {
    const { owner, repo, hook_id } = input;
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/hooks/{hook_id}',
      {
        owner,
        repo,
        hook_id,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
    return response.data;
  },
});
