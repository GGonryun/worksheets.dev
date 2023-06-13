import { newMethod } from '@worksheets/apps/framework';
import { auth, handleOctokitError, webhook, webhookEvents } from '../common';
import { z } from 'zod';
import { Octokit } from 'octokit';

export const webhooksCreate = newMethod({
  path: 'github.webhooks.create',
  label: 'Create a repository webhook',
  description:
    'Repositories can have multiple webhooks installed. Each webhook should have a unique config. Multiple webhooks can share the same config as long as those webhooks do not have any events that overlap.',
  settings: { auth },
  input: z.object({
    owner: z.string(),
    repo: z.string(),
    name: z.string(),
    active: z.boolean().default(true),
    events: webhookEvents,
    url: z.string(),
  }),
  output: webhook,

  async call({ settings, input }) {
    const { owner, repo, name, active, events, url } = input;
    const { accessToken } = settings.auth;
    console.info('inputs', owner, repo, name, active, events, url);
    const octokit = new Octokit({
      auth: accessToken,
    });
    let response;
    try {
      response = await octokit.request(`POST /repos/${owner}/${repo}/hooks`, {
        owner: owner,
        repo: repo,
        name: name,
        active: active,
        events: events,
        config: {
          url: url,
          content_type: 'json',
          insecure_ssl: '0',
        },
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
    } catch (error) {
      handleOctokitError(error);
      throw error;
    }
    return response.data;
  },
});
