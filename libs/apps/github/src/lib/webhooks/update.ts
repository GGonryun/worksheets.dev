import { newMethod } from '@worksheets/apps/framework';
import {
  settings,
  handleOctokitError,
  webhook,
  webhookEvents,
} from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksUpdate = newMethod({
  id: 'webhooks.update',
  label: 'Update a repository webhook',
  description:
    'Updates a webhook configured in a repository. If you previously had a secret set, you must provide the same secret or set a new secret or the secret will be removed.',
  settings,
  input: z.object({
    owner: z.string(),
    repo: z.string(),
    hook_id: z.number(),
    active: z.boolean().default(true),
    events: webhookEvents
      .describe(
        'Determines what events the hook is triggered for. This replaces the entire array of events.'
      )
      .default(['push']),
  }),
  output: webhook,

  async call({ settings, input }) {
    const { owner, repo, hook_id, events, active } = input;
    const { accessToken } = settings.tokens;

    const octokit = new Octokit({
      auth: accessToken,
    });
    let response;
    try {
      response = await octokit.request(
        'PATCH /repos/{owner}/{repo}/hooks/{hook_id}',
        {
          owner,
          repo,
          hook_id,
          events,
          active,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      );
    } catch (error) {
      handleOctokitError(error);
      throw error;
    }

    return response.data;
  },
});
