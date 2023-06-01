import { newMethod } from '@worksheets/apps/framework';
import { auth, getCurrentUserEmail } from './common';
import { newGmailClient } from './common';
import { z } from 'zod';

export const getUserEmail = newMethod({
  path: 'google.gmail.get_user_email',
  label: 'Get User Email',
  description:
    'Returns the email associated with the current connection to gmail',
  settings: { auth },
  input: null,
  output: z.string(),
  async call(ctx) {
    const { accessToken } = ctx.settings.auth;
    const client = newGmailClient(accessToken);
    return await getCurrentUserEmail(client);
  },
});
