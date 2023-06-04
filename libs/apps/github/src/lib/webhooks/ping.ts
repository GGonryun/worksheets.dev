import { newMethod } from '@worksheets/apps/framework';
import { auth } from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksPing = newMethod({
  path: 'github.webhooks.ping',
  label: 'Ping a repository webhook',
  description: 'This will trigger a ping event to be sent to the hook.',
  settings: { auth },
  input: z.object({
    owner: z.string(),
    repo: z.string(),
    hook_id: z.number(),
  }),
  output: z.number().describe('status'),

  async call({ settings, input }) {
    const { owner, repo, hook_id } = input;
    const { accessToken } = settings.auth;

    const octokit = new Octokit({
      auth: accessToken,
    });
    const response = await octokit.request(
      'POST /repos/{owner}/{repo}/hooks/{hook_id}/pings',
      {
        owner,
        repo,
        hook_id,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    return response.status;
  },
});
