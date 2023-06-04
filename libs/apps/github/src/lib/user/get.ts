import { newMethod } from '@worksheets/apps/framework';
import { auth } from '../common';
import { z } from 'zod';

const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  url: z.string(),
  followers: z.number(),
  following: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userGet = newMethod({
  path: 'github.user.get',
  label: 'Get User',
  description: null,
  settings: { auth },
  input: null,
  output: githubUserSchema,
  async call({ settings }) {
    const { accessToken } = settings.auth;

    const response = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { login, id, url, followers, following, created_at, updated_at } =
      await response.json();

    return {
      login,
      id,
      url,
      followers,
      following,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  },
});
