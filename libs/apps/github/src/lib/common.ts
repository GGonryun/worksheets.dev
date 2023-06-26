import {
  MethodCallFailure,
  newOAuthSetting,
  newSettings,
} from '@worksheets/apps/framework';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export function handleOctokitError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('already exists on this repository')) {
      throw new MethodCallFailure({
        code: StatusCodes.CONFLICT,
        message: 'github resource already exists on this repository',
      });
    }
    if (error.message.includes('Not Found')) {
      throw new MethodCallFailure({
        code: StatusCodes.NOT_FOUND,
        message: 'github resource does not exist',
      });
    }
  }
  console.error('unexpected octokit error', error);
}

export const settings = newSettings({
  tokens: newOAuthSetting({
    required: true,
    options: {
      clientId: process.env['GITHUB_APP_CLIENT_KEY'],
      clientSecret: process.env['GITHUB_APP_SECRET_KEY'],
      accessTokenUri: 'https://github.com/login/oauth/access_token',
      authorizationUri: 'https://github.com/login/oauth/authorize',
      scopes: ['gist', 'repo', 'admin:repo_hook'],
    },
    schema: z.any(),
  }),
});

export const gistFileSchema = z.object({
  filename: z.string(),
  type: z.string().optional(),
  language: z.string().optional(),
  raw_url: z.string().optional(),
  size: z.number().optional(),
});

export const gistSchema = z.object({
  id: z.string(),
  url: z.string(),
  public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  description: z.string().nullable().optional(),
  comments: z.number(),
  files: z.record(z.string(), gistFileSchema).optional(),
});

export const webhookEvents = z.array(
  z.enum(['push', 'pull_request', 'issues', 'ping'])
);

export const webhook = z.object({
  type: z.string(),
  id: z.number(),
  name: z.string(),
  events: z.array(z.string()),
  config: z
    .object({
      content_type: z.string().optional(),
      insecure_ssl: z.union([z.number(), z.string()]).optional(),
      url: z.string().optional(),
    })
    .optional(),
  url: z.string(),
  test_url: z.string(),
  ping_url: z.string(),
  deliveries_url: z.string().optional(),
});
