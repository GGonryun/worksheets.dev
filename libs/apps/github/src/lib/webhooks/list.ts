import { newMethod } from '@worksheets/apps/framework';
import { auth, webhook } from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksList = newMethod({
  path: 'github.webhooks.list',
  label: 'List repository webhooks',
  description:
    'Lists webhooks for a repository. last response may return null if there have not been any deliveries within 30 days.',
  settings: { auth },
  input: z.object({
    owner: z.string(),
    repo: z.string(),
  }),
  output: z.array(webhook),

  async call({ settings, input }) {
    const { owner, repo } = input;
    const { accessToken } = settings.auth;

    const octokit = new Octokit({
      auth: accessToken,
    });
    const response = await octokit.request('GET /repos/{owner}/{repo}/hooks', {
      owner: 'GwenythIO',
      repo: 'webhooks-test',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return response.data;
  },
});
