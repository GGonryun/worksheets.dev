import { newMethod } from '@worksheets/apps/framework';
import { handleOctokitError, settings } from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksTest = newMethod({
  id: 'webhooks.test',
  label: 'Test the push repository webhook',
  description:
    'This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated.',
  settings,
  input: z.object({
    owner: z.string(),
    repo: z.string(),
    hook_id: z.number(),
  }),
  output: z.number().describe('status'),

  async call({ settings, input }) {
    const { owner, repo, hook_id } = input;
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });

    let response;
    try {
      response = await octokit.request(
        'POST /repos/{owner}/{repo}/hooks/{hook_id}/tests',
        {
          owner,
          repo,
          hook_id,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      );
    } catch (error) {
      handleOctokitError(error);
      throw error;
    }

    return response.status;
  },
});
