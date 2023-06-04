import { newMethod } from '@worksheets/apps/framework';
import { auth, handleOctokitError } from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksDelete = newMethod({
  path: 'github.webhooks.delete',
  label: 'Delete a repository webhook',
  description: null,
  settings: { auth },
  input: z.object({
    owner: z.string(),
    repo: z.string(),
    hook_id: z.number(),
  }),
  output: z.boolean(),

  async call({ settings, input }) {
    const { owner, repo, hook_id } = input;
    const { accessToken } = settings.auth;

    const octokit = new Octokit({
      auth: accessToken,
    });

    let response;
    try {
      response = await octokit.request(
        'DELETE /repos/{owner}/{repo}/hooks/{hook_id}',
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
    return response.status > 199 && response.status < 300;
  },
});
